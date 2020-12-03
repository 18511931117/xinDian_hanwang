<template>
  <div>
    <div class="mian-top">
      <div class="select-left">
        <div class="demo-input-suffix" style="display:flex">
          <label style="display: inline-block;
    width: 80px;
    line-height: 3;">发货单号：</label>
          <el-input placeholder="请输入发货单号" prefix-icon="el-icon-search" v-model="value"></el-input>
          <!-- <el-select v-model="value" placeholder="请选择">
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
               v-for="(item,index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </div>
        <div class="demo-input-suffix xd-left">
          发货时间：
          <el-date-picker
      v-model="value1"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker>
        </div>
      </div>
      <div >
           <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(page - 1) * pagenum + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货单号">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="箱数">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货时间">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员">
          <template slot-scope="scope">
            <span>{{ scope.row.receivedUser }}</span>
          </template>
        </el-table-column>

        <el-table-column label="销售区域">
          <template slot-scope="scope">
            <span>{{ scope.row.salesArea }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收获地址">
          <template slot-scope="scope">
            <span>{{ scope.row.address.address }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleDetails(scope.$index, scope.row)">详情</el-button>

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
    <div class="dialog">
      <el-dialog title="详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
        <span>
          <el-table :data="DetailstableData" border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="每箱数量">
                    <span>{{ props.row.boxNum }}</span>
                  </el-form-item>
                  <el-form-item label="合计">
                    <span>{{ props.row.boxNum }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <!-- <el-table-column label="序号" prop="rownum"></el-table-column> -->
             <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(page2 - 1) * pagenum2 + scope.$index + 1}}</span>
          </template>
        </el-table-column>
            <el-table-column label="产品名称" prop="productName"></el-table-column>
            <el-table-column label="生产时间" prop="productTime"></el-table-column>
            <el-table-column label="生产批次" prop="productBatch"></el-table-column>
            <el-table-column label="箱标识别码" prop="boxCodeId"></el-table-column>
            <!-- <el-table-column label="操作人员" prop="master"></el-table-column> -->
            <el-table-column label="封箱数量" prop="packNum"></el-table-column>
          </el-table>
          <div class="pagination">
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange2"
          :page-count="pageCount2"
          :page-size="pagenum2"
          layout="total,prev, pager, next"
          :total="pageCount2"
        ></el-pagination>
      </div>
    </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <!-- <el-button type="primary" @click="submitDetails" size="small">确 定</el-button> -->
          <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { logisticsRecordgetTableData,logisticsDetail,getInvoiceRecodeQuerys,getRecordByPage } from "../../../api";
export default {
  data() {
    return {
      tableData: [
        //表格数据
       
      ],
      DetailstableData: [
        //详情表格
      ],
      options: [
       
      ],
      value: "",//下拉框
      value1:'',//时间
      value2:'',
      dialogVisible: false, //新增对话框
      tableDataName: "",
      page:1,
      pageCount:1,
      pagenum:10,
      page2:1,
      pageCount2:1,
      pagenum2:6,
      detalstTableId:'',

    };
  },
  created:function(){
    this.pageTable()
    this.getSelect()
  },
  methods: {
    pageTable() {
      logisticsRecordgetTableData({
        start: this.page,
        length: 10,
        invoiceType:2,
        invoiceCode:this.value,
        salesArea:this.value2,
        invoiceTime:this.value1,
      }).then((res) => {

        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    handleCurrentChange: function (val) {
      //获取分页
    
      this.page = val;
      this.pageTable();
    },
    getSelect() {
      getInvoiceRecodeQuerys().then((res) => {

        this.options = res.data.data
      });
    },
     onSearch(){ //查询
      logisticsRecordgetTableData({
        start:1,
        length:10,
        invoiceType:2,
        invoiceCode:this.value,
        salesArea:this.value2,
        invoiceTime:this.value1,
      }).then(res => {
        this.tableData = res.data.data
        this.pageCount = Number(res.data.count);
      })
    },
    handleClose(done) {
      //详情弹框
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleCurrentChange2(val){
      this.page2 = val
    },
    detalstTable(){
      logisticsDetail({
        id:this.detalstTableId,
        start:this.page2,
        length:6
      }).then((res) => {
        this.DetailstableData = res.data.data
        this.pageCount2 = Number(res.data.count)
      });
    },
    handleDetails(index, row) {
      this.detalstTableId = row.id
      this.detalstTable()
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
.select-left{
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