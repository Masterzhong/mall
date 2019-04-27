
import wx from 'weixin-jsapi'
export function wxPay(appid,timeStamp,nonceStr,paySign,prepay_id){
    wx.config({                
          beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题                
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来               
          appId: appid, // 必填，企业微信的corpID                
          timestamp: timeStamp, // 必填，生成签名的时间戳                
          nonceStr: nonceStr, // 必填，生成签名的随机串 必填，生成签名的随机串               
          signature: paySign, // 必填，签名                
          jsApiList: ['chooseWXPay']
          })

     wx.ready(function(){
            wx.chooseWXPay({
              timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
              package: prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: paySign, // 支付签名
              success: function (res) {
                  //这里写成功后的动作 我试过跳转路由好像不灵 或者是执行太快后端处理订单未变化呢 我改成了这个   window.location.href="你所要跳转的页面";
                  console.log('支付成功')
              },
              cancel: function (res) {
                  alert('已取消支付');
              },
              fail: function (res) {
                  alert('购买失败，请重新创建订单')
              }
            });
         });   
 }