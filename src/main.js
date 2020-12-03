// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import http from "./http"
import api from "./api"

import router from './router'
import store from "./store/index"
import "./assets/style/global.css"
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import Print from 'vue-print-nb'
// import has from './public/btnPermission.js';
// import Print from "./print/print"
Vue.use(Print)
function hasBtnPermission(permission){
	let getBtnPermissionArr = JSON.parse(localStorage.getItem('btnPermission'));
	// console.log(permission);
	// console.log(getBtnPermissionArr )
	// console.log(getBtnPermissionArr .indexOf(permission) > -1)
	return getBtnPermissionArr.indexOf(permission) > -1;
}
Vue.prototype.hasPerm = hasBtnPermission;

// import './mock/index'

// Vue.prototype.$http = http

import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)


Vue.use(ElementUI)


Vue.config.productionTip = false



// router.beforeEach((to,from,next) =>{
//   store.commit('getToken')
//   let token = store.state.token
//   if(!token && to.name !== 'login'){
//     next({name:'login'})
//   }else{
//     next()
//   }
// })

router.beforeEach((to,from,next) => {
  let username = localStorage.getItem('username')
  if(username != null){
    
    next()
    
  }else{
    if(to.path === '/login'){
      next()
      
    }else{
      next({name:'login'})
    }
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) { 
//     from.name ? next({
//       name: from.name
//     }) : next('/error'); 
//   } else {
//     next(); //如果匹配到正确跳转
//   }
// });



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  mounted(){
    
  },
  components: { App },
  template: '<App/>'
})
