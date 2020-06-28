// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vSelect from 'vue-select'
import weui from 'weui.js'
import 'weui'
Vue.prototype.$weui = weui
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;



Vue.component('v-select', vSelect)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 根据路由设置标题
router.beforeEach((to, from, next) => {
    /*路由发生改变修改页面的title */
    if(to.meta.title) {
        document.title = to.meta.title
    }
    next();
})


