import Vue from 'vue'
import Router from 'vue-router'
//引入登录组件配置路由
import Denglu from '@/views/Denglu/Denglu.vue';
//跳转过后的首页路由
import Hindex from '@/views/Hindex/Hindex.vue';
//默认后端主页主体页面
import Caidan from '@/views/Caidan/Caidan.vue';

// 账号管理功能模块相关组件
import Zhanghaogl from '@/views/Zhanghaogl/Zhanghaogl.vue';
import Tianjiazh from '@/views/Tianjiazh/Tianjiazh.vue';
import Mimaxg from '@/views/Mimaxg/Mimaxg.vue';

// 商品管理模块相关组件
import Tianjiasp from '@/views/Tianjiasp/Tianjiasp.vue';
import Shangpingl from '@/views/Shangpingl/Shangpingl.vue';

// 销售统计报表
import Xiaoshoutj from '@/views/Xiaoshoutj/Xiaoshoutj.vue';


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'denglu',
      component: Denglu
    },
    {
      path:'/hindex',
      component:Hindex,
      children:[
          {
            name:'caidan',
            path:'',
            component:Caidan
          },
          {
            name:'zhanghaogl',
            path:'/zhanghaogl',
            component:Zhanghaogl
          },
          {
            name:'tianjiazh',
            path:'/tianjiazh',
            component:Tianjiazh
          },
          {
            name:'mimaxg',
            path:'/mimaxg',
            component:Mimaxg
          },
          {
            name:'shangpingl',
            path:'/shangpingl',
            component:Shangpingl
          },
          {
            name:'tianjiasp',
            path:'/tianjiasp',
            component:Tianjiasp
          },
          {
            name:'xiaoshoutj',
            path:'/xiaoshoutj',
            component:Xiaoshoutj
          },
      ]
    }
  ]
})
