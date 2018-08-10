<template>
    <!--地图容器-->
    <div id="XSDFXPage" class="XSDFXPage"></div>
</template>

<script>
import {MP} from '@/utils/map';

    export default {
        name:'',
        data () {
            return {
                map:"",
                ak:"aUGsIRrh54O2tyyv1RifNsNg7QfhwCwM"
            }
        },
        mounted() {
            this.$nextTick(function(){
		      let _this = this;
		      MP(_this.ak).then(BMap => {
                  //在此调用api
                    // 创建Map实例
                    let map = this.map =  new BMap.Map("XSDFXPage",
                        {enableMapClick:true}
                    );
                     console.log(map);
                    // 初始化地图,设置中心点坐标和地图级别
                    map.centerAndZoom(new BMap.Point(116.4035,39.915), 11);
                    // 添加地图类型控件
                    map.addControl(new BMap.MapTypeControl());  
                    // 设置地图显示的城市 此项是必须设置的
                    map.setCurrentCity("杭州");    
                    // 开启鼠标滚轮缩放      
                    map.enableScrollWheelZoom(true);
                    // 设置定时器，对地图进行自动移动
                    // setTimeout(function(){
                    //     map.panTo(new BMap.Point(113.262232,23.154345));
                    // }, 2000);
                    // setTimeout(function(){
                    //     map.setZoom(14);
                    // },4000);
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

                    //图画样式  -- 圆红色边框
                    var styleOptions = {
                        strokeColor: "red", //边线颜色。  
                        fillColor: "white", //填充颜色。当参数为空时，圆形将没有填充效果。  
                        strokeWeight: 2, //边线的宽度，以像素为单位。  
                        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。  
                        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。  
                        strokeStyle: 'solid' //边线的样式，solid或dashed。  
                    }

                    //实例化鼠标绘制工具  
                    var drawingManager = new BMapLib.DrawingManager(map, {
                        enableCalculate: true, //是否开启测量模式
                        isOpen: false, //是否开启绘制模式
                        enableDrawingTool: true, //是否显示工具栏
                        drawingToolOptions: {
                            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                            offset: new BMap.Size(5, 5), //偏离值
                            scale: 0.8, //工具栏缩放比例
                            drawingModes: [
                                BMAP_DRAWING_CIRCLE,
                            ]
                        },
                        circleOptions: styleOptions, //圆的样式  
                    });
                     //添加鼠标绘制工具监听事件，用于获取绘制结果
                    drawingManager.addEventListener('overlaycomplete', function(e){
                        //关闭画图
                        drawingManager.close();
                        //获取所画图形类型
                            // var overlays = [];
                            // overlays.push(e.overlay);
                            var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
                            for(var i=0;i<path.length;i++){
                                console.log("lng:"+path[i].lng+"\n lat:"+path[i].lat);
                            }
                    });



            });
        });
    }
}
</script>
<style scoped>
    html,body,.XSDFXPage{
        width: 100%;
        height: 100%;
        /* overflow: hidden;
        margin: 0; */
        font-family: "微软雅黑";
    }
</style>