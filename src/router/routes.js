import { LocalStorage, SessionStorage } from 'quasar'
import axios from 'axios';

axios.defaults.baseURL = "http://www.localhost:8082";
const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "user", component: () => import("pages/account.vue") }
    ]
  },
  {
    path: "/search",
    component: () => import("layouts/SearchLayout.vue")
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
    beforeEnter: (to, from, next) => {
      console.log('start validate access token!');
      let access = SessionStorage.get.item('accessToken');
      axios.get('/accessToken',{
        headers: {
          'Authorization': access
        }
      })
      .then(function(res){
        console.log(res);
        next();
      })
      .catch(function(err) {
        console.log(err);
        next('/');
      })
    }
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
