<template>
  <div class="login-container">
    <div class="login-warp">
      <div class="login-img login">
        <div class="icon-title"></div>
      </div>
      <div class="login-mian login">
        <div class="input-warp">
          <el-form ref="form" :model="form" class="login-form">
            <h2 class="login-title">管理系统</h2>
            <el-form-item label="">
              <el-input prefix-icon="el-icon-user" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input prefix-icon="el-icon-lock" v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item class="el-top">
              <el-button type="primary" class="btn" @click="onSubmit">{{logintitle}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">管理系统</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{logintitle}}</el-button>
      </el-form-item>
    </el-form>-->
  </div>
</template>
  <script>
import { apiLogin } from "../../../api";

export default {
  data() {
    return {
      form: {
        username: "abc",
        password: "123456",
      },
      logintitle: "登录",
    };
  },

  methods: {
    onSubmit() {
      var that = this;
      this.logintitle = "登录中。。。"
      apiLogin({
        loginName: that.form.username,
        password: that.form.password,
      }).then((res) => {
        
        if (res.data.code == "0") {
          
            res = res.data
            that.$store.commit("clearMenu");
            let btnPermissionArr = res.data.btns;
            
            console.log(btnPermissionArr)
            localStorage.setItem('roles',res.data.roleCode)
            that.$store.commit("setMenu", res.data.menus);
            that.$store.commit("getUsername", that.form.username);
            //localStorage.setItem("username", that.form.username)
            // this.$store.commit("setToken", res.data.token);
            that.$store.commit("addMenu", that.$router);
            
            
            localStorage.setItem("btnPermission",JSON.stringify(btnPermissionArr));
            that.$router.push({ name: 'index' });
          }else {
          if(this.form.username == "" || this.form.password == ""){
            that.$message.error("请输入用户名和密码");
          }else{
              that.$message.error("用户名和密码错误");
          }
          this.logintitle = "登录"
        }
      });
    
      // this.$http.post('api/permission/getMenu',this.form).then(res =>{
      //   console.log(res)
      //   res = res.data
      //   if(res.code === 20000){
      //     this.$store.commit('clearMenu')
      //     this.$store.commit('setMenu',res.data.menus)
      //     this.$store.commit('setToken',res.data.token)
      //     this.$store.commit('addMenu',this.$router)
      //     this.$router.push({ name: 'index' })
      //   }else{
      //     this.$message.warning('错误')
      //   }
      // })
    },
  },
};
</script>

<style acoped>
/* .login-form {
  width: 350px;
  margin: 160px auto; 
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px; 
} */

/* 背景 */
.login-container {
  width: 100%;
  height: 100%;
  background: #e6e6e6;
  position: relative;
  /* position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../../assets/tu.png") no-repeat; */
}
.login-warp {
  width: 780px;
  height: 390px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -185px;
  margin-left: -390px;
  /* background: red; */
  display: flex;
}
.login {
  flex: 1;
 
}
.login-img {
  /* background: yellow; */
  background: url("../../../assets/tu.png") no-repeat;
}
.icon-title{
  width: 290px;
  height: 60px;
  background: url("../../../assets/t.png");
  margin: 20px auto 0;
}
.login-mian{
  background: #fff;
   display: flex;
  align-items: center;
  justify-content: center;
}
.input-warp {
  width: 300px;
  height: 300px;
  /* background: blue; */
}
.btn{
  width: 300px;
}
/* 标题 */
.login-title {
  color: #303133;
  font-size: 28px;
  font-weight: 400;
  position: relative;
  margin-bottom: 15px;
}
.login-title::before{
  content: ''; 
  position: absolute;
  top: 40px;
  width: 60px;
  height: 4px;
  background: chocolate;

}
.el-top{
  margin-top: 60px;
}
</style> -->