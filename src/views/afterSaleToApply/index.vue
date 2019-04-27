<template>
    <div class="box">
      <div v-for="(item,index) in data" :key="index">
       <productItem :data="item" :showStep="false" :num="item.amount" text="申请数量"/>
      </div>
      <van-cell title="添加更多商品" is-link v-if="type!=3&&is_sku"  @click="toselect()"/>
      <!--退货-->
      <div v-if="type!=3" class="form-item">
        <van-cell-group>
            <van-cell title="货物状态" value=" "  />
            <van-cell title="退款原因" :value="resonSelect.name" is-link @click="openreson()" />
            <van-field v-model="refund_price" clearable  label="退款金额" placeholder="请输入退款金额"/>
            <van-field v-model="reson" clearable  label="退款说明" placeholder="选填"/>
        </van-cell-group>
      </div>
     <!--换货-->
      <div v-else  class="form-item">
         <van-cell-group>
            <van-cell title="换货原因" :value="resonSelect.name" is-link @click="openreson()"/>
            <van-cell title="换货商品" value="请选择" is-link v-if="type==1" @click="openattr(data[0].product_sku_id)" />
            <van-field v-model="reson" clearable  label="换货说明" placeholder="选填"/>
        </van-cell-group>
      </div>
      <!--上传凭证-->
      <div class="uploadBox">
          <van-panel title="上传图片">
            <div class="uploadContent">
                    <div class="upload-item">
                      <van-uploader :after-read="onRead">
                           <van-icon name="plus" size="20px" color="#ea5170" />
                       </van-uploader>
                    </div>
                    <div class="upload-image" v-for="(item,index) in imagesData" :key="index">
                        <img :src="item.path" alt="">
                    </div>
            </div>
        </van-panel>
        <p v-if="type==3">仅限更换同款相同价格商品（秒杀商品不支持更换）</p>
        <van-button size="large"  class="customClass" @click="toApply()">提交申请</van-button>
      </div>
      <!--选择售后原因弹窗-->
      <van-actionsheet
            v-model="resonWindow"
            :actions="actions"
            @select="onSelect"
            />
       <!--选择换货商品弹窗-->     
      <van-actionsheet v-model="exchangeWindow" title="换货商品">
          <div class="attrSelectBox">
              <div class="attrSelect"></div>
          </div>
      </van-actionsheet>           
    </div>
</template>

<script>
import productItem from '@/components/productItem'
import { Cell, CellGroup, Field, Panel, Icon, Uploader, Toast, Actionsheet, Button } from 'vant';
import { uploadfile } from '@/api/upload/upload'
import { Order } from '@/api/order/order'
const order = new Order();
export default {
   components:{
     productItem:productItem,
     [Cell.name]:Cell,
     [CellGroup.name]:CellGroup,
     [Field.name]:Field,
     [Panel.name]:Panel,
     [Icon.name]:Icon,
     [Uploader.name]:Uploader,
     [Actionsheet.name]:Actionsheet,
     [Button.name]:Button,
   },
   data(){
       return {
           data:[],
           type:null,//销售对象
           reson:null,
           target:null,//售后类型
           imagesData:[],
           resonWindow:false,
           resonSelect:{name:'请选择',id:''},
           refund_price:0,
           actions:[],
           is_sku:false,
           exchangeWindow:false,
           attrdata:[],
       }
   },
   created(){
       this.loadData(); 
   },
   methods:{
        loadData(){
           
            if(JSON.parse(this.$route.query.item) instanceof Array){
                console.log(1)
                this.data = JSON.parse(this.$route.query.item)
                }else{
                    this.data.push(JSON.parse(this.$route.query.item))
                }
                this.data.forEach(val=>{
                if(val.apply_amount){
                        val.amount = val.apply_amount
                        }
                        this.refund_price += Number(val.price)
                })
                this.type = this.$route.query.type
                this.target = this.$route.query.target
                order.searchSku(this.data[0].id).then(res=>{
                if(res.data.length>0){
                    this.is_sku = true
                }else{
                    this.is_sku = false
                }
                })
        },
        onRead(item) {
         if(this.imagesData.length > 2){
              console.log(1)
              Toast.fail('上传图片超过限制');
              return false;
           }
          var formdata = new FormData()
          formdata.append('image',item.file)
          formdata.append('directory','resonImage')
          var size = item.file.size
          var type = item.file.type
          var typearr = ['image/jpeg','image/png','image/gif']
         //文件大小不超过2.5M
          if(size>2621440){
            Toast.fail('上传文件大小最大不能超过2.5M');
            return false;
          }
          
        //判断文件类型
         if(typearr.indexOf(type)==-1){
           Toast.fail('上传图片的格式不对，请检查');
           return false
         }   
          //上传图片 
         uploadfile(formdata).then(res=>{
          Toast.success('上传成功');
          this.imagesData.push(res)
        }).catch(err=>{
          console.log(err)
        })  
        },
        openreson(){
            //退款原因ID
            order.resonList(this.type).then(res=>{
                this.actions = res.data
                this.resonWindow = true
            })
        },
        onSelect(e){
            this.resonSelect = e;
            this.resonWindow = false;
        },
        //提交申请
        toApply(){
            const data = {
                   service_id:this.type,
                   order_items:this.data.map(val=>{return {id:val.id,amount:val.amount}}),
                   reason_id:this.resonSelect.id,
                   refund_price:this.refund_price,
                   image:this.imagesData.map(val=>val.id),
                   remark:this.reson,
                } 
                order.applySaleAfter(data).then(res=>{
                    
                    Toast.success('申请成功');
                    //跳转到售后详情
                    this.$router.push({path:'/orderDetail',query:{id:this.$route.query.detail_id}})
                })
        },
        //选择商品
        toselect(){
            this.$router.push({path:'/selectGoods',query:{id:this.data[0].id,item:JSON.stringify(this.data[0]),type:this.type,target:this.target}})
        },
        //打开选择属性弹窗
        openattr(id){
            this.exchangeWindow=true
            order.findAttrData(id).then(res=>{
                console.log(res)
            })
        }
   }
}
</script>

<style scoped>
 .box{
    width:100%;
    height:100vh;
    background-color:#f9f9f9;
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
 }
 .form-item{
     margin:10px 0;
 }
 .uploadBox{
     width:100%;
     height:157px;
     background-color:#fff;
 }
 .uploadContent{
     height:100px;
     padding:8px;
     box-sizing: border-box;
 }
 .upload-item{
     float:left;
     width:80px;
     height:80px;
     border:1px dashed #ea5170;
     display:flex;
     align-items:center;
     justify-content: center;
 }
 .upload-image{
     float:left;
     width:80px;
     height:80px;
     margin-left:10px;
 }
 .upload-image img{
     width:100%;
     height:auto;
 }
 .uploadBox p{
     width:100%;
     text-align: left;
     color:#999;
     font-size:12px;
     padding-left:10px;
 }
.customClass{ border-color:#ea5170;color:#fff;background-color:#ea5170;height:40px;line-height:40px;margin-top:40px;}
.attrSelectBox{
    width:100%;
    min-height:160px;
}
.attrSelect{
    width:100%;
    min-height:130px;
}
</style>
