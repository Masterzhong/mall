import request from '../../utils/request' 
class Sales{
    readyPay(id,original=''){
        return request({
            url:`sales/cart_items/wait_pay?temp_id=${id}&original=${original}`,
            method:'get',
        })
    }
    

    wxPay(no){
        return request({
            url:`payment/${no}/wechat`,
            method:'get'
        })
    }

    aliPay(no){
        return request({
            url:`payment/${no}/alipay`,
            method:'get'
        })
    }

    h5Pay(no){
        return request({
            url:`payment/${no}/wechat/h5`,
            method:'get'
        })
    }

    applySale(id){
       return request({
           url:`stores/${id}/apply_sales`,
           method:'get'
       })
    }
    //导购申请提交审核
    toapply(id,data){
        return request({
            url:`stores/${id}/apply_sales`,
            method:'post',
            data
        })
    }

}

export {Sales}
