const baseUrl = 'http://127.0.0.1:1234/'
//const baseUrl = 'http://rap.taobao.org/mockjs/4230/'

export default {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  backup: {
    avatar: 'http://res.cloudinary.com/gougou/image/upload/gougou.png'
  },
  qiniu: {
    video: 'http://video.iblack7.com/',
    thumb: 'http://video.iblack7.com/',
    avatar: 'http://o9spjqu1b.bkt.clouddn.com/',
    upload: 'http://upload.qiniu.com'
  },
  cloudinary: {
    cloud_name: 'gougou',  
    api_key: '852224485571877',  
    base: 'http://res.cloudinary.com/gougou',
    image: 'https://api.cloudinary.com/v1_1/gougou/image/upload',
    video: 'https://api.cloudinary.com/v1_1/gougou/video/upload',
    audio: 'https://api.cloudinary.com/v1_1/gougou/raw/upload',
  },
  api: {
    creations: baseUrl + 'api/creations',
    comment: baseUrl + 'api/comments',
    up: baseUrl + 'api/up',
    video: baseUrl + 'api/creations/video',
    audio: baseUrl + 'api/creations/audio',
    signup: baseUrl + 'api/u/signup',
    verify: baseUrl + 'api/u/verify',
    update: baseUrl + 'api/u/update',
    signature: baseUrl + 'api/signature'
  }
}