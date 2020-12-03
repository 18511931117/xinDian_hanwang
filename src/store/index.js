import Vue from "vue"
import Vuex from "vuex"

import Cookie from "js-cookie"
Vue.use(Vuex)

//localStorage 代替 js-cookie 
export default new Vuex.Store({
    state:{
        isCollapse:false,
        isIcon:true,
        menu:[],//全部菜单
        currentMenu:null,//点击菜单
        token:'',
        username:'',
    },
    mutations:{
        // TOGGLE_BAREFFECT: state =>{
        //     state.isCollapse = !state.isCollapse
        //     state.isIcon = !state.isIcon
        // },

       
        getUsername(state,val){
            state.username = localStorage.setItem('username',val)
        },
        clearUsername(state,val){
            localStorage.removeItem('username');
        },
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)
        },

        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        getToken(state){
            state.toekn = Cookie.get('token')
        },


        isUnfold(state){
            state.isCollapse = !state.isCollapse
            state.isIcon = !state.isIcon
        },
        selectMenu(state,val){
            // if(val.name !== 'home'){
            //     state.currentMenu = val
            // }else{
            //     state.currentMenu = null
            // }index
            val.name === "index"? (state.currentMenu = null):(state.currentMenu = val)
        },
        setMenu(state,val){ //设置菜单
           
            state.menu = val
           
            localStorage.setItem('menu',JSON.stringify(val))
        },
        clearMenu(state,val){
            state.menu = []
            // Cookie.remove('menu')
            localStorage.removeItem('menu');
        },
        addMenu(state,router){ //动态添加
            
            if(!localStorage.getItem('menu')){
                return
            }
            let menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu

            let currentMenu = [
                {
                    path:'/',
                    component:() => import(`@/components/home/Home`),
                    children: []
                }
            ]

            menu.forEach(item =>{
                if(item.children) {
                    item.children = item.children.map(item => {
                     
                        item.component =() => import(`@/components/view/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                }else{
              
                    item.component = () => import(`@/components/view/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            
            router.addRoutes(currentMenu)
           
        }
        
     
    },
    // actions:{
    //     toggleSidebar({ commit }) {
    //         commit('TOGGLE_BAREFFECT')    //触发mutations中的TOGGLE_BAREFFECT
    //     }
    // }
})


