import request from '../../utils/request' 
//上传图片和视频
export function uploadfile(data){
    return request({
      url:'/images',
      headers: {'Content-Type': 'multipart/form-data'},
      method:'post',
      data
    })
  }