'use strict'

module.exports = {
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
    base: 'http://127.0.0.1:1234/',
    // base: 'http://rap.taobao.org/mockjs/4230/',
    creations: 'api/creations',
    comment: 'api/comments',
    up: 'api/up',
    video: 'api/creations/video',
    audio: 'api/creations/audio',
    signup: 'api/u/signup',
    verify: 'api/u/verify',
    update: 'api/u/update',
    signature: 'api/signature'
  }
}