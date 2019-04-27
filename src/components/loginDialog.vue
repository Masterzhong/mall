<template>
  <div>
    <van-dialog
      v-model="show"
      :title="title"
      :confirm-button-text="comfirmMsg"
      show-cancel-button
      @confirm="bindPhone"
      @cancel="cancelLogin"
      class="dialog"
    >
      <div class="inputBox">
        <input type="tel" placeholder="请输入手机号" class="phoneInput" v-model="phone">
      </div>
      <div class="inputBox">
        <input type="number" placeholder="请输入验证码" class="codeInput" v-model="sms">
        <vbutton :phone="phone" @getcode="getcode"/>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog, Toast } from "vant";
import vbutton from "@/components/vbutton";
import { Login } from "@/api/login/login";
Vue.use(Dialog);
const login = new Login();
export default {
  components: {
    vbutton: vbutton
  },
  props: ["message", "type","title","comfirmMsg"],
  data() {
    return {
      show: false,
      phone: null,
      sms: null,
      vcode: null,
    };
  },

  methods: {
    showToast() {
      Dialog.confirm({
        message: this.message,
        confirmButtonText: this.comfirmMsg,
        cancelButtonText: "原价购买"
      })
        .then(() => {
          //调起登录弹层
          this.show = true;
        })
        .catch(() => {
          //原价购买 传入origin
          this.$emit("getPriceType", 1);
          return false;
        });
    },
    getcode(e) {
      this.vcode = e;
    },
       //获取滚动条当前位置
   getScrollTop () {
      var scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      if(scrollTop!=0){
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
      return scrollTop
     
    },
    bindPhone() {
      //手机非空 正则判断
      if (!this.phone) {
        Toast.fail("请填写手机号");
        return false;
      }
      if (!/^1[2|3|4|5|6|7|8|9|0][0-9]\d{4,8}$/.test(this.phone)) {
        Toast.fail("请填写正确的手机号");
        return false;
      }

      if (!this.sms) {
        Toast.fail("请填写验证码");
        return false;
      }
      switch (this.type) {
        case "login":
          login
            .phoneLogin({
              verification_key: this.vcode,
              verification_code: this.sms
            })
            .then(res => {
              Toast("登录成功");
              var expires_in = res.expires_in / 60 / 24;
              this.$store.dispatch("setToken", {
                token: res.access_token,
                exptime: expires_in
              });
              this.$store.commit("SETLASTURL", null);
              this.$emit("getPriceType");
            });
          break;
        case "bind":
          login
            .bindPhone({
              verification_key: this.vcode,
              verification_code: this.sms
            })
            .then(res => {
              Toast("绑定手机号成功");
              this.$emit("getPriceType");
            });
          break;
      }
    },
    cancelLogin() {
      this.show = false;
      this.showToast();
    },
  },
  created() {
    setTimeout(() => {
      this.showToast();
    }, 500);
  },
  mounted(){
   this.$nextTick(function () {
      window.addEventListener('scroll', this.getScrollTop,true)
    })
  }
};
</script>

<style scoped>
.inputBox {
  margin: 20px auto;
  width: 85%;
  height: 30px;
}
.phoneInput,
.codeInput {
  height: 30px;
  border: 1px solid #ccc;
  padding-left: 5px;
}
.phoneInput {
  width: 100%;
}
.codeInput {
  float: left;
  width: 150px;
}
.dialog{
  top:40%;
}
</style>
