import {
  validateAccessTkn,
  validateRefreshToken,
  getAccessToken,
  getRefreshToken
} from "./auth.js";
import AccessToken from "./../pages/AccessToken.vue";

const requireAuth = (to, from, next) => {
  console.log("start validate access token!");
  let access = getAccessToken();
  let refresh = getRefreshToken();

  if (access == null) {
    //refresh token이 없으면 로그인 페이지로 리다이렉트
    refresh == null ? next("/login") : validateRefreshToken(refresh, next);
  } else {
    //access token이 있으면 유효성 검사 후 메인으로
    //access token이 무효하다면 스토리지에서 삭제 후 리프레쉬 토큰으로 액세스 토큰 발급 후 메인으로
    validateAccessTkn(access, next);
  }
  console.log("finished");
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/MainPage.vue") },
      { path: "user", component: () => import("pages/AccountPage.vue") }
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
    component: () => import("layouts/OverflowHiddenLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }]
  },
  {
    path: "/join",
    component: () => import("layouts/OverflowHiddenLayout.vue"),
    children: [{ path: "", component: () => import("pages/JoinPage.vue") }]
  },
  {
    path: "/accessToken",
    component: AccessToken,
    props: route => ({ query: route.query.code })
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
