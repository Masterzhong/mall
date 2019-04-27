import request from '../../utils/request' 
class Mall{
    mallList(){
        return request({
            url:`skus`,
            method:'get',
        })
    }
    mallDetail(id){
        return request({
            url:`skus/${id}`,
            method:'get'
        })
    }

}

export {Mall}