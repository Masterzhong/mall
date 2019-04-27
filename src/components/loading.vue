<template>
  <div class="loading">
     <van-loading color="#fff" class="loadingImage" />
  </div>
</template>
 
<script>
  import { Loading } from 'vant';
  export default {
    components:{
        [Loading.name]:Loading 
    },
    data () {
      return {}
    },
  }
</script>
<style scoped>
  .loading{
    position: fixed;
    top:0;
    left:0;
    z-index:121;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    vertical-align: middle;
    text-align: center;
    display: flex;    
    justify-content:center;   
    align-items:Center;
  }
  .loadingImage{
  	margin:0 auto;

  }
</style>