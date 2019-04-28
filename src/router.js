import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '',
          redirect: 'home',
          meta: {
            auth: true,
          }
        },
        {
          path: 'home',
          name: 'home',
          meta: {
            auth: true,
          },
          component: () => import('./views/Home.vue')
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: 'dynamic',
          name: 'dynamic',
          component: () => import('./views/Dynamic.vue')
        },
        {
          path: 'message',
          name: 'message',
          meta: {            
            auth: true,  // 添加该字段，表示进入这个路由是需要登录的        
          },
          component: () => import('./views/Message.vue')
        },
        {
          path: 'personal',
          name: 'personal',
          meta: {            
            auth: true,  // 添加该字段，表示进入这个路由是需要登录的        
          },
          component: () => import('./views/Personal.vue')
        }
      ]
    },
    
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/resetpwd',
      name: 'resetpwd',
      component: () => import('./views/Resetpwd.vue')
    }
    
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(to.path == '/login') {
      next()
    } else {
      //是否在登录状态下
      //console.log(window.sessionStorage.getItem('isLogin'))
      if(window.sessionStorage.getItem('isLogin'))
        next()
      else
        next('/login')
    }
  } else {
    next()
  }
  
  
})


export default router