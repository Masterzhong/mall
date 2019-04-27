<template>
    <div>
        <van-button slot="button" size="small" plain class="BtnClass" @click="sendPhone" :disabled="disable" >{{msg}}</van-button>
    </div>
</template>

<script>
import { Button, Toast, } from 'vant';
import {Login} from '@/api/login/login';
const login = new Login()
export default {
   props:['phone'], 
   components:{
       [Button.name]:Button
   },
   data(){
       return {
            msg:'发送验证码',
            disable:false
       }
   },
   methods:{
     sendPhone(){
        login.sendphoneCode({phone:this.phone}).then(res=>{
            this.$emit('getcode',res.key)
            Toast('验证码发送成功')
            this.disable = true
            this.cutdown()
        }).catch(err=>{
            console.log(err)
        })  
     },
    
    cutdown(){
        var sec = 59
            var tag = setInterval(()=>{
             if(sec>0){
                 this.msg = sec
             }else{
                this.disable = false
                this.msg = '发送验证码' 
                clearInterval(tag)
             }
             sec--
        },1000)
    }

   }
}
</script>

<style scoped>
   .BtnClass{
       border:1px solid #ea5170;
       color:#ea5170;
       margin-right: 10px;
       width:85px;
       height:30px;
       line-height:30px;
   }
</style>
