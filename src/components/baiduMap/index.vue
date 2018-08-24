<template>
    <!--地图容器-->
    <div id="map" class="map"></div>
</template>

<script>
import {MP} from '@/utils/map';
import quyuData from '../../../static/data/quyu.json';

export default {
        name:'',
        data () {
            return {
                map:"",
                ak:"aUGsIRrh54O2tyyv1RifNsNg7QfhwCwM",
                areaList:[],   // 覆盖物数据
            }
        },
        created(){
            console.log(quyuData);
            // 直接拿到的静态数据
            if(quyuData.status.code == 200){
                this.areaList = quyuData.result.list;
            }
        },
        mounted() {
            this.$nextTick(function(){
                let _this = this;
                MP(_this.ak).then(BMap => {  // 通过promise来异步初始化map对象，保证map api.js完全加载完成；
                        // 创建Map实例
                        let map = this.map =  new BMap.Map("map",
                            {enableMapClick:true}
                        );
                        console.log(map);
                        // 初始化地图,设置中心点坐标和地图级别;默认为"天安门"坐标；地图级别越大越详细[3~20];
                        let lng = this.areaList[0].lng;
                        let lat = this.areaList[0].lat;
                        map.centerAndZoom(new BMap.Point(lng,lat), 11);
                        // 添加地图类型控件
                        map.addControl(new BMap.MapTypeControl());  
                        // 设置地图显示的城市 此项是必须设置的
                        map.setCurrentCity("武汉");    
                        // 开启鼠标滚轮缩放      
                        map.enableScrollWheelZoom(true);
                        // 设置定时器，对地图进行自动移动
                        // setTimeout(function(){
                        //     map.panTo(new BMap.Point(113.262232,23.154345));
                        // }, 2000);
                        // setTimeout(function(){
                        //     map.setZoom(14);
                        // },4000);
                        this.addControl(this.map);
                        // 添加地图自定义覆盖物
                        this.overlay(this.map);  // 绘制覆盖物形状
                        this.addOverlay();

                });
            });
        },
        methods: {
            overlay(map) {
                // 绘制覆盖物
                let This = this;
                this.ComaplexCustomOverlay = function(
                    point,
                    area,
                    houseNum,
                    quyuAId,
                    lng,
                    lat
                ) {
                    this._point = point; // 覆盖物坐标点
                    this._area = area; // 区域名字
                    this._houseNum = houseNum; // 房间数
                    this._quyuAId = quyuAId; // 区域id
                    this._lng = lng; //经度
                    this._lat = lat; //纬度
                };
                this.ComaplexCustomOverlay.prototype = new BMap.Overlay();
                this.ComaplexCustomOverlay.prototype.initialize = function(map) {
                    this._map = map;
                    let div = (this._div = document.createElement("div"));
                    div.style.position = "absolute";
                    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                    div.style.background =
                        "linear-gradient(-93deg, rgba(42, 191, 190 , 0.85) 0%, rgba(68, 218, 173, 0.85) 90%)";
                    div.style["box-shadow"] = " 0 2px 12px 3px rgba(0,0,0,0.20)";
                    div.style.height = "2.27rem";
                    div.style.width = "2.27rem";
                    div.style.boxSizing = "border-box";
                    div.style.padding = ".63rem 0";
                    div.style.MozUserSelect = "none";
                    div.style.fontSize = ".16rem";
                    div.style.borderRadius = "50%";
                    div.style.color = "#fff";
                    div.style.textAlign = "center";
                    let p1 = document.createElement("p");

                    p1.style.fontSize = ".37rem";
                    p1.style.color = "#fff";
                    p1.style.letterSpacing = "0.07px";
                    p1.style.lineHeight = ".53rem";

                    div.appendChild(p1);
                    p1.appendChild(document.createTextNode(this._area));

                    let p2 = document.createElement("p");
                    p2.style.color = "#fff";
                    p2.style.fontSize = ".32rem";
                    p2.style.lineHeight = ".44rem";
                    div.appendChild(p2);
                    p2.appendChild(document.createTextNode(this._houseNum));

                    let date1 = "";
                    div.addEventListener("touchstart", () => {
                        this._div._bugFlag = true;
                        date1 = new Date().getTime();

                    });
                    div.addEventListener("touchmove", () => {
                        let date2 = new Date().getTime();
                        if(date2-date1 > 300){
                            this._div._bugFlag = false;
                        }
                    });
                    div.addEventListener("touchend", () => {
                        if (this._div._bugFlag) {
                            This.quyuAId = this.quyuAId = this._quyuAId;
                            This.lng = 0;
                            This.lat = 0;
                            This.showComHouse = true;  // 通过改变变量，切换到二级地图区域；
                            this._map.clearOverlays();
                        }
                    });

                    map.getPanes().labelPane.appendChild(div);

                    return div;
                };
                this.ComaplexCustomOverlay.prototype.draw = function() {
                    var map = this._map;
                    var pixel = map.pointToOverlayPixel(this._point); // 将地理坐标转换为像素坐标
                    this._div.style.left = pixel.x + "px";
                    this._div.style.top = pixel.y + "px";
                };
               
            },
            addOverlay(){
                 // 添加覆盖物
                for (let i = 0; i < this.areaList.length; i++) {
                    let myCompOverlay = new this.ComaplexCustomOverlay(
                        new BMap.Point(this.areaList[i].lng, this.areaList[i].lat),
                        this.areaList[i].quyu.name,
                        `${this.areaList[i].houseNum}间`,
                        this.areaList[i].quyuAId,
                        this.areaList[i].lng,
                        this.areaList[i].lat
                    );
                    this.map.addOverlay(myCompOverlay);
                }
            },
            addControl(map){
                // 定义一个控件类，即function    
                function ZoomControl(){    
                    // 设置默认停靠位置和偏移量  
                    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;    
                    this.defaultOffset = new BMap.Size(10, 10);    
                }    
                // 通过JavaScript的prototype属性继承于BMap.Control   
                ZoomControl.prototype = new BMap.Control();
                ZoomControl.prototype.initialize = function(map){    
                    // 创建一个DOM元素   
                    var div = document.createElement("div");    
                    // 添加文字说明    
                    div.appendChild(document.createTextNode("放大2级"));    
                    // 设置样式    
                    div.style.cursor = "pointer";    
                    div.style.border = "1px solid gray";    
                    div.style.backgroundColor = "white";    
                    // 绑定事件，点击一次放大两级    
                    div.onclick = function(e){  
                        map.zoomTo(map.getZoom() + 2);    
                    }    
                    // 添加DOM元素到地图中   
                    map.getContainer().appendChild(div);    
                    // 将DOM元素返回  
                    return div;    
                }
                // 创建控件实例    
                var myZoomCtrl = new ZoomControl();    
                // 添加到地图当中    
                map.addControl(myZoomCtrl);
            }
        }
}
</script>
<style scoped>
.map {
  width: 100%;
  height: 100%;
  /* overflow: hidden;
        margin: 0; */
  font-family: "微软雅黑";
}
</style>