import request from '../../utils/request'
import Cookies from 'js-cookie';
class Order{
    orderList(id){
        return request({
            url:`sales/cart_items/wait_pay?user_id=${id}`,
            method:'get',
        })
    }
    //门店订单
    storeOrderList(page=1){
        return request({
            url:`orders?type=store&page=${page}`,
            method:'get'
        })
    }
   //订单详情
   storeOrderDetail(id){
      return request({
          url:`orders/${id}?type=store`,
          method:'get'
      })
   }
  //换货原因
  resonList(id){
      return request({
          url:`orders/service_reasons?service_id=${id}`,
          method:'get'
      })
  }
  //提交售后
  applySaleAfter(data){
      return request({
          url:`order_items/apply_refund`,
          method:'post',
          data
      })
  }
  //根据订单items查看当前订单下所有sku
  searchSku(id,filter=1){
      return request({
          url:`order_items/${id}/skus?filter=${filter}`,
          method:'get'
      })
  }
  //申请售后详情
  afterSaleDetail(id){
      return request({
          url:`order_refunds/${id}`,
          method:'get'
      })
  }
  // 用户根据sku_id 查找当前商品下的所有sku 显示他的属性和属性值
    findAttrData(id){
        return request({
            url:`skus/${id}/product`,
            method:'get'
        })
    }
  //付款成功后订单详情
   paySuccess(id){
     var token=Cookies.get('token')
     var headers;
      if(token){
        headers = {'Authorization': `Bearer ${token}`};
      }else{
        headers = {'Authorization': ''};
      }
     return request({
         url:`orders/${id}/paid_show`,
         headers: headers,
         method:'get'
     })
   }
  //查看电子质保单
  electronicWarranty(order_id,user_id){
      return request({
          url:`orders/${order_id}/users/${user_id}/order_receipt`,
          method:'get'
      })
  }
}

export {Order}
