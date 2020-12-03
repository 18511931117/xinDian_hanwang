<template>
  <div>
    <div class="mian-top">
      <div class>
        <el-button
          type="primary"
          @click="openAddDialog"
          size="small"
          class="z_top"
           v-if="hasPerm('userAdd')"
          >新增</el-button
        >
      </div>
      <div class="search">
        <el-input
          v-model="tableDataName"
          placeholder="请输入姓名"
          style="width: 240px"
        ></el-input>
        <el-button type="primary" size="small" class="f_top" @click="onSearech"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{ (page - 1) * pagenum + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号">
          <template slot-scope="scope">
            <span>{{ scope.row.loginName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="密码">
          <template slot-scope="scope">
            <span>{{ scope.row.password }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.realname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>

        <el-table-column label="组织机构">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              v-for="(item, index) in scope.row.orgList"
              :key="index"
              >{{ item.orgName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <el-tag
              size="medium"
              v-for="(item, index) in scope.row.roleList"
              :key="index"
              >{{ item.roleName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="hasPerm('userEdit')"
              @click="tableEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="hasPerm('userDel')"
              @click="tableDel(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
             
              
              @click="password(scope.$index, scope.row)"
              >重置密码</el-button
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
    <div class="addandedit">
      <el-dialog
        :title="titleName"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <span>
          <el-form
            ref="userAddFrom"
            :rules="rules"
            :model="userAddFrom"
            label-width="80px"
          >
            <el-form-item label="账号" prop="loginName">
              <el-input v-model="userAddFrom.loginName"></el-input>
            </el-form-item>
            <el-form-item
              v-if="modelType == 'add' ? isPassword : noPassword"
              label="密码"
              prop="password"
            >
              <el-input v-model="userAddFrom.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="realname">
              <el-input v-model="userAddFrom.realname"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="userAddFrom.phone"></el-input>
            </el-form-item>
            <el-form-item label="组织机构" prop="orgName">
              <el-select
                v-model="userAddFrom.orgName"
                placeholder="请选择组织机构"
                @change="getOrgNameId"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.orgName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select
                v-model="userAddFrom.role"
                placeholder="请选择角色"
                @change="getUserId"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="closedialogVisible">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="onSubmit('userAddFrom')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisiblePassWord"
      width="30%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :model="reset" label-width="80px">
          <el-form-item label="旧密码">
            <el-input v-model="reset.oldPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="reset.addPassword"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePassWord = false" size="small"
          >取 消</el-button
        >
        <el-button type="primary" @click="onPassword" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTablesysUser,
  delTablesysUser,
  getsaveOrUpdateUser,
 // getOrgByDistrictPage, //获取组织
  getSysOrgController,
  getRoleAll, //获取角色
  resetPassword
} from "../../../api";
export default {
  data() {
    return {
      tableData: [
        //表格数据
      ],
      reset: {
        oldPassword: "",
        addPassword: "",
      },
      resetPasswordId: "",
      dialogVisiblePassWord: false,
      page: 1, //当前页
      pagenum: 10, //每页多少条
      pageCount: 1, //总数量
      titleName: "",
      modelType: "", //弹窗类型
      options: [],
      options2: [],
      input: "",
      userAddFrom: {
        loginName: "",
        password: "",
        realname: "",
        phone: "",
        orgName: "",
        role: "",
      },
      orgListId: "",
      roleListId: "",
      orgArr: [],
      roleArr: [],
      isPassword: true,
      noPassword: false,
      dialogVisible: false, //新增对话框
      tableDataName: "",
      arr:[],
      arr2:[],
      rules: {
        loginName: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        realname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        orgName: [
          { required: true, message: "请选择组织机构", trigger: "chang" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "chang" }],
      },
    };
  },
  created: function () {
    this.pageTable();
    this.getOrg();
    this.getRole();
  },
  methods: {
    pageTable() {
      getTablesysUser({
        start: this.page,
        length: 10,
        keyWord: this.tableDataName,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    onSearech() {
      getTablesysUser({
        start: 1,
        length: 10,
        keyWord: this.tableDataName,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    password(index, row) {
      this.resetPasswordId = row.id;
      this.dialogVisiblePassWord = true;
      this.reset.oldPassword = row.password;
    },
    onPassword() {
      resetPassword({
        id: this.resetPasswordId,
        password: this.reset.addPassword,
      }).then((res) => {
        this.$message({
          message: "添加成功",
          type: "success",
        });
      });
      this.dialogVisiblePassWord = false;
    },
    getOrgNameId(val) {
      this.$forceUpdate();
      this.orgListId = val;
    },
    getUserId(val) {
      this.roleListId = val;

      this.$forceUpdate();
    },
    getOrg() {
      getSysOrgController({
        id:0
      }).then((res) => {
        console.log(res);
        this.options = res.data.data;
      });
    },
    getRole() {
      getRoleAll().then((res) => {
        this.options2 = res.data.data;
      });
    },
    openAddDialog() {
      this.userAddFrom = {
        loginName: "",
        password: "",
        realname: "",
        phone: "",
        orgName: "",
        role: "",
      },
        this.dialogVisible = true;
      this.titleName = "新增";
      this.modelType = "add";
    },
    tableEdit(index, row) {
      console.log(row)
      this.dialogVisible = true;
      this.titleName = "编辑";
      this.modelType = "edit";
      this.userAddFrom = Object.assign({}, row);
     // let arr = "";
      for (var i = 0; i < row.orgList.length; i++) {
        this.arr = row.orgList[i].id;
      }
      console.log(this.arr);
      this.userAddFrom.orgName = this.arr;

      //let arr2 = "";
      for (var i = 0; i < row.roleList.length; i++) {
        //arr2.push(Number(row.roleList[i].id));
        this.arr2 = row.roleList[i].id;
      }

      this.userAddFrom.role = this.arr2;
    },
    onSubmit(userAddFrom) {
      if (this.modelType == "add") {
       // console.log(this.orgListId);
        // for (var i = 0; i < this.orgListId.length; i++) {
        //   this.orgArr.push({
        //     id: this.orgListId[i],
        //   });
        // }
        // this.orgArr.push({
        //   id: this.orgListId,
        // });
        // for (var i = 0; i < this.roleListId.length; i++) {
        //   this.roleArr.push({
        //     id: this.roleListId[i],
        //   });
        // }
        // this.roleArr.push({
        //   id: this.roleListId,
        // });
        this.$refs[userAddFrom].validate((valid) => {
          if (valid) {
            getsaveOrUpdateUser({
              id: this.userAddFrom.id,
              loginName: this.userAddFrom.loginName,
              password: this.userAddFrom.password,
              realname: this.userAddFrom.realname,
              phone: this.userAddFrom.phone,
              orgId: this.userAddFrom.orgName,
              roleId:this.userAddFrom.role,
            }).then((res) => {
              console.log(res);
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.dialogVisible = false;
              // this.orgArr = []
              // this.roleArr = []
              this.pageTable();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs[userAddFrom].validate((valid) => {
          if (valid) {
            // this.orgArr = [];
            // this.roleArr = [];
            // this.orgArr.push({
            //   id: this.orgListId,
            // });
            // for (var i = 0; i < this.roleListId.length; i++) {
            //   this.roleArr.push({
            //     id: this.roleListId[i],
            //   });
            // }
            // this.roleArr.push({
            //   id: this.roleListId,
            // });
            getsaveOrUpdateUser({
              id: this.userAddFrom.id,
              loginName: this.userAddFrom.loginName,
            //  password: this.userAddFrom.password,
              realname: this.userAddFrom.realname,
              phone: this.userAddFrom.phone,
             orgId: this.userAddFrom.orgName,
              roleId: this.userAddFrom.role,
            }).then((res) => {
              console.log(res);
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogVisible = false;
              //  this.orgArr = []
              // this.roleArr = []
              this.pageTable();
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    tableDel(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTablesysUser({
            id: row.id,
          }).then((res) => {
            this.pageTable();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!",
          });
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.pageTable();
    },
    closedialogVisible() {
      this.dialogVisible = false;
      this.$refs["userAddFrom"].clearValidate();
    },
    handleClose(done) {
      //详情弹框
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$refs["userAddFrom"].clearValidate();
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