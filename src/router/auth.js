import axios from 'axios';
import { LocalStorage, SessionStorage } from 'quasar'

const BASE_URL = "http://www.localhost:8082";

function validateAccessTkn(accessTkn, next){
  axios.get('/accessToken',{
    headers: {
      'Authorization': accessTkn
    },
    baseURL: BASE_URL
  })
  .then(function(res){
    console.log(res);
    //redirect url login
    next();
  })
  .catch(function(err) {
    console.log(err.response.data.msg);
    SessionStorage.remove('accessToken');
    let refresh = LocalStorage.get.item('refreshToken');
    validateRefreshToken(refresh, next);
  })
}

function validateRefreshToken(refreshTkn, next){
  axios({
    method: 'post',
    url: '/accessToken',
    headers: {
      'Authorization': refreshTkn
    },
    baseURL: BASE_URL
  }).then(function(res){
    //refresh token으로 aceess token 발급 받고 메인으로
    console.log(res);
    if(res.status == 201){
      LocalStorage.set("refreshToken", res.data.refreshToken);
    }
    SessionStorage.set("accessToken", res.data.accessToken);
    next();
  })
  .catch(function(err){
    console.log(err.response.data.msg);
    //refresh token이 무효하다면(서버에서 exception 발생) 스토리지에서 삭제 후 로그인 페이지로
    LocalStorage.remove('refreshToken');
    next('/login');
  })
}

function getAccessToken(){
  return SessionStorage.get.item('accessToken');
}

function getRefreshToken(){
  return LocalStorage.get.item('refreshToken');
}

export {validateAccessTkn, validateRefreshToken, getAccessToken, getRefreshToken}