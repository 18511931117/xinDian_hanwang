<template>
  <div>
    <div class="mian-top">

  </div>
  <div class="mian-table">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="日期"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="发送人"
       >
      </el-table-column>
      <el-table-column
        prop="tissue"
        label="接受部门">
      </el-table-column>
       <el-table-column
        prop="ip"
        label="消息类型">
      </el-table-column>
       <el-table-column
        prop="router"
        label="状态">
        <template slot-scope="scope">
            <i class="border"></i>
            {{scope.row.router}}
        </template>
      </el-table-column>
       <el-table-column
        prop="say"
        label="创建时间">
      </el-table-column>
      
    </el-table>
  </div>
  <div class="pagination">
      <div class="block">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getLogtablePage} from "../../../api"
export default {
  data(){
    return{
       tableData: [],
            pageCount: 1,
      pagenum: 10, //每页多少条
      page: 1,
    }
  },
  created:function(){
    this.pageTable()
  },
  methods:{
    pageTable(){
      getLogtablePage({
        start:this.page,
        length:10,
      }).then(res =>{
        this.tableData = res.data.data
      })
    },
  }
}
</script>

<style>
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
.border{
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: red;
}
</style>