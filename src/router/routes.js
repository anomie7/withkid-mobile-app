import { LocalStorage, SessionStorage } from 'quasar'
import axios from 'axios';

axios.defaults.baseURL = "http://www.localhost:8082";
function validateAccessTkn(accessTkn, next){
  axios.get('/accessToken',{
    headers: {
      'Authorization': accessTkn
    }
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
    }
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

const requireAuth = (to, from, next) => {
    console.log('start validate access token!');
    let access = SessionStorage.get.item('accessToken');
    let refresh = LocalStorage.get.item('refreshToken');

    if(access == null){
      //refresh token이 없으면 로그인 페이지로 리다이렉트
      refresh == null ? next('/login') : validateRefreshToken(refresh, next);
    }else{
      //access token이 있으면 유효성 검사 후 메인으로
      //access token이 무효하다면 스토리지에서 삭제 후 리프레쉬 토큰으로 액세스 토큰 발급 후 메인으로
      validateAccessTkn(access, next);
    }
    console.log('finished');
  }

const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "user", component: () => import("pages/account.vue") }
    ],
    beforeEnter: requireAuth
  },
  {
    path: "/search",
    component: () => import("layouts/SearchLayout.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
