import router from './router/index'
import store from './store/store'
import {Login} from '@/api/login/login'
import Cookies from 'js-cookie'

const login = new Login()
if (!store.state.BROWSER) {
  store.dispatch('getBrowser')//分发浏览器信息
}
const whitePath = ['/login', '/readyPay', '/paySuccess', '/', '/detail', '/ElectronicWarranty']
// Cookies.remove('token')
router.beforeEach((to, from, next) => {

  var token = Cookies.get('token')
  //设置动态title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if ((!token || typeof (token) == "undefined" || token == null) && to.path != '/login') {//如果不是登录页 且没有token
    if (store.state.BROWSER == 'wxpay') {//判断是否为微信浏览器 如果是 则静默登录
      var wxcode = getQueryString('code')//是否拿到code
      if (!wxcode || typeof (wxcode) == "undefined" || wxcode == null) {
        var appid = store.state.APPID
        var path = to.fullPath
        var spa = encodeURIComponent(store.state.URL + path)
        var wx_Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${spa}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
        window.location.href = wx_Url
      } else {
        login.thirdPartyLogins('weixin', {code: wxcode}).then(res => {
          if (res.access_token) {
            var expires_in = res.expires_in / 60 / 24
            Cookies.set('token', res.access_token, expires_in)
            next();
          } else {
            window.location.onload()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      //有白名单 就跳登录
      if (whitePath.indexOf(to.path) > -1) {
        next();
      } else {
        //其他浏览器的处理 直接跳登录页
        if (to.fullPath !== '/login') { //储存上一页
          store.commit('SETLASTURL', to.fullPath)
        }
        next({path: '/login'})
      }

    }
  } else {
    console.log('有TOKEN')
    next();
  }
})

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
} 
