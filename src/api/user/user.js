import request from '../../utils/request' 
class User{
    userinfo(){
        return request({
            url:`users/me`,
            method:'get',
        })
    }

}

export {User}