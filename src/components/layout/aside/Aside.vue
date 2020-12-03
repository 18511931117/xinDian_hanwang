<template>
  <div :class="{'min-widht':isCollapse,'max-widht':!isCollapse}">
    <div class="aside-top">
      <i class="logo"></i>
      <p><span>汉王酒后台</span>管理系统</p>
    </div>
    <div class="menu">
      <el-menu
        :default-active="$route.path"
        unique-opened
        route
        class="el-menu-vertical-demo"
        background-color="#323C51"
        active-text-color="#fff"
        :collapse="isCollapse"
        text-color="#fff"
      >
        <el-menu-item
          v-for="item in noChildren"
          :key="item.id"
          :index="item.path"
          @click="clickMenu(item)"
        >
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.id" :index="item.id+''">
          <template slot="title">
            <i :class="'el-icon-' +item.icon"></i>
            <span>{{ item.menuName }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="subItem.path"
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex"
              @click="clickMenu(subItem)"
            >{{ subItem.menuName }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      
      </el-menu>

     
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      asideMenu: [
        {
          id: 1-1,
          code: "/1-1",
          name: "index",
          path: "/",
          label: "首页",
          icon: "eleme",
        },
        {
          id: 1,
          code: "/1",
          name: "shopmanagement",
          path: "/shopmanagement",
          label: "供应商管理",
          icon: "eleme",
        },
        {
          id: 2,
          code: "/2",
          name: "box",
          label: "装箱管理",
          icon: "film",
          children: [
            {
              code: "/2/1",
              path: "/packagerecording",
              name: "packagerecording",
              label: "装箱记录",
              icon: "setting",
            },
          ],
        },
        {
          id: 3,
          code: "/3",
          name: "huo",
          label: "收发货管理",
          icon: "coin",
          children: [
            {
              path: "/shiprecirding",
              code: "/3/1",
              name: "shiprecirding",
              label: "发货记录",
              icon: "setting",
            },
            {
              path: "/receiptrecirding",
              code: "/3/2",
              name: "receiptrecirding",
              label: "收获记录",
              icon: "setting",
            },
          ],
        },
        {
          id: 4,
          code: "/4",
          name: "table",
          label: "数据报表",
          icon: "orange",
          children: [
            {
              code: "/4/1",
              path: "/boxdatatable",
              name: "boxdatatable",
              label: "封装数据报表",
              icon: "setting",
            },
            {
              code: "/4/2",
              path: "/shipdatatable",
              name: "shipdatatable",
              label: "发货数据报表",
              icon: "setting",
            },
          ],
        },
        {
          id: 5,
          code: "/5",
          name: "name",
          label: "业务管理",
          icon: "grape",
          children: [
            {
              code: "/5/1",
              path: "/role",
              name: "role",
              label: "角色管理",
              icon: "setting",
            },
            {
              code: "/5/2",
              path: "/user",
              name: "user",
              label: "账号管理",
              icon: "setting",
            },
            {
              code: "/5/3",
              path: "/organization",
              name: "organization",
              label: "组织架构管理",
              icon: "setting",
            },
           
          ],
          
        },
         {
              id: 6,
              code: "/6",
              name: "log",
              label: "日志管理",
              icon: "goblet",
              children: [
                {
                  code: "/6/1",
                  path: "/log",
                  name: "log",
                  label: "预警日志",
                },
                {
                  code: "/6/2",
                  path: "/operatinglog",
                  name: "operatinglog",
                  label: "操作日志",
                },
              ],
            },
      ],
    };
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.isCollapse,
    }),
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    menu(){
     
      return this.$store.state.menu
    }
  },
  methods: {
    clickMenu(item) {
      // 完成路由跳转
      this.$router.push({ path: item.path });
      this.$store.commit("selectMenu", item);
    },
  },
};
</script>

<style>
.aside-top {
  height: 60px;
  width: auto;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.aside-top p{
  color: #fff;
}
.aside-top p span{
  display: inline-block;
  font-size: 16px;
}
.logo{
  display: inline-block;
  width: 34px;
  height: 34px;
  background: url("../../../assets/hanwang.png") no-repeat;
}
.max-widht {
  width: 200px;
}
.min-width {
  width: auto;
}
.min-widht .aside-top p{
  display: none;
}
.el-menu-item-group ul .el-menu-item {
  text-align: center;
}
</style>