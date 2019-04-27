<template>
    <div>
      <canvas id="canvas" ref ="canvas" v-show="false"></canvas>
      <img :src="imageUrl" alt="">
    </div>
</template>

<script>
var QRCode = require('qrcode')
export default {
  props:['url'],
  data(){
    return {
       imageUrl:'',
    }
  },
  methods: {
          useqrcode(){
            var that = this
            var canvas = document.getElementById('canvas')
              QRCode.toCanvas(canvas,this.url, function (error) {
                if (error) console.error(error)
                //将canvas转化成图片
                const src  = canvas.toDataURL("image/png");
                that.imageUrl = src;
              })
          },
        
      },
 mounted(){
  this.useqrcode();
 }     
}
</script>

<style scoped>
    div{
      width:100%;
      height:100%;
      background-color:#fff;
    }
    div img{
      width:100%;
      height:auto;
    }
</style>
