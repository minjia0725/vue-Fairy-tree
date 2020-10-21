// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import App from './App';
import router from './router';
import './bus';
import dateFilter from "./components/filters/date"
import currencyFilter from "./components/filters/currency"
// import jquery from 'jquery';


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading',Loading)
Vue.filter('currency',currencyFilter)
Vue.filter('date',dateFilter)

axios.defaults.withCredentials = true;
// window.$ = jquery;
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
router.beforeEach((to, from, next) => {
  ///to 即將進入的路由，from 要離開的路由，
  // console.log('to', to, 'form', from, 'next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}api/user/check`;
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {
        next()
      }else {
        next({
          path:'/',
        })
      }
    });
  } else {
    next()
  }
})