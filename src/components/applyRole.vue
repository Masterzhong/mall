<template>
    <div>
       <!--  <nav-title :title="title" ></nav-title> -->
        <div class="content" v-if="Data">
            <div class="store-name" >注册门店：{{store_name}}</div>
            <div class="list" style="height:50px;">
                <span style="line-height: 50px;">用户ID</span>
                <span style="line-height: 50px;">{{Data.user.hash_id}}</span>
            </div>
            <div class="list" style="height:67px;">
                <span style="line-height: 67px;">用户名</span>
                <div>
                   <img :src="Data.user.avatar" alt="" :onerror="errorImage" />
                </div>
                <span style="line-height: 67px;">{{Data.user.name}}</span>
            </div>
            <van-cell-group class="phoneBox">
                <van-field
                    v-model="real_name"
                    clearable
                    label="姓名"
                    placeholder="请输入姓名"
                    :disabled="name_disable"
                />

                <van-field
                    v-model="phone"
                    clearable
                    label="手机号"
                    placeholder="请输入手机号"
                />

                <van-field
                    v-model="sms"
                    clearable
                    label="验证码"
                    placeholder="请输入短信验证码"
                >
                </van-field>
                <vbutton :phone="phone" @getcode="getcode" class="buttonClass"></vbutton> 
          </van-cell-group>
          <van-button class="checkList" @click="comfirmChange">提交审核</van-button>
        </div>
        
    </div>
</template>

<script>
import navTitle from "@/components/navtitle"
import { Field, CellGroup, Button, Dialog, } from 'vant';
import {Sales} from '@/api/sales/sales'
import {Store} from '@/api/store/store'
import vbutton from '@/components/vbutton'
const sales = new Sales();
const store = new Store();
export default {
   components:{
       navTitle:navTitle,
       [Field.name]:Field,
       [CellGroup.name]:CellGroup,
       [Button.name]:Button,
       vbutton:vbutton
   },
   props:['title','type'],
   data(){
       return {
            Data:null,
            real_name:null,
            phone:null,
            name_disable:false,
            sms:null,
            errorImage:'this.src="'+'http://cloud.shark-baby.com/defaultImage/empty.png'+'"',
            vcode:'',
            store_name:'',
            old_store_name:''
       }
   },
   methods:{
       
       comfirmChange(){   
           if(this.old_store_name!=""){
               Dialog.confirm({
                title: `您已经是${this.old_store_name}店导购，是否确认变更为${this.store_name}店导购？`,
                message: `变更归属门店为“${this.store_name}”，提交后原门店的导购权限即时关闭，新门店导购权限需审核通过后才会正式开通。`
                }).then(() => {
                    this.toApply(1)
                }).catch(() => {
                    console.log('cencel')
                });
           }else{
               this.toApply()
           }
       },

      toApply(ischange=null){
           switch(this.type){
              case 'saler':
                var data = {}
                data.change = ischange;
                data.phone = this.phone;
                data.real_name = this.real_name;
                data.verification_key = this.vcode;
                data.verification_code = this.sms;
                sales.toapply(this.$route.query.store_id,data).then(res=>{
                    Dialog.confirm({
                        title: `操作成功`,
                        message:'是否退出？'
                        }).then(() => {
                            location.href="http://m.shark-baby.com/index.php?g=App&m=Shop&a=index"
                        }).catch(() => {
                            console.log('cencel')
                        });
                })
              break;
              case 'store':
                var data = {}
                data.phone = this.phone;
                data.real_name = this.real_name;
                data.verification_key = this.vcode;
                data.verification_code = this.sms;
                store.toApply(this.$route.query.store_id,'manager',data).then(res=>{
                      Dialog.confirm({
                        title: `操作成功`,
                        message:'是否退出？'
                        }).then(() => {
                            location.href="http://m.shark-baby.com/index.php?g=App&m=Shop&a=index"
                        }).catch(() => {
                            console.log('cencel')
                        });
                })
              break;
              case 'finance':
                var data = {}
                data.phone = this.phone;
                data.real_name = this.real_name;
                data.verification_key = this.vcode;
                data.verification_code = this.sms;
                store.toApply(this.$route.query.store_id,'finance',data).then(res=>{
                      Dialog.confirm({
                        title: `操作成功`,
                        message:'是否退出？'
                        }).then(() => {
                            location.href="http://m.shark-baby.com/index.php?g=App&m=Shop&a=index"
                        }).catch(() => {
                            console.log('cencel')
                        });
                })
              break;
          }
      }, 

      async loadData(){
          switch(this.type){
              case 'saler':
              var data = await sales.applySale(this.$route.query.store_id);
              this.Data = data
              this.phone = data.user.phone
              this.store_name = data.data.apply_store_name
              this.old_store_name = data.data.original_store_name
               if(data.user.real_name){
                  this.real_name = data.user.real_name
                  this.name_disable = true
              }else{
                  this.name_disable = false
              }
              console.log(data); 
              break;
              case 'store':
              var data = await store.applyStore(this.$route.query.store_id,'manager');
              this.Data = data
              this.phone = data.user.phone
              this.store_name = data.store.name
               if(data.user.real_name){
                  this.real_name = data.user.real_name
                  this.name_disable = true
              }else{
                  this.name_disable = false
              }
              break;
              case 'finance':
              var data = await store.applyStore(this.$route.query.store_id,'finance');
              this.Data = data
              this.store_name = data.store.name
              this.phone = data.user.phone
               if(data.user.real_name){
                  this.real_name = data.user.real_name
                  this.name_disable = true
              }else{
                  this.name_disable = false
              }
              break;
          }
           
       },
       getcode(code){
           this.vcode = code
       }
   },
   created(){
      this.loadData();
   },
}
</script>
<style>
/**全局样式**/
.phoneBox .van-cell__title{
    text-align:left ;
    padding-left:10px ;
    box-sizing:border-box ;
    position: relative;
          }
.van-dialog__header{
    text-align: center;
    padding: 15px;
  }           
</style>
<style scoped>
  .content{
      width:100%;
      height:100%;
      position: fixed;
      top:0;
      left:0;
      background-color:#f9f9f9;
  }
  .store-name{
      width:375px;
      height:40px;
      line-height: 40px;
      text-align: left;
      padding-left:10px;
      font-size:13px;
      color:#333;
      border-bottom:1px solid #e4e4e4;
  }
  .list{
    width:100%;
    background-color:#fff;
    border-bottom:1px solid #e4e4e4;
    padding-left:10px;
    box-sizing: border-box;
  }
  .list span{
      height:100%;
      text-align: left;
      color:#333;
      font-size:13px;
      display:block;
      float:left;
  }
  .list span:nth-child(1){
      width:85px;
  }
  .list span:nth-child(2){
      width:250px;
  }
  .list>div{
   width:50px;
   height:50px;
   float:left;
   overflow: hidden;
   border-radius: 50px;
   margin-top: 8px;
   margin-right:10px;
  }
  .list>div>img{
      width:100%;
      height:auto;
  }
  .van-cell{
      padding:0px;
      height:50px;
      line-height: 50px;
      border-bottom:1px solid #e4e4e4;
  }
  .checkList{
     width:309px;
     height:40px;
     background-color:#ea5170;
     border-color:#ea5170;
     color:#fff;
     line-height: 40px;
     font-size:13px;
     margin:0 auto;
     margin-top:50px;
   }
   .buttonClass{
      position: absolute;
      bottom:10px;
      right: 10px;
   }

</style>