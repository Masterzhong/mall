 const constantRouterMap =[
      {
        path: '/',
        component: ()=> import('../views/index/index'),
        name:'login',//顶部导航 必填
        meta:{
          title:'首页'
          }
      },
      {
        path: '/detail',
        component: ()=> import('../views/detail/index'),
        name:'detail',//顶部导航 必填
        meta:{
          title:'详情'
          }
      },
      {
        path: '/login',
        component: ()=> import('../views/login/index'),
        name:'login',//顶部导航 必填
        meta:{
          title:'登录'
          }
      },
      {
        path: '/follow',
        component: ()=> import('../views/follow/index'),
        name:'follow',//顶部导航 必填
        meta:{
          title:'关注'
          }
      },
      {
        path: '/readyPay',
        component: ()=> import('../views/readyPay/index'),
        name:'readyPay',//顶部导航 必填 
        meta:{
          title:'支付'
          }
      },
      {
        path: '/paySuccess',
        component: ()=> import('../views/paySuccess/index'),
        name:'paySuccess',//顶部导航 必填 
        meta:{
          title:'支付成功'
          }
      },
      {
        path: '/salesApply',
        component: ()=> import('../views/salesApply/index'),
        name:'salesApply',//顶部导航 必填 
        meta:{
          title:'申请导购'
          }
      },
      {
        path: '/storeApply',
        component: ()=> import('../views/storeApply/index'),
        name:'storeApply',//顶部导航 必填 
        meta:{
          title:'店长申请'
          }
      },
      {
        path: '/financeApply',
        component: ()=> import('../views/financeApply/index'),
        name:'financeApply',//顶部导航 必填 
        meta:{
          title:'财务申请'
          }
      },
      {
        path:'/ElectronicWarranty',
        component: ()=> import('../views/ElectronicWarranty/index'),
        name:'ElectronicWarranty',//顶部导航 必填
        meta:{
          title:'质保单'
          }
      },
      {
        path:'/orderList',
        component: ()=> import('../views/orderList/index'),
        name:'orderList',//顶部导航 必填
        meta:{
          title:'订单列表'
          }
      },
      {
        path:'/orderDetail',
        component: ()=> import('../views/orderDetail/index'),
        name:'orderDetail',//顶部导航 必填
        meta:{
          title:'订单详情'
          }
      },
      {
        path:'/afterSaleApply',
        component: ()=> import('../views/afterSaleApply/index'),
        name:'afterSaleApply',//顶部导航 必填
        meta:{
          title:'申请售后'
          }
      },
      {
        path:'/afterSaleToApply',
        component: ()=> import('../views/afterSaleToApply/index'),
        name:'afterSaleToApply',//顶部导航 必填
        meta:{
          title:'申请售后'
          }
      },
      {
        path:'/selectGoods',
        component: ()=> import('../views/selectGoods/index'),
        name:'selectGoods',//顶部导航 必填
        meta:{
          title:'选择商品'
          }
      },
      {
        path:'/afterSaleDetail',
        component: ()=> import('../views/afterSaleDetail/index'),
        name:'afterSaleDetail',//顶部导航 必填
        meta:{
          title:'售后详情'
          }
      }
]

export {constantRouterMap}