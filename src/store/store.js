
import Vue from 'vue'
import Vuex from 'vuex';
import {Login} from '@/api/login/login'
import Cookies from 'js-cookie'
const login = new Login()
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        URL:'http://mall.shark-baby.com',
        LOADING: false,
        BROWSER: null,
        APPID:'wx260924cde63364e6',
        TOKEN:null,
        LASTURL:null,
        STATUS:false,
    },
    mutations: {
        showLoading(state){
            state.LOADING = true
        },
        hideLoading (state) {
            state.LOADING = false
        },
        SETBROWSER(state,browser) {
            state.BROWSER = browser
        },
        SETTOKEN(state,token){
            state.TOKEN = token
        },
        SETLASTURL(state,url){
            state.LASTURL = url
        },
        SET_DISABLE(state){  
           state.STATUS = true
        },
        SET_ABLE(state){
            state.STATUS = false
        }
    },
    actions:{
        //获取浏览器信息
      getBrowser({commit}){
        var browser = navigator.userAgent.toLowerCase();
                if(browser.match(/Alipay/i)=="alipay"){
                    commit('SETBROWSER','alipay')
                }else if(browser.match(/MicroMessenger/i)=="micromessenger"){
                    commit('SETBROWSER','wxpay')
                }else{
                    commit('SETBROWSER','other')
                }
      },
      //手机登录设置token
      setToken({commit},data){
        commit('SETTOKEN',data.token)
        Cookies.set('token',data.token,data.exptime)
      }
    }
})
export default store
