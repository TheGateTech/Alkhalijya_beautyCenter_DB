/*/////////////////////////////////////////////////////////////////////////////////////////////=====
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
/////////////////////////////////////////////////////////////////////////////////////////////======*/


import Vue from 'vue'
import Router from 'vue-router'
// import auth from "@/auth/authService";

// import firebase from 'firebase/app'
// import 'firebase/auth'
import axios from "@/axios.js"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: 
  [
    {
      /////////////////////////////////////////////////////////////////
      //                    MAIN LAYOUT ROUTERS                      //
      /////////////////////////////////////////////////////////////////
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        /////////////////////////////////////////////////////////////////
        //                        THEME ROUTERS                        //
        /////////////////////////////////////////////////////////////////
        {
          path: '/',
          redirect: '/dashboard/analytics'
        },
        {
          path: '/dashboard/ecommerce',
          name: 'dashboard-ecommerce',
          component: () => import('./views/DashboardECommerce.vue'),
          meta: {
            rule: 'admin',
            authRequired: true
          }
        },
        {
          path: '/dashboard/analytics',
          name: 'dashboard-analytics',
          component: () => import('./views/DashboardAnalytics.vue'),
          meta: {
            rule: 'admin',
            authRequired: true
          }
        },
        /////////////////////////////////////////////////////////////////
        //                    APPLICATION ROUTERS                      //

       
        /////////////////////////////////Categorys Routes/////////////////////////////////////

          {
            path: '/admin/categories',
            name: 'app-category-list',
            component: () => import('@/views/apps/category/category-list/CategoryList.vue'),
            meta: {
              breadcrumb: [
                { title: 'Home', url: '/' },
                { title: 'List', active: true },
              ],
              pageTitle: "التصنيفــات",
              rule: 'admin',
              authRequired: true
            },
          },
          {
            path: '/admin/categories/create',
            name: 'app-category-create',
            component: () => import('@/views/apps/category/category-create/CategoryCreate.vue'),
            meta: {
              breadcrumb: [
                { title: 'Home', url: '/admin/categories' },
                { title: 'التصنيفــات' , url: '/admin/categories'},
                // { title: 'List', active: true },
              ],
              pageTitle: 'إضافة تصنيف ',
              rule: 'editor',
              authRequired: true

            },
          },
          {
            path: '/admin/categories/:categoryId',
            name: 'app-category-view',
            component: () => import('@/views/apps/category/CategoryView.vue'),
            meta: {
              breadcrumb: [
                { title: 'Home', url: '/' },
                { title: 'التصنيفــات' },
                { title: 'View', active: true },
              ],
              pageTitle: 'Category View',
              rule: 'editor',
              authRequired: true
            },
          },
          {
            path: '/admin/categories/:categoryId/edit',
            name: 'app-category-edit',
            component: () => import('@/views/apps/category/category-edit/CategoryEdit.vue'),
            meta: {
              breadcrumb: [
                { title: 'Home', url: '/' },
                { title: 'التصنيفــات' },
                { title: 'تعديل تصنيف', active: true },
              ],
              pageTitle: 'Category Edit',
              rule: 'editor',
              authRequired: true
            },
          },
        ///////////////////////////Services Routes //////////////////////////////
      
        /////////////////////////////Services Routes //////////////////////////////
        {
          path: '/admin/services',
          name: 'app-service-list',
          component: () => import('@/views/apps/service/service-list/ServiceList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Service' },
              { title: 'List', active: true },
            ],
            pageTitle: 'Service List',
            rule: 'editor',
            authRequired: true
          },
        },
        {
          path: '/admin/services/create',
          name: 'app-service-create',
          component: () => import('@/views/apps/service/service-create/ServiceCreate.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Service' },
              { title: 'List', active: true },
            ],
            pageTitle: 'Service Create',
            rule: 'editor',
            authRequired: true

          },
        },
        {
          path: '/admin/services/:serviceId',
          name: 'app-service-view',
          component: () => import('@/views/apps/service/ServiceView.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Service' },
              { title: 'View', active: true },
            ],
            pageTitle: 'Service View',
            rule: 'editor',
            authRequired: true
          },
        },
        {
          path: '/admin/services/:serviceId/edit',
          name: 'app-service-edit',
          component: () => import('@/views/apps/service/service-edit/ServiceEdit.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Service' },
              { title: 'Edit', active: true },
            ],
            pageTitle: 'Service Edit',
            rule: 'editor',
            authRequired: true
          },
        },
        /////////////////////////////////////////////////////////////////
        {
          path: '/admin/profile',
          name: 'page-profile',
          component: () => import('@/views/pages/Profile.vue'),
          meta: {
              breadcrumb: [
                  { title: 'Home', url: '/' },
                  { title: 'Pages' },
                  { title: 'Profile', active: true },
              ],
              pageTitle: 'Profile',
              rule: 'editor',
              authRequired: true
          },
      }
        
      ],
    },


    // ///////////////////////////////////////////////////////////////////////////
    
    // ///////////////////////////////////////////////////////////////////////////
    // FULL PAGE LAYOUTS
    // ///////////////////////////////////////////////////////////////////////////
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: 
      [
        // ///////////////////////////////////////////////////////////////////////////
        // PAGES
        // ///////////////////////////////////////////////////////////////////////////
        {
          path: '/callback',
          name: 'auth-callback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'admin'
          }
        },
      {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta: {
            rule: 'admin',
            authRequired: false
          }
        },
        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'admin'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'page-coming-soon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'admin',
            authRequired: false
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'admin',
            authRequired: false
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'admin',
            authRequired: false
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'editor',
            authRequired: false
          }
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'admin'
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})
////////////////////
// router.beforeEach((to, from, next) => {
//   if(to.meta.authRequired){

//       if(localStorage.getItem('token')){
//         // if(to.meta.rule =='admin' && localStorage.getItem('userInfo').userRole == 'editor')
//         // {
//         //   next("/pages/not-authorized")
//         // }

//         if(to.path != '/pages/login'){
//           next()
//         }
//         else{
//           next('/dashboard/analytics')
//         }
//       }
//       else {
//         next("/pages/not-authorized")
//       }
//   }
//   else {
//       if(localStorage.getItem('token')){
//         next('/dashboard/analytics')
//       }
//       else{
//         next()
//       }
//   }
// });

/////////////////
 
/////////////////// authenticated login turky new
router.beforeEach((to, from, next) => {

  if(to.meta.authRequired){
    if(to.path != '/pages/login'){
      if(!localStorage.getItem('token')){
        next('/pages/login')
      }
      else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

        axios.get(`api/profile`)
            .then((response) => {
              if(response.data.data.type == 'customer'){
                localStorage.getItem('token')
                next()
              }
              else{
                next('/pages/not-authorized')
              }
            })
            .catch((error) => {
              if(error.response.status == 401){
                localStorage.getItem('token')
                next('/pages/login')
              }
            })
      }
    }
  }
  else {
    if(!localStorage.getItem('token')){
      next()
    }
    else{
      next(from)
    }
  }
});
///////////////////////////////////////////////////////////////////

// router.beforeEach((to, from, next) => {
//     firebase.auth().onAuthStateChanged(() => {

//         // get firebase current user
//         const firebaseCurrentUser = firebase.auth().currentUser

//         // if (
//         //     to.path === "/pages/login" ||
//         //     to.path === "/pages/forgot-password" ||
//         //     to.path === "/pages/error-404" ||
//         //     to.path === "/pages/error-500" ||
//         //     to.path === "/pages/register" ||
//         //     to.path === "/callback" ||
//         //     to.path === "/pages/comingsoon" ||
//         //     (auth.isAuthenticated() || firebaseCurrentUser)
//         // ) {
//         //     return next();
//         // }

//         // If auth required, check login. If login fails redirect to login page
//         if(to.meta.authRequired) {
//           if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
//             router.push({ path: '/pages/login', query: { to: to.path } })
//           }
//         }

//         return next()
//         // Specify the current path as the customState parameter, meaning it
//         // will be returned to the application after auth
//         // auth.login({ target: to.path });

//     });

// });

export default router
