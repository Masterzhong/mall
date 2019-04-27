<template>
    <div>
        <nav-title title="扫码关注"></nav-title>   
        <div class="contentBox">
            <div class="qrcontent">
                <p class="title">SHARKBABY总店</p>
                <div class="tips">请关注后进行付款</div>
                <div class="qrImage">
                   <qrcode :url="urlData"></qrcode>
                </div>
                <p style="margin-top: 20px;">长按扫码关注</p>
                <p>感谢您购买SHARKBABY的产品</p>
            </div>
        </div>
    </div>
</template>

<script>

import QrCode from '@/components/qrcode'
import NavTitle from '@/components/navtitle'
export default {
components:{
    qrcode:QrCode,
    navTitle:NavTitle
},
data(){
    return {
      urlData:null,
    }
},
created(){
    this.urlData = this.$route.query.url
}
}
</script>

<style scoped>

  .contentBox{
      width:100%;
      height:100%;
      position: fixed;
      background-color:#ea5170;
  }
 .qrcontent{
     width:334px;
     height:513px;
     background-color:#fff;
     margin:0 auto;
     border-radius:5px;
     margin-top:35px;
     box-sizing: border-box;
     padding-top:35px;
 }
 .qrcontent .title{
     width:330px;
     height:33px;
     font-size:25px;
     color:#333;
     margin:0 auto;
     text-align: center;
     line-height:33px;
 }
 .tips{
     width:100%;
     height:40px;
     background-color:rgba(234, 81, 112, .3);
     color:#ea5170;
     text-align:center;
     line-height:40px;
     font-size:13px;
     margin-top: 15px;
 }
 .qrImage{
        width: 300px;
        height: 300px;
        margin: 0 auto;
        margin-top: 10px;
 }

 .qrcontent>p:nth-child(n+2){
     width:100%;
     font-size:14px;
     color:#333;
     text-align: center;
     margin: 0;
 }


</style>
