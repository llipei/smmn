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

router.beforeEach((to,from,next)=>{
    //定义一个登录状态
    let isdenglu;
//允许携带cookie
    axios.defaults.withCredentials=true;
    //发送请求去检查用户是否登录
    axios.get('http://127.0.0.1:3000/users/isdenglu')
    .then(response=>{
      isdenglu = response.data.isdenglu;
//如果没有登录
      if(!isdenglu){
          //如果进入的不是登录页面，跳转到登录页面
          if(to.path!=='/'){
              return next({"path": "/"})
          }else{
            //如果去的是登录页面--放行
            next();
          }
      }else{
        next()
      }
    })
})

// 注册ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
