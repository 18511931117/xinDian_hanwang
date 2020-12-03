<template>
  <div class="header-warp">
    <div class="icon" @click="toggleSidebar">
      <i :class="{'el-icon-s-fold':isIcon,'el-icon-s-unfold':!isIcon}"></i>
    </div>
    <div class="centent">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.menuName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-left">
      <div class="user">
        欢迎您:
        <span>{{username}}</span>
      </div>
      <div class="logout" @click="logout">退出</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { apiLoOut } from "../../../api";
export default {
  data() {
    return {
      username:''
    };
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.isCollapse,
      isIcon: (state) => state.isIcon,
      current: (state) => state.currentMenu,
      // username:(state) => state.username
    }),
  },
  created(){
    this.username = localStorage.getItem('username')
  },
  methods: {
    // ...mapActions(["toggleSidebar"]),
    toggleSidebar() {
      this.$store.commit("isUnfold");
    },
    logout() {
      apiLoOut().then((res) => {
        if (res.data.code == 0) {
          this.$router.push("/login");
        }
      });

      // this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$store.commit('clearUsername')
      localStorage.removeItem('roles')
      location.reload()
    },
  },
};
</script>

<style scoped>
.header-warp {
  display: flex;
  justify-content: space-between;
}
.icon {
  font-size: 20px;
  width: 50px;
}
.user-left {
  width: 220px;
  display: flex;
}

.centent {
  flex: 1;
  display: flex;
  align-items: center;
}
.user {
  width: 150px;
  text-align: center;
}
.logout {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.user span {
  color: #000;
  font-size: 16px;
}
</style>