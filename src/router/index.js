import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/home/Home'
import Login from "@/components/view/login/login"
// import index from "@/components/view/index/index"
// import shopmanagement from "@/components/view/shopmanagement/shopmanagement" 
// import packagerecording from "@/components/view/packagemanagement/packagerecording"
// import shiprecirding from "@/components/view/shipmanagement/shiprecirding" //发货记录
// import receiptrecirding from "@/components/view/shipmanagement/Receiptrecirding" //收货记录
// import boxdatatable from "@/components/view/datatable/boxdatatable" //封箱数据报表
// import shipdatatable from "@/components/view/datatable/shipdatatable" //发货数据报表
// import role from "@/components/view/businessmanagement/role" //角色管理
// import user from "@/components/view/businessmanagement/user" //用户管理
// import organization from "@/components/view/businessmanagement/organization" //用户管理
// import log from "@/components/view/log/log"
// import operatinglog from "@/components/view/log/operatinglog"
// import error from "@/components/view/error/error"
import btn from "@/components/view/shopmanagement/btn"

Vue.use(Router)


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
  // mode:'hash',
  routes: [
    {
      path:'/login',
      name:"login",
      component:Login
    },
    // {
    //   path:'/btn',
    //   name:"btn",
    //   component:btn
    // },
    // {
    //   path:'*',
    //   name:"error",
    //   component:error,
    // },
    // {
    //   path: "/",
    //   name: "Home",
    //   component: Home,
    //   children:[
    //     {
    //       path:'/',
    //       name:"index",
    //       component:index
    //     },
    //     {
    //       path:'/shopmanagement',
    //       name:'shopmanagement',
    //       component:shopmanagement
    //     },
    //     {
    //       path:'/packagerecording',
    //       name:'packagerecording',
    //       component:packagerecording,
    //     },
    //     {
    //       path:'/shiprecirding',
    //       name:'shiprecirding',
    //       component:shiprecirding,
    //     },
    //     {
    //       path:'/receiptrecirding',
    //       name:'receiptrecirding',
    //       component:receiptrecirding,
    //     },
    //     {
    //       path:'/boxdatatable',
    //       name:'boxdatatable',
    //       component:boxdatatable,
    //     },
    //     {
    //       path:'/shipdatatable',
    //       name:'shipdatatable',
    //       component:shipdatatable,
    //     },
    //     {
    //       path:'/role',
    //       name:'role',
    //       component:role,
    //     },
    //     {
    //       path:'/user',
    //       name:'user',
    //       component:user,
    //     },
    //     {
    //       path:'/organization',
    //       name:'organization',
    //       component:organization,
    //     },
    //     {
    //       path:'/log',
    //       name:'log',
    //       component:log,
    //     },
    //     {
    //       path:'/operatinglog',
    //       name:'operatinglog',
    //       component:operatinglog,
    //     },
    //   ]
    // }
        
  ]
})
