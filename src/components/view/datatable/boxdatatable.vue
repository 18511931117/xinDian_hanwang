<template>
  <div>
    <div class="mian-top">
      <div class="select-left">
        <div class="demo-input-suffix" style="display:flex">
          <label style="display: inline-block;
    width: 80px;
    line-height: 3;">商品名称：</label>
          <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
        </div>
        <div class="demo-input-suffix xd-left">
          装箱时间：
          <el-date-picker v-model="input2" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </div>
        
      </div>
      <div class="z_top">
           <el-button type="primary" size="small" @click="search">查询</el-button>
        </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(page - 1) * pagenum + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品数量">
          <template slot-scope="scope">
            <span>{{ scope.row.boxNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单瓶标签识别码">
          <template slot-scope="scope">
            <span>{{ scope.row.tid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员">
          <template slot-scope="scope">
            <span>{{ scope.row.packUser }}</span>
          </template>
        </el-table-column>

        <el-table-column label="生产时间">
          <template slot-scope="scope">
            <span>{{ scope.row.productTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="装箱时间">
          <template slot-scope="scope">
            <span>{{ scope.row.packTime }}</span>
          </template>
        </el-table-column>
        
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
import {getTableApiPage} from "../../../api"
export default {
  data() {
    return {
      tableData: [
        //表格数据
       
      ],
       page: 1, //当前页
      pagenum: 10, //每页多少条
      pageCount: 2, //总数量
      input:'',
      input2:'',
    };
  },
  created(){
    this.tablePage()
  },
  methods: {
    tablePage(){
      getTableApiPage({
        start:this.page,
        length:10,
         keyWord:this.input,
        packDate:this.input2
      }).then(res => {
    
        this.tableData = res.data.data
        this.pageCount = Number(res.data.count)
      })
    },
    search(){
       getTableApiPage({
        start:1,
        length:10,
        keyWord:this.input,
        packDate:this.input2
      }).then(res => {

        this.tableData = res.data.data
        this.pageCount = Number(res.data.count)
      })
    },
    handleCurrentChange: function (val) {
      //获取分页

      this.page = val;
      this.tablePage();
    },
  }
  
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

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

/* .mian-table .el-table td{
  padding: 6px;
} */

.xd-left {
  margin-left: 30px;
}
</style>