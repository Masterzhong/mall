<template>
    <div v-if="data" class="box">
        <!--轮播-->
        <!-- <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in data.images.data" :key="index">
                    <img :src="item.path" width="100%" />
                </van-swipe-item>
            </van-swipe>
        </div> -->
        <div class="imgdetail">
            <img :src="data.images.data[0].path" /> 
        </div>
        <!--价格 名称-->
        <div class="baseInfo">
            <p>¥{{data.price}}</p>
            <p>{{data.name}}<span>({{data.desc}})</span></p>
        </div>
        <!--详情-->
        <div class="imgdetail" v-for="(i,index) in data.image_details.data" :key="index">
            <img :src="i.path" /> 
        </div>
        <!--底部按钮-->
        <div class="bottom">
            <van-goods-action>
                <van-goods-action-mini-btn
                    icon="chat-o"
                    text="客服"
                />
                <van-goods-action-mini-btn
                    icon="cart-o"
                    text="购物车"
                />
                <van-goods-action-big-btn
                    text="加入购物车"
                />
                <van-goods-action-big-btn
                    primary
                    text="立即购买"
                />
            </van-goods-action>
        </div>
    </div>
</template>

<script>
import {Mall} from '@/api/mall/mall'
import { Swipe, SwipeItem, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn,Sku } from 'vant';
const mall = new Mall();
export default {
  components:{
      [Swipe.name]:Swipe,
      [SwipeItem.name]:SwipeItem,
      [GoodsAction.name]:GoodsAction,
      [GoodsActionBigBtn.name]:GoodsActionBigBtn,
      [GoodsActionMiniBtn.name]:GoodsActionMiniBtn,
      [Sku.name]:Sku
  }, 
  data(){
   return {
       data:null,
       showBase:false,
        }
  },
  methods:{
      loadData(){
          mall.mallDetail(this.$route.query.id).then(res=>{
              console.log(res);
              this.data = res
          })
      }
  },
  created(){
      this.loadData()
  }
}
</script>

<style scoped>
 .box{
     width:100%;
     min-height:100vh;
     padding-bottom:20px;
     background-color:#f9f9f9;
 }
  .banner{
      width:100%;
      height:350px;
  }
  .imgdetail{
      width:100%;
      margin:10px 0;
  }
  .imgdetail img{
      width:100%;
      height:auto;
  }
  .bottom{
      width:100%;
      position: fixed;
      bottom:0px;
      z-index: 99;
  }
  .baseInfo{
      width:100%;
      height:60px;
      background-color:#fff;
      margin:30px 0;

  }
  .baseInfo p {
      font-size:20px;
      color:#ea5170;
      line-height: 60px;
      margin:0;
      text-align: left;
      text-indent: 10px;
      float:left;
  }
 .baseInfo p:nth-child(2){
     font-size:16px;
     color:#666;
     margin-right:10px;
 } 
  .baseInfo p span{
      font-size:13px;
      color:#999;
  }
</style>
