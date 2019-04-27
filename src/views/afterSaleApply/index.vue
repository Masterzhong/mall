<template>
    <div class="box"> 
        <productItem :data="data" :num="data.apply_amount" @changeValue="changeValue"/>
        <div class="selectBox">
            <van-cell-group>
                <van-cell title="仅退款"  label="未发货(包含已发货但未查到快递信息）" value=" " is-link v-if="type==1" @click="toapply(1)" />
                <van-cell title="退货退款" label="已收到货，需要退回已收到的商品" value=" " is-link @click="toapply(2)" />
                <van-cell title="换货" label="已收到货，需要更换已收到的商品" value=" " is-link @click="toapply(3)" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
import productItem from '@/components/productItem'

import { Cell, CellGroup } from 'vant'
export default {
 components:{
     productItem:productItem,
     [Cell.name]:Cell,
     [CellGroup.name]:CellGroup,
 },
 data(){
     return {
         data:null,
         type:null,//订单类型 1 商城 2 门店 
     }
 },
 methods:{
   changeValue(e){
       this.data.apply_amount = e 
       this.$set(this.data,"apply_amount",e)
   },
   toapply(type){
       this.$router.push({path:'afterSaleToApply',query:{item:JSON.stringify(this.data),type:type,target:this.type,detail_id:this.$route.query.detail_id}})
   }
 },
 created(){
     console.log()
     
     this.data = JSON.parse(this.$route.query.item)
     this.data.apply_amount = this.data.amount
     this.type = this.$route.query.type
 }
}
</script>
<style scoped>
.selectBox .van-cell__title, .van-cell__value{
    text-align: left;
    width:250px;
}

.selectBox{
   margin-top: 10px;
}

.selectBox .van-cell__label{
    width: 220px;
}
.selectBox .van-cell__right-icon{
    margin-top:10px;
}
</style>
<style scoped>
 .box{
    width:100%;
    height:100vh;
    background-color:#f9f9f9;
 }

</style>
