<template>
    <div class="itemBox">
        <div class="product-item">
            <div class="item-image">
                <img :src="data.image" alt="">
            </div>
            <div class="item-text">
                <p>{{data.name}}</p>
                <p><span>{{priceText}}：￥{{data.price}}</span><span style="padding-left: 20px;">{{text}}：{{data.amount}}</span></p>
            </div>
        </div>
        <div class="foot-item" v-if="showStep">
            <p>申请数量</p>
            <div class="foot-step"><van-stepper :value="num" :max="data.amount" :min="min" disable-input @change="changeValue" /></div>
        </div>
    </div>
</template>

<script>
import { Stepper } from 'vant';
export default {
 props:{
     data:{
       default:null,     
     },
     showStep:{
        default:true
     },
     min:{
         default:1
     },
     num:{
         default:1
     },
     text:{
         default:'购买数量'
     },
     priceText:{
         default:'单价'
     }
 },
 components:{
     [Stepper.name]:Stepper
 },
 data(){
     return{
     }
 },
 methods:{
    changeValue(e){
        this.$emit('changeValue',e)
    }
 }
}
</script>

<style scoped>
 .itemBox{
     width:100%;
     margin-top:10px; 
     background-color:#fff;
 }
 .product-item{
     height:77px;
     width:100%;
     padding:7.5px 10px;
     box-sizing: border-box;
     border-bottom:1px solid #f2f2f2;
 }

 .foot-item{
     height:49px;
     width:100%;
     position: relative;
 }

 .foot-item p{
     margin:0;
     height:100%;
     line-height:49px;
     font-size:16px;
     color:#333;
     float:left;
     margin-left:10px;
 }
 
 .foot-step{
     width:110px;
     float:right;
     margin-right:10px;
     position: absolute;
     top: 50%;
     margin-top: -15px;
     right:0px;
 }

 .item-image{
     width:62px;
     height:62px;
     float:left;
 }

 .item-image img{
     width:100%;
     height:auto;
 }

 .item-text{
     width:250px;
     height:100%;
     float:left;
     margin-left:10px;
 }
.item-text p{
    font-size:14px;
    color:#666;
    text-align: left;
    margin:5px 0;
}

.item-text p:nth-child(2){
    margin-top:15px;
}

.item-text p span{
     font-size:13px;
     color:#666;
 }
 

</style>
