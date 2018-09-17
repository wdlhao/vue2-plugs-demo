import fetch from "./fetch";
import { shareOosImg,wechatId } from "@/utils/env"; // 分享默认的图标

/**
 * 获取微信端签名，时间戳等信息
 */
export const getCompactHouseList = (reqData) => fetch("/v2/cotton/user/get_wechat_authorize", reqData);


export function setWxConfig(link, title, desc, pic) {
    let url = window.location.href.split("#")[0];
    getCompactHouseList({ "wechatId": wechatId, "url": url }).then((res) => {
        if (res.status.code == 200) {
            let wxConfigObj = res.result.parment;
            let myLink = link ? link : "";
            let myTitle = title ? title : "棉花公寓";
            let Mydesc = desc ? desc : "惊喜多多!优惠多多!";
            let mypic = pic ? pic : shareOosImg;
            wxConfig(wxConfigObj, myLink, myTitle, Mydesc, mypic);
        }
    }).catch((err) => {
        console.log(err);
    });
};


function wxConfig(wxConfigObj, link, title, desc, pic) {
    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxConfigObj.appid, // 必填，公众号的唯一标识
        timestamp: wxConfigObj.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxConfigObj.noncestr, // 必填，生成签名的随机串
        signature: wxConfigObj.signature, // 必填，签名
        jsApiList: ["checkJsApi","onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "chooseImage" ] // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: pic, // 分享图标
            success: function () {
                // alert("分享朋友圈成功");
            }
        });
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: pic, // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
                //alert("分享朋友成功");
            }
        });
        wx.checkJsApi({
            jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                console.log(res);
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });
    });
    wx.error(() => {
    });
};



export function chooseWXPay(data, This) {// 支付
    wx.chooseWXPay({
        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: function (res) {
            This.$router.push({ path: "/myReserve", query: { "reserve": "reservation" } });
        }
    });
};

//拍照或从手机相册中选图接口
export function chooseImage(callback) {
    wx.chooseImage({
        count: 6, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            callback(res);
        }
    });
}

