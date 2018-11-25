import Vue from 'vue';
//引入vue样式和js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//引入axios
import axios from 'axios';
//挂在vue原型上
Vue.prototype.axios = axios;
// base.css
import '@/common/css/base.css';

import App from './App.vue';
import router from './router';

// 注册ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
