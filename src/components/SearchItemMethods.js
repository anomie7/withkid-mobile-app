import axios from 'axios';
import { LocalStorage, SessionStorage } from 'quasar'

const AUTH_BASE_URL = "http://www.localhost:8082";
const RESOURCE_BASE_URL = "http://www.localhost:8081";

//eventLog 기록할 때 엑세스 토큰이 무효한 경우 리프레쉬 토큰으로 액세스 토큰 발급받는 로직
function validateRefreshToken(refreshTkn, $router, $item){
    axios({
      method: 'post',
      url: '/accessToken',
      headers: {
        'Authorization': refreshTkn
      },
      baseURL: AUTH_BASE_URL
    }).then(function(res){
      //refresh token으로 aceess token 발급
      console.log(res);
      if(res.status == 201){
        LocalStorage.set("refreshToken", res.data.refreshToken);
      }
      SessionStorage.set("accessToken", res.data.accessToken);
      storeEventLog($item, $router);
    })
    .catch(function(err){
      console.log(err.response.data.msg);
      //refresh token이 무효하다면(서버에서 exception 발생) 스토리지에서 삭제 후 로그인 페이지로
      LocalStorage.remove('refreshToken');
      $router.replace('/login');
    })
  }

  function storeEventLog($item, $router){
    let access = SessionStorage.get.item('accessToken');
     axios({
      method: 'post',
      url: '/eventLog',
      headers: {
        'Authorization': access
      },
      data: {
         ...$item
      },
      baseURL: RESOURCE_BASE_URL
    }).then(function(res){
      console.log(res.data)
    })
    .catch(function(err){
      console.log(err.response.data)
      if(err.response.status == 401){
        let refresh = LocalStorage.get.item('refreshToken')
        console.log('401 error')
        validateRefreshToken(refresh, $router, $item);
      }
    })
  }

  export {validateRefreshToken, storeEventLog};