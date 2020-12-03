<template>
  <div>
    <div class="mian-top">
      <div class="select-left">
        <div class="demo-input-suffix" style="display:flex">
          <label style="display: inline-block;
    width: 100px;
    line-height: 3;">箱标识别码：</label>
          <el-input placeholder="请输入标箱识别码" prefix-icon="el-icon-search" v-model="value"></el-input>
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
          状态：
          <el-select v-model="value2" clearable  placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="onSearch" size="small">查询</el-button>
      </div>
    </div>
    <div class="boxCode">
      <el-button type="primary" @click="onBoxCode" size="small">打印箱码</el-button>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(page - 1) * pagenum + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="箱标识别码">
          <template slot-scope="scope">
            <span>{{ scope.row.boxCodeId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人员">
          <template slot-scope="scope">
            <span>{{ scope.row.master }}</span>
          </template>
        </el-table-column>
        <el-table-column label="装箱时间">
          <template slot-scope="scope">
            <span>{{ scope.row.packTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品数量">
          <template slot-scope="scope">
            <span>{{ scope.row.totalQty }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发货单号">
          <template slot-scope="scope">
            <span>{{ scope.row.invoiceCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- <i :class="scope.row.status == '待发货'?'red-radius':'green-radius'"></i> -->
            <i
              :class="[scope.row.status == '待发货' ? 'red-radius': '', scope.row.status=='已收货'? 'green-radius': '',scope.row.status=='已发货'? 'yellow-radius': '']"
            ></i>
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
            <el-table-column label="序号">
               <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column label="产品名称" prop="productName"></el-table-column>
            <el-table-column label="生产时间" prop="productTime"></el-table-column>
            <el-table-column label="生产批次" prop="productBatch"></el-table-column>
            <el-table-column label="箱标识别码" prop="boxCodeId"></el-table-column>
            <el-table-column label="商品数量" prop="boxNum"></el-table-column>
          </el-table>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <!-- <el-button type="primary" @click="submitDetails" size="small">确 定</el-button> -->
          <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="提示" :visible.sync="boxCode" width="30%" :before-close="handleClose">
        <span>
          <div class="onBtn">
            <el-input v-model="input" placeholder="请输入二维码数量总数"></el-input>
            <el-input v-model="input2" placeholder="单个二维码重复次数"></el-input>
            <!-- <el-button type="primary" size="small" @click="handlePrintText()">一对一</el-button> -->
            <el-button type="primary" size="small" @click="handlePrintText2()">确定</el-button>
          </div>
          <div class="parint-warp" id="printTest" >
            <!-- <div> -->
            <div class="item" v-show="oneAndone" v-for="(item,index) in goodsData" :key="index + '_index'">
              <!-- <div class="qrcode-pic" ref="codeItem"></div> -->
              <vue-qr
                class="qrcode-pic"
                :text="item.boxCode"
                :margin="Margin"
                :size="50"
                :correctLevel="correCt"
              ></vue-qr>
              <div class="name">{{item.boxCodeId}}</div>
            </div>
            <!-- 一对多 -->
            <div class="item" ref="print" v-show="oneAndduo" v-for="(item,index) in goodsData" :key="'index_'+index">
              <vue-qr
                class="qrcode-pic"
                :text="item.boxCode"
                :margin="Margin"
                :size="50"
                :correctLevel="correCt"
              ></vue-qr>
              <div class="name">{{item.boxCodeId}}</div>
            </div>
            <!-- </div> -->
          </div>
          <div class="qrcodeimg">
            <div class="item" ref="qrCode" xss="removed"></div>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="boxCode = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" v-print="'#printTest'">打 印</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getTableData,
  getTableDetails,
  getPackageInfoQuerys,
  getPackageInfoPage,
  getPrintCode, //打印
} from "../../../api";
// import QRCode from "qrcodejs2";
import vueQr from "vue-qr";
export default {
  data() {
    return {
      Margin: 0,
      correCt: 0,
      qrcodeText: "",
      tableData: [
        //表格数据
      ],
      goodsData: [
        // { name: "HW202009170006", code: "123" },
        // { name: "HW202009170006", code: "456" },
        // { name: "商品3", code: "789" },
      ],
      page: 1,
      pageCount: 1,
      pagenum: 10,
      boxCode: false,
      input: "",
      input2:'',
      DetailstableData: [
        //详情表格
        {
          // id: "1",
          // number: "18511931117",
          // time: "2019-01-12",
          // name: "王小虎",
          // batch: "20",
          // Identifier: "124567851",
          // personnel: "王小虎",
          // count: "20",
          // boxcount: "6瓶",
          // total: "30瓶",
        },
      ],
      options: [],
      options2: [
        {
          value: "0",
          label: "待发货",
        },
        {
          value: "1",
          label: "已发货",
        },
        {
          value: "2",
          label: "已收货",
        },
      ],
      value: "",
      value2: "",
      dialogVisible: false, //新增对话框
      tableDataName: "",
      oneAndone:false,
      oneAndduo:false,
    };
  },
  created: function () {
    
    this.getSelect();
  },
  mounted() {},
  methods: {
    onBoxCode() {
      this.boxCode = true;
    },
    handlePrintText2() {
      this.oneAndduo = true
      this.oneAndone = false
      
      this.goodsData = []
      getPrintCode({
        num: this.input,
      }).then(res => {
        for(var i = 0;i<res.data.data.length;i++){
          
          for(var j = 0;j<this.input2;j++){
           this.goodsData.push(res.data.data[i])
          //  console.log(res.data.data[i])
          }
        }
      })
    },
    handlePrintText() {
      //必须要等到页面加载完成，不然会报错
      this.oneAndone = true
      this.oneAndduo = false
      getPrintCode({
        num: this.input,
      }).then((res) => {
        this.goodsData = res.data.data;

        // this.$nextTick(() =>{
        //   this.goodsData.forEach((item, index) => {
        //     console.log(item)
        //     this.qrcodeText = item.boxCode;
        //  //   console.log(this.$refs.codeItem[index])
        //     this.$refs.codeItem[index].innerHTML = "";
        //     new QRCode(this.$refs.codeItem[index], {
        //       text: code, //二维码内容
        //       width: 55,
        //       height: 55,
        //       correctLevel: QRCode.CorrectLevel.H
        //       // colorDark: "#333333", //二维码颜色
        //       // colorLight: "#ffffff", //二维码背景色
        //     });
        //   });
      });

      // })
    },
    handleClose(done) {
      //详情弹框
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getSelect() {
      getPackageInfoQuerys().then((res) => {
        this.options = res.data.data;
      });
    },
    handleDetails(index, row) {
      this.dialogVisible = true;
      getTableDetails({
        boxCode: row.boxCode,
      }).then((res) => {
        this.DetailstableData = res.data.data;
      });
    },
    handleCurrentChange: function (val) {
      //获取分页

      this.page = val;
      this.pageTable();
    },
    onSearch() {
      getTableData({
        start: 1,
        length: 10,
        invoiceType: this.value2,
        boxCode: this.value,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    pageTable() {
      getTableData({
        start: this.page,
        length: 10,
         invoiceType: this.value2,
        boxCode: this.value,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
  },
  mounted(){
    this.pageTable();
  },
  components: {
    vueQr,
  },
};
</script>

<style>
.mian-top {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.boxCode {
  margin: 15px 0;
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
.red-radius {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
}
.green-radius {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: green;
}
.yellow-radius {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: yellow;
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
#printTest {
  overflow: hidden;
}
.onBtn {
  display: flex;
}
.item {
  /* display: flex; */
  float: left;
  /* margin-right: 10px; */
  /* width: 100px; */
  width: 30%;
  line-height: 1.3;
  margin-top: 10px;
}
.item .qrcode-pic {
  float: left;
}
.item .name {
  word-break: break-all;
}
</style>