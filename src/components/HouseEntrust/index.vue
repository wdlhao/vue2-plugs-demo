<template>
    <div>
        <Header :title="title"
                :rule="ruleObj"></Header>
        <h4 class="explain">请填写您的相关信息，我们会在第一时间与您取得联系！</h4>
        <form @submit.prevent="validateBeforeSubmit">
            <p class="form-title">联系方式</p>
            <div class="form-item">
                <label>姓名:</label>
                <input type="text"
                       placeholder="请输入你的姓名"
                       v-model="params.ownerName"
                       v-validate="'required'"
                       name="ownerName">
                <span v-show="errors.has('ownerName')"
                      class="help is-danger">{{ errors.first('ownerName') }}</span>
            </div>
            <div class="form-item">
                <label>手机:</label>
                <input type="number"
                       placeholder="请输入你的手机号"
                       v-model="params.ownerPhone"
                       v-validate="'required|ownerPhone'"
                       name="ownerPhone">
                <span v-show="errors.has('ownerPhone')"
                      class="help is-danger">{{ errors.first('ownerPhone') }}</span>
            </div>
            <p class="form-title">房屋信息</p>
            <div class="form-item">
                <label>社区:</label>
                <input type="text"
                       placeholder="请输入你小区的名称"
                       v-model="params.xiaoquName"
                       name="xiaoquName"
                       v-validate="'required'">
                <span v-show="errors.has('xiaoquName')"
                      class="help is-danger">{{ errors.first('xiaoquName') }}</span>
            </div>
            <div class="form-item">
                <label>居室:</label>
                <input type="number"
                       placeholder="请输入你居室数量"
                       v-model="params.houseShi"
                       v-validate="'required|numeric'"
                       name="houseShi">
                <span v-show="errors.has('houseShi')"
                      class="help is-danger">{{ errors.first('houseShi') }}</span>
            </div>
            <div class="form-item">
                <label>面积:</label>
                <input type="number"
                       placeholder="请输入房屋面积"
                       v-model="params.houseArea"
                       v-validate="'required|numeric'"
                       name="houseArea">
                <span>m
                    <sup>2</sup>
                </span>
                <span v-show="errors.has('houseArea')"
                      class="help is-danger">{{ errors.first('houseArea') }}</span>
            </div>
            <div class="form-item">
                <label>租期:</label>
                <input type="number"
                       placeholder="可租年限"
                       v-model="params.houseZuqiId"
                       v-validate="'required|numeric'"
                       name="houseZuqiId">
                <span>年</span>
                <span v-show="errors.has('houseZuqiId')"
                      class="help is-danger">{{ errors.first('houseZuqiId') }}</span>
            </div>
            <p class="form-title">备注</p>
            <div class="form-item">
                <textarea placeholder="请填写备注"
                          v-model="params.houseRemark"></textarea>
            </div>
            <button>提交</button>
        </form>
    </div>
</template>
<script>

import Header from "pC/header";
export default {
    name: "HouseEntrust",
    data() {
        return {
            title: "房源委托",
            ruleObj: {
                text: "委托规则",
                url: "/entrustRule"
            },
            params: {
                xiaoquName: "", // 小区名称
                houseZuqiId: "", // 租期
                houseRemark: "", // 备注
                houseArea: "", // 面积
                houseShi: "", // 室
                ownerName: "", //业主名称
                ownerPhone: "" //业主电话
            },
            errorContent: ""
        };
    },
    components: {
        Header,
    },
    computed: {
       
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) {
                   alert("填写正确~");
                } else {
                   alert("填写有误~");
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.explain {
    line-height: 1.17rem;
    font-size: .35rem;
    color: #1fb7b6;
    text-align: center;
    background: #f5fafa;
}
form {
    padding: 0 0.53rem 0.93rem;
    .form-title {
        line-height: 2rem;
        font-size: 0.51rem;
        text-align: left;
    }
    .form-item {
        display: flex;
        margin-bottom: 0.67rem;
        position: relative;
        label {
            line-height: 1.2rem;
            font-size: 0.4rem;
            letter-spacing: 0.27rem;
        }
        input {
            flex: 1;
            height: 1.2rem;
            border: 1px solid #eaeaea;
            border-radius: 8px;
            padding: 0 0.4rem 0 0.27rem;
            font-size: 0.4rem;
            outline: none;
        }
        span {
            position: absolute;
            right: 0.27rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.32rem;
            padding-right: 0.27rem;
            sup {
                position: absolute;
                right: 0;
                top: -0.1rem;
                font-size: 0.35rem;
            }
        }
        .help {
            color: red;
            top: 1.53rem;
        }
        textarea {
            width: 100%;
            height: 2.93rem;
            padding: 0.27rem;
            font-size: 0.4rem;
            border: 1px solid #eaeaea;
            border-radius: 8px;
            outline: none;
        }
    }
    button {
        margin-top: 0.67rem;
        width: 100%;
        font-size: 0.43rem;
        color: #fff;
        height: 1.2rem;
        outline: none;
        border: none;
        background: linear-gradient(left, #64cece, #85dfc8);
    }
}
</style>


