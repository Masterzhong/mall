<template>
 <div class="loaddingBox">
    <div class="content">
        <div v-for="item in data" :key="item" class="rect"></div>
    </div>
 </div>   
</template>

<script>
export default {
   data(){
       return {
           data:[1,2,3,4,5,6,7,8,9]
       }
   }
}
</script>

<style scoped>
  .loaddingBox{
      width:100vw;
      height:100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color:rgba(255,255,255,.8);
      position: fixed;
      top:0;
      left:0;
      z-index:999;
  }
  .content{
        min-width: 50px;
        height: 60px;
        text-align: center;
        font-size: 10px;
        position: relative;
  }
  .content>.rect{
      background-color:rgba(234,81,112,1);
      height: 100%;
      width: 6px;
      display: inline-block;
      -webkit-animation: stretchdelay 1.2s infinite ease-in-out;/*设置动画延时*/
      animation: stretchdelay 1.2s infinite ease-in-out;/*设置动画延时*/
  }
  .rect:nth-child(1){
    -webkit-animation-delay: -.7s;/*设置动画延时*/
    animation-delay: -.7s;/*设置动画延时*/
  }
  .rect:nth-child(2){
    -webkit-animation-delay: -.8s;/*设置动画延时*/
    animation-delay: -.8s;/*设置动画延时*/
  }
  .rect:nth-child(3){
    -webkit-animation-delay: -.9s;/*设置动画延时*/
    animation-delay: -.9s;/*设置动画延时*/
  }
  .rect:nth-child(4){
    -webkit-animation-delay: -1s;/*设置动画延时*/
    animation-delay: -1s;/*设置动画延时*/
  }
  .rect:nth-child(5){
    -webkit-animation-delay: -1.1s;/*设置动画延时*/
    animation-delay: -1.1s;/*设置动画延时*/
  }
  .rect:nth-child(6){
    -webkit-animation-delay: -1s;/*设置动画延时*/
    animation-delay: -1s;/*设置动画延时*/
  }
  .rect:nth-child(7){
    -webkit-animation-delay: -.9s;/*设置动画延时*/
    animation-delay: -.9s;/*设置动画延时*/
  }
  .rect:nth-child(8){
    -webkit-animation-delay: -.8s;/*设置动画延时*/
    animation-delay: -.8s;/*设置动画延时*/
  }
  .rect:nth-child(9){
    -webkit-animation-delay: -.7s;/*设置动画延时*/
    animation-delay: -.7s;/*设置动画延时*/
  }


  @-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4); background-color:rgba(234,81,112,.5); } 
  20% { -webkit-transform: scaleY(1.0); background-color:rgba(234,81,112,1);}
 }

    @keyframes stretchdelay {
    0%, 40%, 100% {
        transform: scaleY(0.4);
        background-color:rgba(234,81,112,.5);
        -webkit-transform: scaleY(0.4);
    }  
    20% {
        transform: scaleY(1.0);
        background-color:rgba(234,81,112,1);
        -webkit-transform: scaleY(1.0);
    }
    }

</style>
