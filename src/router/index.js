import Vue from 'vue'
import Router from 'vue-router'
import {constantRouterMap} from './router.js'
Vue.use(Router)

export default new Router({
    mode: 'history', // require service support
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
