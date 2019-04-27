 import request from '../../utils/request'

class Login{
    /**发送手机验证码**/
     sendphoneCode(data){
         return request({
            url:'verificationcodes',
            method:'post',
            data
        })
    }
    /**第三方登录**/
    thirdPartyLogins(str,data){
       return request({
            url:`socials/${str}/authorizations`,
            method:'post',
            data
       })
    }
    /**手机号登录**/
    phoneLogin(data){
        return request({
            url:`users`,
            method:'post',
            data
       })
    }
    /**绑定微信号**/
   bindweixin(data){
       return request({
           url:`users/bounds/weixin`,
           method:'patch',
           data
       })
   }
   /**绑定手机号**/
   bindPhone(data){
    return request({
        url:`users/bounds/phone`,
        method:'patch',
        data
    })
   }

}

export {Login}
