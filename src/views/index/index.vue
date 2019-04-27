<template>
<div class="box">
    <div v-for="(item,index) in data" :key="index">
        <van-card
            v-if="item.images.data.length>0"
            :price="item.price"
            :desc="item.desc"  
            :title="item.name"
            :thumb="item.images.data[0].path"
            class="item-box"
            @click="toDetail(item.id)"
            />
    </div>
 </div>   
 
</template>

<script>
import {Mall} from '@/api/mall/mall'
import {Card} from 'vant'
import Loadding from '@/components/Loadding'
const mall = new Mall();
export default {
 components:{
     [Card.name]:Card,
     Loadding:Loadding
 },
 data(){
   return{
      data:null, 
   }
 },
 methods:{
   loadData(){
       mall.mallList().then(res=>{
          this.data = res.data
       })
   },
   toDetail(id){
       this.$router.push({path:'/detail',query:{id:id}})
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
      background-color:#f2f2f2;
      padding-bottom:10px;
  }
  .item-box{
      margin:10px 0;
  }
  .van-card__content{
      text-align: left;
  }
  .van-card__content>div{
     margin-top:10px;
  }
</style>
