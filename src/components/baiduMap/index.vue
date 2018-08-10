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
                ak:"aUGsIRrh54O2tyyv1RifNsNg7QfhwCwM"
            }
        },
        mounted() {
            this.$nextTick(function(){
		      var _this = this;
		      MP(_this.ak).then(BMap => {
                  //在此调用api
                    // 创建Map实例
                    let map = new BMap.Map("XSDFXPage",
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
                    setTimeout(function(){
                        map.panTo(new BMap.Point(113.262232,23.154345));
                    }, 2000);
                    setTimeout(function(){
                        map.setZoom(14);
                    },4000);
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