<template>
  <div class="mol-box">
    <!-- <div class="mol-left-tree">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div> -->
    <div class="mol-mian-table">
      <div class="mol-top">
        <div class="mol-add">
          <el-button
            size="small"
            type="primary"
            class="z_top"
            @click="openAddDialog"
            v-if="hasPerm('orgAdd')"
            >新增</el-button
          >
        </div>
        <!-- <div class="mol-add">
          <el-select v-model="value" clearable placeholder="部门" @change="currentSel">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.orgName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="mol-add mol-addleft">
          <div style="display:flex">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <el-button size="small" type="primary" @click="onSearch" class="z_top">搜索</el-button>
          </div>
        </div> -->
      </div>

      <div class="mol-table">
        <zk-table
          ref="table"
          :data="tableData"
          :columns="columns"
          :stripe="props.stripe"
          :border="props.border"
          :show-header="props.showHeader"
          :show-summary="props.showSummary"
          :show-row-hover="props.showRowHover"
          :show-index="props.showIndex"
          :tree-type="props.treeType"
          :is-fold="props.isFold"
          :expand-type="props.expandType"
          :selection-type="props.selectionType"
          sum-text="sum"
          index-text="序号"
        >
          <template slot="action" slot-scope="scope">
            <!-- <span
              style="color:#2d8cf0;"
             
              @click="pre_add(scope.row)"
              >添加</span
            >-->
            <!-- <span>|</span> -->

            <span
              @click="pre_edit(scope.row)"
              class="head"
              v-if="hasPerm('orgEdit')"
              >修改</span
            >
            <!-- <span>|</span> -->

            <span
              @click="handleDelete(scope.row)"
              class="head"
              v-if="hasPerm('orgDel') && (!scope.row.children)"
              >删除</span
            >
          </template>
        </zk-table>
      </div>
      <!-- <div class="pagination">
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :page-count="pageCount"
            :page-size="pagenum"
            layout="total,prev, pager, next"
            :total="pageCount"
          ></el-pagination>
        </div>
      </div> -->
    </div>
    <div>
      <el-dialog
        :title="titleName"
        :visible.sync="dialogaddressTable"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            ref="Editformtable"
            :model="Editformtable"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="机构名称：" prop="orgName">
              <el-input v-model="Editformtable.orgName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="区域：" prop="shengText">
              <el-select v-model="Editformtable.shengText" placeholder="请选择省" @change="selectSheng">
                <el-option
                  v-for="item in shengOptions"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>

              <el-select v-model="Editformtable.shiText" placeholder="请选择市" @change="selectCity">
                <el-option
                  v-for="item in cityOptions"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>
              <el-select v-model="Editformtable.xianText" placeholder="请选择县" @change="selectXian">
                <el-option
                  v-for="item in xianOptions"
                  :label="item.districtName"
                  :value="parseInt(item.id)"
                  :key="parseInt(item.id)"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="部门：" prop="parentId">
              <el-select
                v-model="Editformtable.parentId"
                placeholder="请选择部门"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人：" prop="userId">
              <el-select
                v-model="Editformtable.userId"
                placeholder="请选择负责人"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.realname"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="closedialogVisible">取 消</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="dialogaddressTableedit('Editformtable')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getHieraDistrict,
  getOrgByDistrictPage,
  delrealDel,
  saveOrUpdateOrg,
  searchpageByKeyWord,
  getSysOrgController,
  getOrgUserQuerya, //下拉框负责人
  // getSysOrg,//下拉框组织机构
  dialogselectSheng, //省接口
  dialogtableEdit,
  dialogAddFrom,
} from "../../../api";
export default {
  data() {
    return {
      data: [],
      rules: {
        orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
        ],
        // shengText: [{ required: true, message: "请选择省市区", trigger: "change" }],

         parentId: [{ required: true, message: "请选择部门", trigger: "change" }],
        //  userId: [{ required: true, message: "请选择负责人", trigger: "change" }],
      },
      props: {
        stripe: false,
        border: true,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: true,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false,
      },
      columns: [
        //  { label: "序号", align: "center", template: "id",type: "template",prop:'id' },
        { label: "机构名称", prop: "orgName" },
        // { label: "区域", align: "center", prop: "districtName" },
        { label: "部门", align: "center", prop: "parentName" },
        { label: "负责人", align: "center", prop: "userName" },
        { label: "创建时间", align: "center", prop: "createdDate" },
        {
          label: "操作",
          align: "center",
          prop: "action",
          template: "action",
          type: "template",
          width: "180px",
        },
      ],
      shengOptions: [], //省

      cityOptions: [], //市
      xianOptions: [], //县
      threeShengId: "",
      threeCityId: "",
      Editformtable: {
        //修改的内容
        orgname: "", //机构名称
        districtName: "", //区域
        userId: "", //负责人
        parentId: "", //部门
        sheng: "",
        shi: "",
        xian: "",
        shengText: "",
        shiText: "",
        xianText: "",
      },
      modelType: "", //弹窗类型
      titleName: "", //弹窗标题
      defaultProps: {
        children: "districtList",
        label: "districtName",
      },
      options: [],
      options2: [],
      dialogaddressTable: false,
      value: "",
      input: "",
      tableData: [],
      pageCount: 1,
      pagenum: 10, //每页多少条
      page: 1,
      pid: "",
      editId: "",
    };
  },
  created: function () {
    //this.getCityArr();
    this.pageTable();
    this.getSelect();
    this.getSelectUser();
    // this.getAllSheng();
  },
  mounted: function () {
    //
  },
  methods: {
    //三级城市联动 省
    getAllSheng() {
      dialogselectSheng({
        pid: 1,
      }).then((res) => {
        this.shengOptions = res.data.data;
      });
    },
    getAllcity(id) {
      //市
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
      this.Editformtable.sheng = val;
      this.Editformtable.shi = "";
      this.Editformtable.xian = "";

      this.shengOptions.map((e) => {
        if (val == e.id) {
          this.Editformtable.shengText = e.districtName;
        }
      });
      this.getAllcity(val);
    },
    selectCity(val) {
      this.Editformtable.shi = val;
      this.Editformtable.xian = "";
      this.getAllxian(val);
      this.cityOptions.map((e) => {
        if (val == e.id) {
          this.Editformtable.shiText = e.districtName;
        }
      });
    },
    selectXian(val) {
      this.$forceUpdate();

      this.Editformtable.xian = val;
      this.xianOptions.map((e) => {
        if (val == e.id) {
          this.Editformtable.xianText = e.districtName;
        }
      });
    },
    getSelectUser() {
      getOrgUserQuerya().then((res) => {
        this.options2 = res.data.data;
      });
    },
    getSelectOrgId(val) {},
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delrealDel({
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
    currentSel(val) {
      this.pid = val;
    },
    onSearch() {
      searchpageByKeyWord({
        start: 1,
        length: 10,
        pid: this.pid,
        keyWord: this.input,
      }).then((res) => {
        this.tableData = res.data.data;
        //  this.pageCount = Number(res.data.count);
      });
    },

    dialogaddressTableedit(Editformtable) {
      if (this.modelType == "add") {
        //增加逻辑
        //this.dialogaddressTable = true;
        this.$refs[Editformtable].validate((valid) => {
          if (valid) {
            saveOrUpdateOrg({
              orgName: this.Editformtable.orgName, //机构名称
              // districtName: this.Editformtable.xian, //区域
              // remark: this.Editformtable.remark,//负责人
              userId: this.Editformtable.userId,
              // provinceId: Number(this.Editformtable.sheng), //省级id
              // cityId: Number(this.Editformtable.shi), //省级id
              parentId: this.Editformtable.parentId, //部门
              // districtId: Number(this.Editformtable.xian), //省级id
              // districtName:
              //   this.Editformtable.shengText +
              //   "-" +
              //   this.Editformtable.shiText +
              //   "-" +
              //   this.Editformtable.xianText, //区域
            }).then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.dialogaddressTable = false;
              this.pageTable();
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[Editformtable].validate((valid) => {
          if (valid) {
            saveOrUpdateOrg({
              id: this.editId,
              orgName: this.Editformtable.orgName, //机构名称
              // districtName: this.Editformtable.xian, //区域
              // remark: this.Editformtable.remark,//负责人
              userId: this.Editformtable.userId,
              // provinceId: String(this.Editformtable.sheng), //省级id
              // cityId: String(this.Editformtable.shi), //省级id
              parentId: this.Editformtable.parentId, //部门
              // districtId: String(this.Editformtable.xian), //省级id
              // districtName:
              //   this.Editformtable.shengText +
              //   "-" +
              //   this.Editformtable.shiText +
              //   "-" +
              //   this.Editformtable.xianText, //区域
            }).then((res) => {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogaddressTable = false;
              this.pageTable();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    getSelect() {
      getSysOrgController({
        id: 0,
      }).then((res) => {
        this.options = res.data.data;
        // for(var i = 0 ;i<res.data.data.length;i++){
        //   this.pid =res.data.data[i].id
        // }
      });
    },
    openAddDialog() {
      this.dialogaddressTable = true;
      this.titleName = "增加内容";
      this.modelType = "add";
      this.Editformtable = {
        //修改的内容
        orgname: "", //机构名称
        districtName: "", //区域
        userId: "", //负责人
        parentId: "", //部门
        sheng: "",
        shi: "",
        xian: "",
        shengText: "",
        shiText: "",
        xianText: "",
      };
    },
    pre_edit(row) {
      this.editId = row.id;
      this.Editformtable = Object.assign({}, row);
      this.dialogaddressTable = true;
      this.titleName = "修改内容";
      this.modelType = "edit";
      //  let arr = row.districtName.split("-");
      //  this.Editformtable.sheng = Number(row.provinceId);

      // this.Editformtable.shi = Number(row.cityId);
      // this.Editformtable.xian = Number(row.districtId);
      // this.Editformtable.shengText = arr[0];
      // this.Editformtable.shiText = arr[1];
      // this.Editformtable.xianText = arr[2];
    },
    closedialogVisible() {
      this.dialogaddressTable = false;
      this.$refs["Editformtable"].clearValidate();
    },
    handleClose(done) {
      //弹窗
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$refs["Editformtable"].clearValidate();
          done();
        })
        .catch((_) => {});
    },
    pageTable() {
      getOrgByDistrictPage({
        pid: this.pid,
        keyWord: this.input,
      }).then((res) => {
        this.tableData = res.data.data;
        // this.pageCount = Number(res.data.count);
      });
    },
    handleNodeClick(data) {
      this.pageTable();
    },
    handleCurrentChange: function (val) {
      //获取分页
      this.page = val;
      this.pageTable();
    },
    // getCityArr() {
    //   getHieraDistrict().then((res) => {
    //     this.data = res.data.data;

    //    // this.getSelect();
    //   });
    // },
  },
};
</script>

<style>
/* .mol-box {
  display: flex;
}
.mol-left-tree {
  width: 200px;
} */

.mol-mian-table {
  flex: 1;
  padding: 0 10px;
}
.mol-top {
  display: flex;
}
.mol-add {
  margin-right: 15px;
}
.mol-addleft {
  display: flex;
}
.mol-table {
  margin-top: 15px;
}
.head {
  cursor: pointer;
  margin-right: 15px;
}
</style>