<template>
  <div>
    <div class="mian-top">
      <div class>
        <el-button type="primary" @click="openAddDialog" size="small" class="z_top"  v-if="hasPerm('munuAdd')">新增</el-button>
      </div>
      <div class="search">
        <el-input v-model="tableDataName" placeholder="请输入搜索权限名称" style="width:240px"></el-input>
        <el-button type="primary" size="small" @click="onSearch" class="f_top">搜索</el-button>
      </div>
    </div>
    <div class="mian-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号">
          <template slot-scope="scope">
            <span>{{(page - 1) * pagenum + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限名称">
          <template slot-scope="scope">
            <span>{{ scope.row.menuName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限编码">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="父级Id">
          <template slot-scope="scope">
            <span>{{ scope.row.pname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <span>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column label="机构类型">
          <template slot-scope="scope">
            <span>{{ scope.row.isType == 0?'菜单':'按钮' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限链接">
          <template slot-scope="scope">
            <span>{{ scope.row.url }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdDate }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="hasPerm('munuEdit')"  @click="tableEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" v-if="hasPerm('munuDel')" @click="tableDel(scope.$index, scope.row)">删除</el-button>
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
          <el-form ref="roleAddFrom" :rules="rules" :model="roleAddFrom" label-width="80px">
            <el-form-item label="权限名称" prop="menuName">
              <el-input v-model="roleAddFrom.menuName"></el-input>
            </el-form-item>
            <el-form-item label="权限编码" prop="name">
              <el-input v-model="roleAddFrom.name"></el-input>
            </el-form-item>
            <el-form-item label="权限链接" prop="url">
              <el-input v-model="roleAddFrom.url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="roleAddFrom.sort"></el-input>
            </el-form-item>
            <el-form-item label="父级ID" prop="pname">
               <el-select v-model="roleAddFrom.pname" placeholder="请选择父级ID" @change="getSelectId">
                <el-option v-for="(item,index) in options" :key="index" :label="item.menuName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限类型" prop="isType">
              <!-- <el-radio-group v-model="roleAddFrom.resource">
                <el-radio label="1">菜单</el-radio>
                <el-radio label="2">按钮</el-radio>
              </el-radio-group>-->
              <el-select v-model="roleAddFrom.isType" placeholder="请选择权限类型">
                <el-option label="菜单" value="0"></el-option>
                <el-option label="按钮" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="closedialogVisible">取 消</el-button>
          <el-button type="primary" size="small" @click="onSubmit('roleAddFrom')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getTablesysMenu,
  delTablesysMenu,
  getsaveOrUpdateMenu,
  getTablesysMenuKeyWord,
  getParentId
} from "../../../api";
export default {
  data() {
    return {
      tableData: [
        //表格数据
      ],
      rules:{
        menuName: [
          { required: true, message: "请输入权限名字", trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入权限编码", trigger: "blur" }],
        url: [
          { required: true, message: "请输入url", trigger: "blur" },
        ],
        sort: [
          { required: true, message: "请输入排序", trigger: "blur" },
        ],
        pname:[
           { required: true, message: "请选择父级ID", trigger: "change" },
        ],
        isType:[
           { required: true, message: "请选择权限类型", trigger: "change" },
        ]
      },
      page: 1, //当前页
      pagenum: 10, //每页多少条
      pageCount: 1, //总数量
      titleName: "",
      modelType: "", //弹窗类型
      options:[],
      input: "",
      roleAddFrom: {
        menuName: "",
        name: "",
        url: "",
        pname:'',
        sort:'',
        isType:'',
      },
      dialogVisible: false, //新增对话框
      tableDataName: "",
      editId:'',
      selectId:''
    };
  },
  created: function () {
    this.pageTable();
    this.getDolidParentId()
  },
  methods: {
    pageTable() {
      getTablesysMenuKeyWord({
        start: this.page,
        length: 10,
         keyWord:this.tableDataName
      }).then((res) => {
    
        this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      });
    },
    getSelectId(val){
        this.selectId = val
    },
    getDolidParentId(){
      getParentId({
        isType:0
      }).then(res => {
        this.options = res.data.data
      })
    },
    onSearch(){
      getTablesysMenuKeyWord({
         start: 1,
        length: 10,
        keyWord:this.tableDataName
      }).then(res => {
         this.tableData = res.data.data;
        this.pageCount = Number(res.data.count);
      })
    },
    openAddDialog() {
      this.dialogVisible = true;
      this.titleName = "新增";
      this.modelType = "add";
    },
    tableEdit(index, row) {
      
      this.editId = row.id
      this.dialogVisible = true;
      this.titleName = "编辑";
      this.modelType = "edit";
      this.roleAddFrom = Object.assign({}, row);
      
    },
    onSubmit(roleAddFrom) {
      if (this.modelType == "add") {
        this.$refs[roleAddFrom].validate((valid) => {
          if (valid) {
            getsaveOrUpdateMenu({
          menuName: this.roleAddFrom.menuName,
          name:this.roleAddFrom.name,
          url: this.roleAddFrom.url,
          isType: this.roleAddFrom.isType,
           parentId:this.selectId,
          sort:this.roleAddFrom.sort
        }).then((res) => {
       
          this.$message({
            message: "添加成功",
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
        
      } else {
        this.$refs[roleAddFrom].validate((valid) => {
          if (valid) {
            getsaveOrUpdateMenu({
              id:this.editId,
           menuName: this.roleAddFrom.menuName,
          name:this.roleAddFrom.name,
          url: this.roleAddFrom.url,
          isType: this.roleAddFrom.isType,
          parentId:this.selectId,
          sort:this.roleAddFrom.sort
        }).then((res) => {
          
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.dialogVisible = false;
          this.pageTable();
        });
          } else {
           
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
          delTablesysMenu(row.id).then((res) => {
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