<template>
  <div>
    <div class="mian-top">
      <div class>
        <el-button
          type="primary"
          @click="isdialog"
          size="small"
          v-if="hasPerm('cusAdd')"
          class="z_top"
          >新增</el-button
        >
        <!-- <el-button type="primary" @click="addBtn" size="small"  class="z_top">跳转</el-button> -->
      </div>
      <div class="search">
        <el-input
          v-model="tableDataName"
          placeholder="请输入供应商名字"
          style="width: 240px"
        ></el-input>
        <el-button type="primary" @click="doFilter" class="f_top" size="small"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="id" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ (page - 1) * pagenum + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供应商名称" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.contact }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="销售区域" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ scope.row.districtName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('cusEdit')"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('cusDel')"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="text"
              v-if="hasPerm('cusGet')"
              @click="handleAddress(scope.$index, scope.row)"
              >收货地址</el-button
            >
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
    <div class="adddialog">
      <el-dialog
        :title="titleName"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            ref="Editform"
            :rules="rules"
            :model="Editform"
            label-width="120px"
          >
            <el-form-item label="新增供应商：" prop="name">
              <el-input v-model="Editform.name"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact">
              <el-input v-model="Editform.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel">
              <el-input v-model="Editform.tel"></el-input>
            </el-form-item>
            <el-form-item label="销售区域：" prop="shengText">
              <el-select
                v-model="Editform.shengText"
                placeholder="请选择省"
                @change="selectSheng2"
              >
                <el-option
                  v-for="item in shengOptions2"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>

              <el-select
                v-model="Editform.shiText"
                placeholder="请选择市"
                @change="selectCity2"
              >
                <el-option
                  v-for="item in cityOptions2"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>
              <el-select
                v-model="Editform.xianText"
                placeholder="请选择县"
                @change="selectXian2"
              >
                <el-option
                  v-for="item in xianOptions2"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closedialogVisible" size="small">取 消</el-button>
          <el-button type="primary" @click="submit('Editform')" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div class="addressdialog">
      <el-dialog
        title="收货地址"
        :visible.sync="addressdialogVisible"
        width="35%"
        :before-close="handleClose"
      >
        <span>
          <div class>
            <el-button
              type="primary"
              @click="openEditAndAdd"
              size="small"
              class="z_top"
              >新增</el-button
            >
          </div>
          <div>
            <el-table :data="detailstableData" style="width: 100%">
              <el-table-column prop="contact" label="收货人"></el-table-column>
              <el-table-column
                prop="districtName"
                label="所在地区"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="详细地址"
              ></el-table-column>
              <el-table-column prop="tel" label="联系电话"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="DetailshandleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    @click="DetailshandleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </span>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="addressdialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submit" size="small">确 定</el-button>
        </span>-->
      </el-dialog>
      <el-dialog
        :title="titleName"
        :visible.sync="dialogaddressTable"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            ref="addressform"
            :model="addressform"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="收货人" prop="contact">
              <el-input v-model="addressform.contact"></el-input>
            </el-form-item>
            <el-form-item label="选择地区" prop="shengText">
              <el-select
                v-model="addressform.shengText"
                placeholder="请选择省"
                @change="selectSheng"
              >
                <el-option
                  v-for="item in shengOptions"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>

              <el-select
                v-model="addressform.shiText"
                placeholder="请选择市"
                @change="selectCity"
              >
                <el-option
                  v-for="item in cityOptions"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>
              <el-select
                v-model="addressform.xianText"
                placeholder="请选择县"
                @change="selectXian"
              >
                <el-option
                  v-for="item in xianOptions"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="addressform.address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
              <el-input v-model="addressform.tel"></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" size="mini" @click="onSave">保存</el-button>
            </el-form-item> -->
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogaddressTable = false"
            >取 消</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="dialogaddressTableedit('addressform')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  shopgettableAll,
  shoptabledel,
  shopaddtable,
  shoppage,
  dialogtableaddress,
  dialogtabledel,
  dialogselectSheng, //省接口
  dialogtableEdit,
  dialogAddFrom,
  searchApi, //搜索
} from "../../../api";
export default {
  data() {
    return {
      tableData: [
        //表格数据
      ],
      options: [],
      rules: {
        name: [
          { required: true, message: "请输入供应商名字", trigger: "blur" },
        ],
        contact: [
          { required: true, message: "请输入联系人名字", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            validator: function (rule, value, callback) {
              if (/^1[3456789]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        shengText: [
          { required: true, message: "请输入省市区", trigger: "change" },
        ],
      },
      shengOptions: [], //省
      cityOptions: [], //市
      xianOptions: [], //县

      shengOptions2: [], //省
      cityOptions2: [], //市
      xianOptions2: [], //县
      threeShengId: "",
      threeCityId: "",
      isShow: false,
      page: 1, //当前页
      pagenum: 10, //每页多少条
      pageCount: 2, //总数量
      detailstableData: [
        // {
        //   //弹窗表格数据
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路",
        //   ele: "18511931117",
        // },
      ],
      addrow: "",
      addindex: "",
      addressform: {
        // 弹窗表格数据
        contact: "",
        sheng: "",
        shi: "",
        xian: "",
        address: "",
        tel: "",
        shengText: "",
        shiText: "",
        xianText: "",
      },
      dialogVisible: false, //新增对话框
      addressdialogVisible: false, //收获地址
      dialogaddressTable: false,
      modelType: "", //弹窗类型
      titleName: "", //弹窗标题
      Editform: {
        //修改的内容
        name: "",
        contact: "",
        tel: "",
        salesTerritory: "",
        sheng: "",
        shi: "",
        xian: "",
        shengText: "",
        shiText: "",
        xianText: "",
      },
      tableDataName: "",
      editId: "",
      role: "",
      detailId: "",
    };
  },

  created: function () {
    //获取table表格数据
    this.pageTable();
    this.getAllSheng2();
    this.getAllSheng();
    this.role = localStorage.getItem("roles");
  },
  methods: {
    addBtn() {
      this.$router.push({ path: "/path" });
    },
    DetailshandleEdit(index, row) {
      this.detailId = row.id;
      this.dialogaddressTable = true;
      this.titleName = "修改内容";
      this.modelType = "edit";
      this.addressform = Object.assign({}, row);
      let arr = row.districtName.split("-");
      this.addressform.sheng = Number(row.provinceId);

      this.addressform.shi = Number(row.cityId);
      this.addressform.xian = Number(row.districtId);

      this.addressform.shengText = arr[0];
      this.addressform.shiText = arr[1];
      this.addressform.xianText = arr[2];
    },
    openEditAndAdd() {
      this.dialogaddressTable = true;
      this.titleName = "增加内容";
      this.modelType = "add";
      this.addressform = {
        // 弹窗表格数据
        contact: "",
        sheng: "",
        shi: "",
        xian: "",
        address: "",
        tel: "",
        shengText: "",
        shiText: "",
        xianText: "",
      };
    },
    dialogaddressTableedit(addressform) {
      if (this.modelType == "add") {
        this.$refs[addressform].validate((valid) => {
          if (valid) {
            dialogtableEdit({
              customerId: this.addrow.id,
              contact: this.addressform.contact, //收货人
              address: this.addressform.address,
              tel: this.addressform.tel,
              provinceId: this.addressform.sheng,
              cityId: this.addressform.shi,
              districtId: this.addressform.xian,
              districtName:
                this.addressform.shengText +
                "-" +
                this.addressform.shiText +
                "-" +
                this.addressform.xianText, //区域
            }).then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.handleAddress(this.addindex, this.addrow);
            });
            this.dialogaddressTable = false;
          } else {
            return false;
          }
        });
      } else {
        this.$refs[addressform].validate((valid) => {
          if (valid) {
            dialogtableEdit({
              id: this.detailId,
              customerId: this.addrow.id,
              contact: this.addressform.contact, //收货人
              address: this.addressform.address,
              tel: this.addressform.tel,
              provinceId: this.addressform.sheng,
              cityId: this.addressform.shi,
              districtId: this.addressform.xian,
              districtName:
                this.addressform.shengText +
                "-" +
                this.addressform.shiText +
                "-" +
                this.addressform.xianText, //区域
            }).then((res) => {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.handleAddress(this.addindex, this.addrow);
              this.dialogaddressTable = false;
            });
          } else {
            return false;
          }
        });
      }
    },
    // formatterCity: function (row) {
    //   for (let i = 0; i < this.options.length; i++) {
    //     if (row.salesTerritory == this.options[i].value) {
    //       return this.options[i].label;
    //     }
    //   }
    // },

    //三级城市联动 省  收货地址
    getAllSheng() {
      dialogselectSheng({
        pid: 1,
      }).then((res) => {
        this.shengOptions = res.data.data;
      });
    },
    getAllcity(id) {
      //市
      console.log(id);
      dialogselectSheng({
        pid: id,
      }).then((res) => {
        this.cityOptions = res.data.data;
      });
    },
    getAllxian(id) {
      dialogselectSheng({
        pid: id,
      }).then((res) => {
        this.xianOptions = res.data.data;
      });
    },
    selectSheng(val) {
      this.cityOptions = [];
      this.xianOptions = [];
      this.addressform.sheng = val;
      this.addressform.shi = "";
      this.addressform.xian = "";

      this.shengOptions.map((e) => {
        if (val == e.id) {
          this.addressform.shengText = e.districtName;
        }
      });
      this.getAllcity(val);
    },
    selectCity(val) {
      this.addressform.xian = "";
      this.addressform.shi = val;
      this.getAllxian(val);
      this.cityOptions.map((e) => {
        if (val == e.id) {
          this.addressform.shiText = e.districtName;
        }
      });
    },
    selectXian(val) {
      this.$forceUpdate();
      this.addressform.xian = val;
      this.xianOptions.map((e) => {
        if (val == e.id) {
          this.addressform.xianText = e.districtName;
        }
      });
    },

    // dierge
    getAllSheng2() {
      dialogselectSheng({
        pid: 1,
      }).then((res) => {
        this.shengOptions2 = res.data.data;
      });
    },
    getAllcity2(id) {
      //市

      dialogselectSheng({
        pid: id,
      }).then((res) => {
        this.cityOptions2 = res.data.data;
      });
    },
    getAllxian2(id) {
      dialogselectSheng({
        pid: id,
      }).then((res) => {
        this.xianOptions2 = res.data.data;
      });
    },
    selectSheng2(val) {
      this.cityOptions2 = [];
      this.xianOptions2 = [];
      this.Editform.sheng = val;
      this.Editform.shi = "";
      this.Editform.xian = "";

      this.shengOptions.map((e) => {
        if (val == e.id) {
          this.Editform.shengText = e.districtName;
        }
      });
      this.getAllcity2(val);
    },
    selectCity2(val) {
      this.Editform.xian = "";
      this.Editform.shi = val;
      this.getAllxian2(val);
      this.cityOptions2.map((e) => {
        if (val == e.id) {
          this.Editform.shiText = e.districtName;
        }
      });
    },
    selectXian2(val) {
      this.Editform.xian = val;
      this.xianOptions2.map((e) => {
        if (val == e.id) {
          this.Editform.xianText = e.districtName;
        }
      });
    },

    handleCurrentChange: function (val) {
      //获取分页

      this.page = val;
      this.pageTable();
    },
    pageTable() {
      //表格数据
      searchApi({
        start: this.page,
        length: 10,
        keyWord: this.tableDataName,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },

    isdialog() {
      this.dialogVisible = true;

      this.titleName = "增加内容";
      this.modelType = "add";
      this.Editform = {
        //修改的内容
        name: "",
        contact: "",
        tel: "",
        salesTerritory: "",
        sheng: "",
        shi: "",
        xian: "",
        shengText: "",
        shiText: "",
        xianText: "",
      };
    },
    handleAddress(index, row) {
      //收获地址表格table

      this.getAllSheng();
      this.addindex = index;
      this.addrow = row;
      this.addressdialogVisible = true;
      dialogtableaddress({
        customerId: this.addrow.id,
      }).then((res) => {
        this.detailstableData = res.data.data;
      });
    },
    DetailshandleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        dialogtabledel(row.id).then((res) => {
          if (res.data.code == 0) {
            this.handleAddress(this.addindex, this.addrow);
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      });
    },
    handleClose(done) {
      //弹窗
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.$refs["Editform"].clearValidate();
        })
        .catch((_) => {});
    },
    closedialogVisible(Editform) {
      this.dialogVisible = false;
      this.$refs["Editform"].clearValidate();
    },
    handleEdit(index, row) {
      this.editId = row.id;
      this.Editform = Object.assign({}, row);
      this.dialogVisible = true;
      this.titleName = "修改内容";

      this.modelType = "edit";
      let arr = row.districtName.split("-");
      this.Editform.sheng = Number(row.provinceId);

      this.Editform.shi = Number(row.cityId);
      this.Editform.xian = Number(row.districtId);

      this.Editform.shengText = arr[0];
      this.Editform.shiText = arr[1];
      this.Editform.xianText = arr[2];
    },
    submit(Editform) {
      //供应商表格编辑

      if (this.modelType == "add") {
        //增加逻辑
        this.$refs[Editform].validate((valid) => {
          if (valid) {
            //alert('submit!');
            shopaddtable({
              name: this.Editform.name,
              contact: this.Editform.contact,
              tel: this.Editform.tel,
              provinceId: this.Editform.sheng,
              cityId: this.Editform.shi,
              districtId: this.Editform.xian,
              districtName:
                this.Editform.shengText +
                "-" +
                this.Editform.shiText +
                "-" +
                this.Editform.xianText, //区域
            }).then((res) => {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.pageTable();
              this.dialogVisible = false;
            });
          } else {
            // this.tableData.push(studenteList);
            //  console.log('error submit!!')
            return false;
          }
        });
      } else {
        this.$refs[Editform].validate((valid) => {
          if (valid) {
            //alert('submit!');
            shopaddtable({
              id: this.editId,
              name: this.Editform.name,
              contact: this.Editform.contact,
              tel: this.Editform.tel,
              provinceId: this.Editform.sheng,
              cityId: this.Editform.shi,
              districtId: this.Editform.xian,
              districtName:
                this.Editform.shengText +
                "-" +
                this.Editform.shiText +
                "-" +
                this.Editform.xianText, //区域
            }).then((res) => {
              this.$message({
                message: "提交成功",
                type: "success",
              });
              this.pageTable();
              this.dialogVisible = false;
            });
          } else {
            // this.tableData.push(studenteList);
            //  console.log('error submit!!')
            return false;
          }
        });
      }
      // }
    },
    handleDelete(index, row) {
      //删除逻辑
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          shoptabledel({
            id: row.id,
          }).then((res) => {
            if (res.data.code == 0) {
              this.pageTable();
            }
          });
          //this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    doFilter() {
      //搜索
      if (this.tableDataName == "") {
        // this.$message.warning("查询条件不能为空！");
        this.pageTable();
        return;
      } else {
        searchApi({
          keyWord: this.tableDataName,
          start: 1,
          length: 10,
        }).then((res) => {
          this.tableData = res.data.data;
          this.pageCount = Number(res.data.count);
          // this.pageTable();
        });
      }
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
.pagination {
  text-align: right;
  margin-top: 30px;
}
.search {
  margin-left: 15px;
}
.bg-blue {
  background: #409eff;
}
</style>