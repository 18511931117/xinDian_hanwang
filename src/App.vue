<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
.el-container{
  height: 100%;
}

.el-pagination{
  padding: 0;
}
.el-table__header tr th{
  color: #000;
  font-weight: 600;
}
.el-button--primary{
  background: #E85F49!important;
  border-color:#E85F49!important;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #EC7865!important;
    border-color: #EC7865!important;
    color: #FFF;
}
.el-button--text span{
  color: #EC7865!important;
}

 .el-menu-item.is-active {
  background: #EC7865 !important;
}
 .el-submenu__title.is-active {
  background: #EC7865 !important;
}

.el-submenu__title:hover{
  background-color: #E85F49 !important;
}
.el-menu-item:hover{
  background-color:#E85F49!important;
}

/* 分页样式 */
.pagination {
  text-align: right;
  margin-top: 30px;
}
.search {
  margin-left: 15px;
}

.demo-table-expand {
  font-size: 0;
}


/* button 按钮 */
.z_top{
  margin-top: 2px!important;
}
.f_top{
  margin-top: -2px!important;
}
.el-tree-node__content{
  height: 40px!important;
}
/* 时间控件 */
.el-time-panel{
  margin-left: -20px!important;
}


/* 三级联动 */
.el-form-item__content{
  display: flex;
}

/* 单选按钮 */
.el-radio-group{
  margin-top: 14px;
}
@media print{
  #printStyle{
    /* display: flex;
    justify-content: space-between; */
    /* float: left; */
  }

  .parint-warp{
    display: block;
  }
  .no-print{
    display: none;
  }
  #printTest .item{
    /* display: flex;
    justify-content: center;
    align-items: center; */
    width: 30%;
    margin-left: 12.1px;
    margin-top: 4px;
  }
  /* #printTest .item:nth-child(odd){
    margin-left: 10px;
  } */
    /* #printTest .item:nth-child(even){
    margin-left: 15px;
  } */
  .item .name{
  width: 50px;
    float: left;
    margin-left: 2px;
}
}
</style>
