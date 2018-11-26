<template>
  <div class="zhanghaogl">
    <!-- 头部 -->
    <Tou></Tou>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>账号管理</span>
        </div>
        <!-- 面板内容 -->
        <div class="text item">
          <!-- 表格 -->
          <el-row :gutter="20">
            <div class="text item">
              <!-- 表格 -->
              <el-dialog title="修改用户" :visible.sync="dialogFormVisible" width="24%">
                <!-- 修改用户表单 -->
                <el-form :model="zhanghaogl" status-icon :rules="rules" ref="zhanghaogl" label-width="100px" class="demo-ruleForm">
                  <!-- 账号 -->
                  <el-form-item label="账号" prop="yonghuming">
                    <el-input type="text" v-model="zhanghaogl.yonghuming" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- 密码 -->
                  <el-form-item label="密码" prop="mima">
                    <el-input type="text" v-model="zhanghaogl.mima" autocomplete="off"></el-input>
                  </el-form-item>
                  <!-- 用户组 -->
                  <el-form-item label="选择用户组" prop="yonghuzu">
                    <el-select v-model="zhanghaogl.yonghuzu" placeholder="------------------请选择用户组------------------">
                      <el-option label="超级管理员" value="超级管理员"></el-option>
                      <el-option label="普通用户" value="普通用户"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm('zhanghaogl')">确 定</el-button>
                </div>
              </el-dialog>
              <el-table :data="tableData" style="width: 100%" ref="userlist" @selection-change="handleSelectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column prop="yonghuming" label="用户名称">
                </el-table-column>
                <el-table-column prop="yonghuzu" label="用户组">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                      <i class="el-icon-edit"></i>修改</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                      <i class="el-icon-delete"></i>删除</el-button>
                  </template>
                </el-table-column>

              </el-table>

              <div style="margin-top: 20px">
                <el-pagination @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" :page-sizes="[1, 3, 5, 10, 20, 50]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" 
                :total="totalCount">
                </el-pagination>
              </div>

              <div style="margin-top: 20px">
                <el-button @click="batchdel">批量删除</el-button>
                <el-button @click="toggleSelection">取消选择</el-button>
              </div>
            </div>
          </el-row>
        </div>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Wei></Wei>
  </div>
</template>
<script>
import qs from "qs";
// 引入头部组件 和 尾部组件
import Tou from "@/components/Tou/Tou.vue";
import Wei from "@/components/Wei/Wei.vue";
export default {
  // 注册组件
  components: {
    Tou,
    Wei
  },
  data() {
    return {
      totalCount: 11, // 数据总条数
      currentPage: 1, // 当前页
      pageSize: 3, // 默认每页显示3条
      dialogFormVisible: false, // 控制修改模态框的显示和隐藏的变量
      tableData: [],
      editId: "", // 保存要修改的数据的id
      seletedUser: [], // 保存选中的用户数据
      // 和修改表单双向绑定的数据
      zhanghaogl: {
        yonghuming: "",
        mima: "",
        yonghuzu: ""
      },
      // 验证的字段 修改表单的验证规则
      rules: {
        // 验证用户名
        yonghuming: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证密码
        mima: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证用户组
        yonghuzu: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空验证
        ]
      }
    };
  },
  methods: {
    // 当页面尺寸(每页显示多少条)改变 就触发这个函数 传入当前页面尺寸
    handleSizeChange(val) {
      // 重置pageSize 的值
      this.pageSize = val;
      // 调用获取数据的函数
      this.getUserListByPage();
    },
    // 当页码改变 就会触发这个函数 传入当前页码
    handleCurrentChange(val) {
      // 重置当前页码 
      this.currentPage = val;
      // 调用获取数据的函数
      this.getUserListByPage();
    },
    //修改信息函数
    handleEdit(id) {
      this.editId = id;

      //发送ajax请求
      this.axios
        .get(`http://127.0.0.1:3000/users/xiugaiyh?id=${id}`)
        .then(response => {
          this.zhanghaogl.yonghuming = response.data[0].yonghuming;
          this.zhanghaogl.mima = response.data[0].mima;
          this.zhanghaogl.yonghuzu = response.data[0].yonghuzu;
          //回填好数据后再弹出提示框
          this.dialogFormVisible = true;
        });
    },
    //删除的函数
    handleDelete(id) {
      this.axios
        .get(`http://127.0.0.1:3000/users/shanchuyh?id=${id}`)
        .then(response => {
          if (response.data.rstCode === 1) {
            //弹出删除成功提示
            this.$message({
              type: "success",
              message: response.data.msg
            });

            this.getUserListByPage();
          } else {
            this.$message.error(response.data.msg);
          }
        });
    },
    toggleSelection() {
      // 取消选择
      this.$refs.userlist.clearSelection();
    },
    handleSelectionChange(val) {
      // 把选中的数据 保存到一个变量里面
      this.seletedUser = val;
    },
    batchdel() {
      //取出需要删除的id数组
      let idArr = this.seletedUser.map(v => v.id);
      // 判断 如果没有选中任何数据 那么就弹出请选择以后再操作 直接返回
      if (!idArr.length) {
        this.$message.error("请选择以后再操作!!!");
        return;
      }
      // 收集参数
      let param = {
        idArr: JSON.stringify(idArr) // 把数组转为字符串
      };
      // 发送ajax请求 把这个id数组发送给后端
      this.axios
        .post("http://127.0.0.1:3000/users/piliangsc", qs.stringify(param), {
          Header: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => {
          // 接收后端响应的数据 根据结果判断
          if (response.data.rstCode === 1) {
            // 成功 弹出批量删除成功的提示
            this.$message({
              type: "success",
              message: response.data.msg
            });

            // 刷新页面（重新获取一下最新数据）
            this.getUserListByPage();
          } else {
            // 失败 弹出错误信息
            this.$message.error(response.data.msg);
          }
        });
    },
    // yonghuliebiao() {
    //   this.axios.get("http://127.0.0.1:3000/users/yonghulb").then(response => {
    //     this.tableData = response.data;
    //   });
    // },

    // 按照分页请求数据
     getUserListByPage() {
      // 获取当前页码
      let currentPage = this.currentPage;
      // 获取当前页面尺寸pageSize(每页显示多少条)
      let pageSize = this.pageSize

      // 发送ajax请求 按照分页请求数据
      this.axios
        .get(`http://127.0.0.1:3000/users/fenye?currentPage=${currentPage}&pageSize=${pageSize}`)
        .then(response => {

          // 把后端返回的对应页码的数据 赋值给 tableData
          this.tableData = response.data.data;
          // 把后端返回的数据总调数据 赋值 给 tatalCount
          this.totalCount = response.data.totalCount;

          // 如果当前页码 没有数据 且 不是第一页
          if (!response.data.data.length && this.currentPage !== 1) {
            // 当前页码减去 1 
            this.currentPage -= 1;
            // 再次调用自己
            this.getUserListByPage();
          }
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            yonghuming: this.zhanghaogl.yonghuming,
            mima: this.zhanghaogl.mima,
            yonghuzu: this.zhanghaogl.yonghuzu,
            editId: this.editId
          };
          //发送ajax请求把修改后的数据和原来的id一起发给后台
          this.axios
            .post(
              "http://127.0.0.1:3000/users/baocunxg",
              qs.stringify(params),
              {
                Header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              }
            )
            .then(response => {
              //根据后端响应的数据判断
              if (response.data.rstCode === 1) {
                //成功提示
                this.$message({
                  type: "success",
                  message: response.data.msg
                });

                this.getUserListByPage();
              } else {
                this.$message.error(response.data.msg);
              }
            });
          //关闭模态框
          this.dialogFormVisible = false;
        } else {
          console.log("验证没通过，不能发送");
          return false;
        }
      });
    }
  },
  created() {
    // this.yonghuliebiao();
    this.getUserListByPage();
  }
};
</script>
<style lang="less">
.zhanghaogl {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-dialog {
        .el-form {
          .el-select {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


