<template>
    <div v-if="data">
        <div class="tips" v-if="isShow"><span>长按图片，可保存至手机相册</span>
         <div class="cross" @click="closeTips" ><van-icon name="cross" color="#ff6600" /></div>
        </div>
        <div class="warranty" ref="imageWrapper" v-show="!isImage">
             <div class="warranty-content">
                 <!--头部-->
                 <div class="header-content">
                    <img src="../../assets/img/qualityTitle.png" alt="">
                 </div>
                 <!--角色信息-->
                 <div class="info-content">
                     <div class="base-info">
                         <ul>
                             <li>订单号：{{data.order_no}}</li>
                             <li>顾客姓名：{{data.user_name}}</li>
                             <li>手机号码：{{data.phone}}</li>
                             <li>销售员：{{data.sales_name}}</li>
                         </ul>
                     </div>
                <!--商品信息-->
                      <div class="table-content">
                       <table width="100%" border="0" cellspacing="0" cellpadding="0">
                         <tr class="table-header">
                             <th>条码</th>
                             <th>品名</th>
                             <th>数量</th>
                             <th>零售价</th>
                         </tr>
                         <tr v-for="(item,index) in data.items.data" :key="index">
                             <td>{{item.style_number}}</td>
                             <td>{{item.name}}</td>
                             <td>{{item.amount}}</td>
                             <td>{{item.price}}</td>
                         </tr>
                       </table>
                     </div>
                  <!--付款信息-->
                      <div class="pay-content">
                          <div class="price">
                              <p>实付金额</p>
                              <p>¥ {{data.total_price}}</p>
                          </div>
                          <!-- <div class="user">
                             <p>用户ID：116881</p>
                             <p>本次积分：23800</p>
                             <p>积分余额：6666</p>
                          </div> -->
                          <p>感谢惠顾SHARKBABY鲨鱼甜心潮流配饰</p>
                          <p>本质保单是您享受服务和权益的重要凭证,请妥善保存</p>
                          <p>正品商品如有质量问题7天包换,30天保修;</p>
                          <div class="zhang">
                              <img src="../../assets/img/zhang.png" alt="">
                          </div>
                      </div>
                   <!--底部落款-->  
                     <div class="footer">
                         <div class="qrcode">
                             <img src="../../assets/img/qrcode.png" alt="">
                         </div>
                         <div class="letterLogo">
                             <div><img src="../../assets/img/letterLogo.png" alt=""></div>
                         </div>
                         <div class="compony-info">
                             <p>地址：深圳市罗湖区贝丽北路71号兴龙大厦12层</p>
                             <p>全国客服热线：400-6667-530</p>
                             <p>service@shark-baby.com</p>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
        <div class="imageContent" v-if="isImage">
            <img :src="dataURL" alt="">
        </div>
    </div>
</template>

<script>
import { Icon } from 'vant';
import html2canvas from 'html2canvas'
import {Order} from '@/api/order/order'
const order = new Order()
export default {
 components:{
       [Icon.name]:Icon
   },
 data(){
  return {
      isShow:true,
      isImage:false,
      dataURL:null,
      data:null,
  }
 },
 methods:{
     closeTips(){
         this.isShow = false
     },
     toImage() {
        html2canvas(this.$refs.imageWrapper,{
            backgroundColor: null
        }).then((canvas) => {
            let dataURL = canvas.toDataURL("image/png");
            this.dataURL = dataURL;
            this.isImage = true;
            
        });
    },
    loadData(){
      order.electronicWarranty(this.$route.query.order_id,this.$route.query.user_id).then(res=>{
           this.data = res
           this.$nextTick(()=>{
               this.toImage()
           })
      })
    }
 },
 mounted(){
     
     this.loadData()
 }  
}
</script>

<style scoped>
  .tips{
      width:100%;
      height:36px;
      background-color:#fefcec;
      padding: 0 10px;
      box-sizing: border-box;
      position: relative;
      top:0px;
      left:0;
  }
  .tips span{
      color:#ff6600;
      font-size:12px;
      height:100%;
      display: block;
      text-align:left;
      line-height:36px;
  }
  .cross{
      float:right;
      line-height:36px;
      position: absolute;
      right:10px;
      top:1px;
  }
  .warranty{
     width:375px;
     min-height:665px; 
     background-image: url('../../assets/img/bgImage.png');
     background-size:100%;
     background-repeat: repeat;
     padding:16px;
     box-sizing: border-box;
  }
  .warranty-content{
     width:100%;
     min-height:630px;  
  }
  .header-content{
      width:100%;
      height:66px;
  }
  .header-content img{
      width:100%;
      height:auto;
  }
  .info-content{
      width:100%;
      min-height:564px;
      border:1px solid #b3b3b3;
      box-sizing: border-box;
      background-color:#fff;
      padding:17px 24px;
      position: relative;
  }
  .base-info{
      width:100%;
  }
  .base-info ul{
      margin:0;
      padding:0;
  }
  .base-info ul>li{
      text-align: left;
      color:#231e1f;
      font-size:13px;
      height:20px;
      line-height: 20px;
      font-weight: 500;
      margin-bottom: 6px;
  }
  .table-content{
      width:100%;
  }
  tr{
       height:30px;
       line-height:30px;

  }
  th{
      border-bottom:1px solid #b3b3b3;
      border-top:1px solid #b3b3b3;
      color:#a9a7a8;
  }
  td{
      color:#a9a7a8;
  }
  .pay-content{
      width:100%;
      margin-top:57px;
      position: relative;
  }
  .price{
      height:40px;
      border-bottom:1px solid #b3b3b3;
  }
  .price p{
      color:#ea5170;
      font-size:18px;
      margin:0; 
      font-weight: 550;
  }
  .price p:nth-child(1){
      float:left;
  }
  .price p:nth-child(2){
      float:right;
      margin-top: 3px;
  }
  .user{
      height:30px;
      width:100%;
      border-bottom:1px solid #b3b3b3;
  }
  .user p{
      float:left;
      width:33%;
      height:100%;
      line-height:30px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin:0;
      font-size:11px;
      color:#a9a7a8;
  }
    .user p:nth-child(1){
       text-align: left;
    }  
    .user p:nth-child(2){
       text-align: center;
    } 
    .user p:nth-child(3){
      text-align: right;
    } 
  .pay-content>p{
      font-size:10px;
      margin:5px 0;
      width:100%;
      height:20px;
      line-height: 20px;
      text-align: left;
      color:#a9a7a8;
  }
  .zhang{
      width:100px;
      height:100px;
      position:absolute;
      right:0;
      bottom:0;
  }
  .zhang img{
      width:100%;
      height:auto;
  }
  .footer{
      width:100%;
      height:140px;
      margin-top:89px;
      position: relative;
  }
  .qrcode{
      position: absolute;
      right:0;
      top:0;
      width:50px;
      height:50px;
  }
 .qrcode img{
     width:100%;
     height:auto;
 }
 .letterLogo{
     width:100%;
     height:30px;
     border-bottom:1px solid #b3b3b3;
 } 
 .letterLogo>div{
     width:48px;
     height:12px;
     float:left;
     margin-top:10px;
 }
 .letterLogo>div>img{
     width:100%;
     height:auto;
 }
 .compony-info{
     width:100%;
     height:50px;
 }
 .compony-info p{
     margin:10px 0;
     font-size:10px;
     color:#a9a7a8;
     text-align:left;
 }
.compony-info p:nth-child(2){
    width:50%;
    text-align: left;
    float:left;
}
.compony-info p:nth-child(3){
    width:50%;  
    text-align: right;
    float:right;
}
.imageContent{
    width:100%;
}
.imageContent img{
    width:100%;
    height:auto;
}
</style>
