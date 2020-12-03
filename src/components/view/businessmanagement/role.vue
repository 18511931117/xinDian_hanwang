<template>
  <div>
    <div class="mian-top">
      <div class>
        <el-button
          type="primary"
          @click="openAddDialog"
          size="small"
          class="z_top"
          v-if="hasPerm('roleAdd')"
          >新增</el-button
        >
      </div>
      <div class="search">
        <el-input
          v-model="tableDataName"
          placeholder="请输入搜索内容"
          style="width: 240px"
        ></el-input>
        <el-button type="primary" size="small" @click="onSearch" class="f_top"
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
        <el-table-column label="角色名称">
          <template slot-scope="scope">
            <span>{{ scope.row.roleName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编码">
          <template slot-scope="scope">
            <span>{{ scope.row.roleCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色描述">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>
              <!-- {{ scope.row.status }} -->
              {{ scope.row.status === "启用" ? "启用" : "禁用" }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdDate }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              v-if="hasPerm('roleEdit')"
              @click="tableEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="hasPerm('roleDel')"
              @click="tableDel(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
              
              v-if="scope.row.isDel == 0"
              @click="isDisableStates(scope.$index, scope.row)"
              >禁用</el-button
            >
            <el-button
              type="text"
              size="small"
              v-if="scope.row.isDel == 1"
              @click="isDisableStates(scope.$index, scope.row)"
              >启用</el-button
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
            ref="roleAddFrom"
            :rules="rules"
            :model="roleAddFrom"
            label-width="80px"
          >
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="roleAddFrom.roleName"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="roleCode">
              <el-input v-model="roleAddFrom.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="roleAddFrom.description"></el-input>
            </el-form-item>
            <el-form-item label="角色菜单" prop="description">
              <el-tree
                :data="data"
                show-checkbox
                v-model="roleAddFrom.menuIds"
                :default-expand-all="defaultIsall"
                node-key="id"
                check-strictly
                ref="tree"
                highlight-current
                :props="defaultProps"
              ></el-tree>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="closedialogVisible">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="onSubmit('roleAddFrom')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getTablesysRole,
  delTablesysRole,
  getlockOrUnlockRole,
  getsaveOrUpdateRole,
  rolePagesByKeyWord,
  getTree,
} from "../../../api";
export default {
  data() {
    return {
      tableData: [
        //表格数据
      ],
      page: 1, //当前页
      pagenum: 10, //每页多少条
      pageCount: 1, //总数量
      titleName: "",
      modelType: "", //弹窗类型

      roleAddFrom: {
        roleName: "",
        roleCode: "",
        description: "",
        menuIds: "",
        status: "",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名字", trigger: "blur" },
        ],
        roleCode: [{ required: true, message: "请输入编码", trigger: "blur" }],
        description: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
        ],
      },
      input: "",
      dialogVisible: false, //新增对话框
      tableDataName: "",
      editID: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      defaultIsall: false,
    };
  },
  created: function () {
    this.pageTable();
    this.getTableTree();
  },
  methods: {
    pageTable() {
      rolePagesByKeyWord({
        start: this.page,
        length: 10,
        keyWord: this.tableDataName,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    onSearch() {
      rolePagesByKeyWord({
        start: 1,
        length: 10,
        keyWord: this.tableDataName,
      }).then((res) => {
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    getTableTree() {
      getTree({
        id: "7485564315982888965",
      }).then((res) => {
        this.data = res.data.data;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.pageTable();
    },
    tableDel(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delTablesysRole(row.id).then((res) => {
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
    isDisableStates(index, row) {
      //是否禁用状态
      if (row.isDel == 1) {
        row.isDel = 0;
      } else {
        row.isDel = 1;
      }
      getlockOrUnlockRole({
        id: row.id,
        isDel: row.isDel,
      }).then((res) => {
        this.pageTable();
      });
    },
    openAddDialog() {
      //打开新增窗口

      (this.roleAddFrom = {
        roleName: "",
        roleCode: "",
        description: "",
      }),
        (this.dialogVisible = true);
      this.titleName = "新增";
      this.modelType = "add";
    },
    tableEdit(index, row) {
     
      
      //  console.log( this.$refs.tree.setCheckedKeys())
        var menuListId = [];
        for (var i = 0; i < row.menuList.length; i++) {
          menuListId.push(row.menuList[i].id);
          
        }
        setTimeout(() => {
           
          this.$refs.tree.setCheckedKeys(menuListId,false,true);
        //  this.$refs.tree.getHalfCheckedKeys(menuListId)
        },100)
          

      //
      this.editID = row.id;
      this.dialogVisible = true;
      this.titleName = "编辑";
      this.modelType = "edit";
      this.roleAddFrom = Object.assign({}, row);
    },
    onSubmit(roleAddFrom) {
      var menuts = this.$refs.tree.getCheckedKeys();
      let hafCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
     var newArr = menuts.concat(hafCheckedKeys)
     console.log(newArr)
      var menutsArr = [];
      for (var i = 0; i < newArr.length; i++) {
        menutsArr.push({
          id: newArr[i],
        });
      }
      console.log(menutsArr)
      if (this.modelType == "add") {
        this.$refs[roleAddFrom].validate((valid) => {
          if (valid) {
            getsaveOrUpdateRole({
              roleCode: this.roleAddFrom.roleCode,
              roleName: this.roleAddFrom.roleName,
              description: this.roleAddFrom.description,
              menuList: menutsArr,
            }).then((res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.dialogVisible = false;
              this.pageTable();
            });
          } else {
            return false;
          }
        });
      } else {
        this.$refs[roleAddFrom].validate((valid) => {
          if (valid) {
            getsaveOrUpdateRole({
              id: this.editID,
              roleCode: this.roleAddFrom.roleCode,
              roleName: this.roleAddFrom.roleName,
              description: this.roleAddFrom.description,
              menuList: menutsArr,
            }).then((res) => {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.dialogVisible = false;
              this.pageTable();
            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      }
    },
    closedialogVisible() {
      this.$refs["roleAddFrom"].clearValidate();
      this.dialogVisible = false;
    },
    handleClose(done) {
      //详情弹框
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$refs["roleAddFrom"].clearValidate();
          done();
        })
        .catch((_) => {});
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