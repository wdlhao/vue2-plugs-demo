<template>
    <div class="container">
        <div class="header">
            <Header :title="title"  name="reservation"></Header>
        </div>
        <div class="telCodeArea"
               name="group">
            <div class="telArea">
                <input class="item tel"
                       placeholder="请输入手机号"
                       v-model="telphone"
                       type="number"
                       >
                <div class="iconarea">
                    <i class="icon iconfont icon-shouji"></i>
                </div>
                <v-touch tag="a"
                         v-on:tap="getCode">
                    <div class="codetitle">{{codeTitle}}</div>
                </v-touch>
            </div>
            <div class="yancodeArea">
                <input class="item yancode"
                       placeholder="请输入验证码"
                       type="number"
                       v-model="yancode">
                <div class="iconarea">
                   <i class="icon iconfont icon-suo"></i>
                </div>
            </div>
        </div>
        <div class="btnArea">
            <v-touch tag="a"
                     v-on:tap="login">
                <div type="primary"
                          :class="[ isActive?'loginSuccess':'loginDefault', 'login']">登录</div>
            </v-touch>
        </div>
        <tips v-if="showTip"
              :content="content"></tips>
        <loading :loading="loading"></loading>
    </div>
</template>

<script>
import { getyancode, login } from "./api";
import * as mutils from "@/utils/mUtils";
import Tips from "pC/tips";
import Header from "pC/header";
import Loading from "pC/loading"; // loading
import { clearInterval, setInterval } from 'timers';


export default {
    name: "Login",
    data() {
        return {
            title:"",
            telphone: "",
            yancode: "",
            isClear: false,
            codeTitle: "获取验证码",
            timeout: 1000,
            count: 60,
            time: null,  // 定时器
            isActive: true,
            content: "",
            loading: {
                show: false
            },
        };
    },
    components: {
        Tips,
        Loading,
        Header
    },
    computed: {
        showTip() {
            // 获取state里的showTops值
            return this.$store.state.showTips;
        }
    },
    created() {
        
    },
    mounted() {},
    methods: {
        async login() {
            // 提交时，做验证；
            if (this.checkMobile() && this.checkMsgCode()) {
                this.loading.show = true;
                let reqData = {
                    phone: mutils.replaceAllSpace(this.telphone),
                    code: mutils.replaceAllSpace(this.yancode)
                };
                const res = await login(reqData);
                if (res.status.code == "200") {
                  
                } else {
                    this.loading.show = false;
                    // 后台接口会进行相关的验证失效判断，前端展示返回的内容即可；
                    this.content = res.status.msg;
                    this.showTips();
                }
            }
        },
        async getCode() {
            if (this.checkMobile()) {
                this.countDown(); // 倒计时显示
                let reqData = {
                    phone: mutils.replaceAllSpace(this.telphone)
                };
                const res = await getyancode(reqData);
                if (res.status.code == "200") {
                    console.log("验证码获取成功！");
                } else {
                    this.content = "验证码获取失败！";
                    this.showTips();
                }
            }
        },
        showTips() {
            // copy成功显示提示框
            this.$store.commit("tipFn", true); //调用state的tipFn方法
        },
        // 60S倒计时方法
        countDown() {
            this.codeTitle = this.count + "s后重新获取";
            clearInterval(this.time)
            this.time=setInterval(()=>{
                this.count--;
                this.codeTitle = this.count + "s后重新获取";
                if (this.count === 0) {
                    clearInterval(this.time);
                    this.codeTitle = "重新获取验证码";
                    this.count = 60;
                }
            },this.timeout)
        },
        checkMobile() {
            // let regTel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            let regTel = /^1(3|4|5|7|8)\d{9}$/;
            let mobile = mutils.replaceAllSpace(this.telphone);
            if (!mobile) {
                this.content = "请填写手机号";
                this.showTips();
                return false;
            } else if (!regTel.test(mobile)) {
                this.content = "请填写11位有效手机号";
                this.showTips();
                return false;
            } else {
                return true;
            }
        },
        checkMsgCode() {
            let code = mutils.replaceAllSpace(this.yancode);
            if (!code) {
                this.content = "请输入验证码";
                this.showTips();
                return false;
            } else if (!/^\d{6}$/.test(code)) {
                this.content = "请输入正确的6位验证码";
                this.showTips();
                return false;
            } else {
                return true;
            }
        },
        checkBtn() {
            let mobile = mutils.replaceAllSpace(this.telphone),
                code = mutils.replaceAllSpace(this.yancode);
            if (mobile.length == 11 && code.length == 6) {
                this.isActive = true;
            } else {
                this.isActive = false;
            }
        }
    },
    watch: {
        telphone() {
            if(this.telphone.length > 11){
                this.telphone = this.telphone.substring(0,11);  // 限制用户输入多余的数字
            }
            this.checkBtn();
        },
        yancode() {
            if(this.yancode.length > 11){
                this.yancode = this.yancode.substring(0,6);  
            }
            this.checkBtn();
        }
    }
};
</script>
<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .header {
        width:100%;
        background: #ffffff;
        box-shadow: 0 2px 0 0 rgba(234, 234, 234, 0.5);
    }
    h2 {
        font-size: 0.72rem;
        color: #333333;
        margin-bottom:1.47rem;
        margin-top:.8rem;
    }
    .telCodeArea {
        .telArea {
            position: relative;
            margin-bottom: .8rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .yancodeArea {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.6rem;
        }
        .iconarea{
            position: absolute;
            top: 0;
            left: .24rem;
            height: 1.2rem;
            line-height: 1.2rem;
            .icon{
                font-size: 0.4rem;
                display: block;
                height: 100%;
                margin-top: -.04rem;
            }
        }
        .item {
            width: 8.4rem;
            height: 1.2rem;
            display: inline-block;
            border: 1px solid #eaeaea;
            border-radius: 0.11rem;
            position: relative;
            padding: 0 .27rem;
            box-sizing: border-box;
            font-size: 0.4rem;
        }
        .codetitle {
            font-size: 0.37rem;
            color: #1fb7b6;
            position: absolute;
            right: 0;
            top: 0;
            height: 1.2rem;
            line-height: 1.2rem;
            padding: 0px 20px;
            box-sizing: border-box;
            border: none;
            border-left: 1px solid #eaeaea;
        }
        .tel {
            padding-left: 0.77rem;
        }
        .yancode {
            padding-left: 0.77rem;
        }
    }
    .btnArea {
        .login {
            width: 8.4rem;
            height: 1.2rem;
            line-height: 1.2rem;
            border-radius: .11rem;
            font-size: 0.43rem;
            color: #ffffff;
            text-align: center;
        }
        .loginDefault {
            background: #cccccc;
        }
        .loginSuccess {
            background-image: linear-gradient(
                -120deg,
                #64cece 0%,
                #85dfc8 100%
            );
        }
    }
}
</style>
