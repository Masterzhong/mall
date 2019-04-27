<template>
   <div class="box" v-if="data">
       <p class="tips">本次售后服务将由{{data.store.name}}为您服务</p>
        <van-cell title="已退款"  value="明细" is-link @click="show = true" v-if="data.service_type=='退货退款'"/>
       <!--  <van-cell title="沟通记录"  value=" " is-link /> -->
        <!--退款-->
        <div  v-if="data.service_type=='退货退款'" >
        <van-panel title="商品信息" :status="data.status.msg">
        <div class="product-content">
             <productItem :data="data.order_items" :showStep="false" :num="data.order_items.refund_amount" text="申请数量" priceText="实付价"/>
          <div class="item-bottom">申请退款金额：￥{{data.refund_price}}</div>
        </div>
        </van-panel>
        </div>
        <!--换货-->
        <div v-if="data.service_type=='换货'" >
            <van-panel title="申请商品" :status="data.status.msg">
                <div class="product-content">
                    <productItem :data="data.order_items" :showStep="false" :num="data.order_items.refund_amount" text="申请数量" priceText="实付价"/>
                </div>
            </van-panel>
        </div>
        <div class="info">
           <li>
               <p>服务单号</p>
               <p>{{data.refund_no}}</p>
           </li>
           <li>
               <p>申请时间</p>
               <p>{{data.created_at}}</p>
           </li>
           <li>
               <p>服务类型</p>
               <p>{{data.service_type}}</p>
           </li>
           <li>
               <p>退款方式</p>
               <p>原路返回</p>
           </li>
           <li>
               <p>退款原因</p>
               <p>{{data.reason}}</p>
           </li>
        </div>

        <div class="qrcodeBox" v-if="data.refund_url">
           <div class="qrcode" >
               <img :src="data.refund_url"/>
               <div>请把二维码出示给店员进行退款</div>
           </div>
        </div>
        <div class="buttongroup">
         <van-button plain hairline type="primary" class="buttonStyle">联系客服</van-button>
         <van-button plain hairline type="danger" class="buttonStyle">拨打电话</van-button>
        </div>
        <van-actionsheet v-model="show"   title="退款明细">
         <div class="detailContent">
             <div class="detail-item">
                 <p>退款总额</p>
                 <p>¥{{data.refund_price}}</p>
             </div>
             <div class="detail-item">
                 <p v-if="data.payment_method=='alipay'">支付宝支付</p>
                 <p v-else>微信支付</p>
                 <p>¥{{data.refund_price}}</p>
             </div>
             <p>说明：在线支付仅支持原路返回</p>
         </div>
        </van-actionsheet>
   </div> 
</template>

<script>
import {Order} from '@/api/order/order'
import { Cell, CellGroup, Panel, Button, Actionsheet  } from 'vant';
import productItem from '@/components/productItem'
const order = new Order();
export default {
    components:{
        productItem:productItem,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Panel.name]:Panel,
        [Button.name]:Button,
        [Actionsheet.name]:Actionsheet,
    },
    data(){
        return {
            data:null,
            show:false,
            qrUrl:null,
        }
    },
    methods:{
       loadData(){
           var id = this.$route.query.id
           this.qrUrl = `https://api.shark-baby.com/minipro/order_refunds?id=${id}`
           order.afterSaleDetail(id).then(res=>{
               console.log(res);
               this.data = res
               this.data.order_items.amount = this.data.order_items.refund_amount
           })
           console.log(id)
       }
    },
    created(){
        this.loadData();
    }
}
</script>

<style scoped>
.box{
    width:100%;
    min-height:100vh;
    background-color:#f9f9f9;
}
.tips{
    text-align:center;
    color:#666;
    font-size:14px;
    line-height:40px;
    height:40px;
    margin:0;
}
 .van-cell__title{
     text-align:left;
 }
 .van-cell__value{
     text-align: right;
 }
 .van-field__label{
     text-align: left;
 }
 .van-cell{
     text-align:left;
     margin:10px 0;
 }
 .product-content{
     width:100%;

 }
 .info{
  width:100%;
  background-color:#fff;
  margin:10px 0;
 }
 .info li {
     list-style:none;
     width:100%;
     height:30px;
 }
 .info li p{
     float:left;
     margin:0;
     line-height:30px;
     margin-left:10px;
     font-size:13px;
     
 }
 .info li p:nth-child(1){
     color:#666;
 }
  .info li p:nth-child(2){
     color:#333;
 }
 .item-bottom{
     width:100%;
     height:40px;
     line-height:40px;
     color:#666;
     text-align:right;
     padding-right:10px;
     box-sizing:border-box;
 }
 .qrcodeBox{
     width:100%;
     height:325px;
     background-color:#fff;
     margin:10px 0;
     display:flex;
     align-items:center;
     justify-content: center;
 }
 .qrcode{
     width:280px;
     height:280px;
 }
 .qrcode img{
     width:100%;
     height:auto;
 }
 .buttongroup{
   width:100%;
   height:40px;
   background-color:#fff;
   margin:10px 0;
   display:flex;
   align-items:center;
   justify-content: center;
 }
 .buttonStyle{
     margin:0 30px;
     height:30px;
     line-height:20px;
 }
 .detailContent{
     width:100%;
     height:150px;
 }
 .detail-item{
     height:40px;
     width:100%;
 }
 .detail-item p{
   margin:0;
   float:left;
   font-size:13px;
   line-height:40px;
 }
 .detail-item p:nth-child(1){
     color:#666;
     margin-left:10px;
 }
 .detail-item p:nth-child(2){
     color:#333;
     margin-left:20px;
 }
 .detailContent>p{
     width:100%;
     margin:0px;
     margin-top:30px;
     color:#999;
 }
</style>
