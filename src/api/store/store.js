import request from '../../utils/request' 
class Store{
    applyStore(id,type){
       return request({
           url:`stores/${id}/roles/apply/${type}`,
           method:'get'
       })
    }
    /**店长或财务提交注册**/
    toApply(id,type,data){
        return request({
            url:`stores/${id}/roles/apply/${type}`,
            method:'post',
            data
        })
     }
}

export {Store}