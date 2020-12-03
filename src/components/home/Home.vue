<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto" >
          <al-aside></al-aside>
      </el-aside>
      <el-container>
        <el-header>
            <al-header></al-header>
        </el-header>
        <el-main>
          <router-view></router-view>
            <!-- <al-mian></al-mian> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import aside from "@/components/layout/aside/aside"
import header from "@/components/layout/header/header"
// import mian from "@/components/layout/mian/mian"
export default {
    data(){
        return {

        }
    },
    components:{
        "al-aside":aside,
        "al-header":header,
        // "al-mian":mian
    }
};
</script>

<style scoped>
.layout{
    width: 100%;
    height: 100%;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #323C51;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>