<template>
  <div>
    <div class="mian-top">
      <div class="select-left">
        <div class="demo-input-suffix" style="display:flex">
          <label style="display: inline-block;
    width: 60px;
    line-height: 3;">操作者：</label>
          <el-input placeholder="请输入操作者" prefix-icon="el-icon-search" v-model="value"></el-input>
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.boxCode"
              :value="item.boxCode"
            ></el-option>
          </el-select>-->
        </div>
        <div class="demo-input-suffix xd-left">
          日期：
          <el-date-picker v-model="value2" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="createdDate" label="日期"></el-table-column>
        <el-table-column prop="createName" label="操作者"></el-table-column>
        <el-table-column prop="org" label="组织"></el-table-column>
        <el-table-column prop="ip" label="ip"></el-table-column>
        <el-table-column prop="status" label="操作路由"></el-table-column>
        <el-table-column prop="method" label="操作方法"></el-table-column>
        <el-table-column prop="msg" label="操作内容"></el-table-column>
        <!-- <el-table-column prop="data" label="操作时间"></el-table-column> -->
      </el-table>
    </div>
    <div class="pagination">
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-count="pageCount"
          :page-size="pagenum"
          layout="total,prev, pager, next"
          :total="pageCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogtablePage } from "../../../api";
export default {
  data() {
    return {
      tableData: [],
      pageCount: 1,
      pagenum: 10, //每页多少条
      page: 1,
      value:'',
      value2:''
    };
  },
  created: function () {
    this.pageTable();
  },
  methods: {
    pageTable() {
      getLogtablePage({
        start: this.page,
        length: 10,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    handleCurrentChange: function (val) {
      //获取分页
      console.log(val);
      this.page = val;
      this.pageTable();
    },
    onSearch(){
      getLogtablePage({
        start: 1,
        length: 10,
        date:this.value2,
        operName:this.value
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
  },
};
</script>

<style>
.mian-top {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.select-left {
  display: flex;
}
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

.xd-left {
  margin-left: 30px;
}
</style>