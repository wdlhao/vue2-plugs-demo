<template>
   <div class="lazyload">
        <header :title="title"></header>
        <div class="content">
            <div class="tuijian">
                <span class="title">推荐歌单</span>
                <i class="icon iconfont icon-jiantou"></i>
            </div>
            <div class="item">
                <ul>
                   <li v-for="(item,index) in tuiJianList" :key="index">
                       <div class="dan">
                           <img class="logo" v-lazy="item.picUrl" alt="">
                           <p class="name">{{item.name}}</p>
                       </div>
                   </li>
                </ul>
            </div>
        </div>
   </div>
   
</template>

<script>
import Header from "pC/header";
import {personalized} from "./api";

export default {
    name: "Lazyload",
    data() {
        return {
            title: "房源委托",
            tuiJianList:[
               
            ]
        };
    },
    components: {
        Header
    },
    created(){
        this.getpersonalized();
    },
    computed: {},
    methods: {
        async getpersonalized() {
            let reqData = {
                //  compactId:this.houseInfo.compactId, 
                //  type:this.type
            };
            const res = await personalized(reqData);
            console.log(res);
            if (res.code == "200") {
                this.tuiJianList = res.result; // arr

            }else{
                console.log('获取推荐歌单请求失败~')
            }
        }
    }
};
</script>

<style lang="less" scoped>
.lazyload {
    .content{
        display: flex;
        flex-direction: column;
       .tuijian{
           padding:.27rem .53rem;
           border-bottom:1px solid #D9D9D9;
           text-align: left;
           .title{
               font-size: .32rem;
               margin-right:.07rem;
           }
           .icon{
               font-size: .32rem;
           }
       }
       .item{
           border-left:1px solid #D9D9D9;
           border-right: none;
           ul{
               display: flex;
               flex-wrap: wrap;
               li{
                   width:33.33%;
                   height: auto;
                   text-align: center;
                   padding: .27rem;
                   box-sizing: border-box;
                   border:1px solid #D9D9D9;
                   border-top:none;
                   border-left:none;
                   .dan{
                       display: flex;
                       flex-direction: column;
                       align-items: center;
                       .logo{
                           width:100%;
                       }
                       .name{
                            padding: 0.13rem 0;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            color: #000000;
                            font-size: .19rem;
                            width: 100%;
                       }
                   }
               }
           }
       }
    }
}
</style>


