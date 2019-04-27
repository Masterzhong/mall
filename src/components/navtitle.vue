<template>
    <div>
         <van-nav-bar :title="title" :left-arrow="arrow" />
    </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
   props:['title','arrow'], 
   components:{
       [NavBar.name]:NavBar,
   }
}
</script>

<style scoped>

  .van-nav-bar{
      height:46px;
      line-height:46px;
      background-color:#ea5170;
  }
  .van-nav-bar__title{
      color:#fff;
      font-size:14px;
  }
  .van-icon-arrow-left:before{
      color:#fff;
      font-size:20px;
  }
  .van-hairline--bottom::after{
      border-bottom:none;
  }

</style>
