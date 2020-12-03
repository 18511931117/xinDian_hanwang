<template>
  <div>
    <div class="mian-top">
      <div class="select-left">
        <div class="demo-input-suffix" style="display:flex">
          <label style="display: inline-block;
    width: 80px;
    line-height: 3;">发货单号：</label>
          <el-input placeholder="请输入发货单号" prefix-icon="el-icon-search" v-model="value"></el-input>
          <!-- 发货单号：
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.invoiceCode"
              :value="item.invoiceCode"
            ></el-option>
          </el-select> -->
        </div>
        <div class="demo-input-suffix xd-left">
          销售区域：
          <el-select v-model="value2" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in options2"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="demo-input-suffix xd-left">
          发货时间：
          <el-date-picker v-model="value3" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </div>
      </div>
      <div>
        <el-button type="primary" size="small" @click="onQuery">查询</el-button>
      </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(page - 1) * pagenum + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{ scope.row.productName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品数量">
          <template slot-scope="scope">
            <span>{{ scope.row.productNum }}</span>
          </template>
        </el-table-column>
        
         <el-table-column label="发货单号">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货时间">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceUser }}</span>
          </template>
        </el-table-column>

        <el-table-column label="销售区域">
          <template slot-scope="scope">
            <span>{{ scope.row.salesArea }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收获地址">
          <template slot-scope="scope">
            <span>{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
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
import {getdeliveryDataPage,getSelectApi,getSelectSale} from "../../../api"
export default {
  data() {
    return {
      tableData: [
        //表格数据
        
      ],
       page: 1, //当前页
      pagenum: 10, //每页多少条
      pageCount: 2, //总数量
      options: [
      
      ],
      options2: [
      
      ],
      value: "", //下拉框
      value2:'',
      value3: "", //时间
      dialogVisible: false, //新增对话框
      tableDataName: "",
    };
  },
  created:function(){
    this.pageTable()
    this.getSelect()
  },
  methods: {
    getSelect(){
      getSelectApi().then(res => {
        
        this.options = res.data.data
      })
      getSelectSale().then(res => {

        this.options2 = res.data.data
      })
    },

    pageTable(){
      getdeliveryDataPage({
        start:this.page,
        length:10,
        invoiceCode:this.value,
        salesArea:this.value2,
        invoiceTime:this.value3
      }).then(res =>{
        this.tableData = res.data.data
        this.pageCount = Number(res.data.count)
      })
    },
    onQuery(){
      getdeliveryDataPage({
        start:1,
        length:10,
        invoiceCode:this.value,
        salesArea:this.value2,
        invoiceTime:this.value3
      }).then(res => {
        this.tableData = res.data.data
       
        this.pageCount = Number(res.data.count)
       // this.handleCurrentChange()
      })
    },
    handleCurrentChange: function (val) {
      //获取分页
      this.page = val;
      this.pageTable();
    },
    handleClose(done) {
      //详情弹框
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleDetails(index, row) {
      this.dialogVisible = true;
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