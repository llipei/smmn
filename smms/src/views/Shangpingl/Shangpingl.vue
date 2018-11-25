<template>
  <div class="shangpingl">
    <!-- 头部 -->
    <Tou></Tou>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>商品管理</span>
        </div>

        <el-form :inline="true" :model="shangpingl" class="demo-form-inline">

          <el-form-item label="">
            <el-select v-model="shangpingl.region" placeholder="----------选择分类----------">
              <el-option label="上海" value="shanghai"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关键字：">
            <el-input v-model="shangpingl.user" placeholder=""></el-input>
          </el-form-item>

          <el-form-item>
            （商品名称，条形码）
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-row :gutter="20">
        <div class="text item">
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="yonghuming" label="商品条形码">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="商品名称">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="所属分类">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="售价（元）">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="促销价（元）">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="市场价（元）">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="库存">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="库存总额（元）">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="库存总额（元）">
            </el-table-column>
            <el-table-column prop="yonghuzu" label="促销总额（元）">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
                  <i class="el-icon-edit"></i>修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                  <i class="el-icon-delete"></i>删除</el-button>
              </template>
            </el-table-column>

            <div class="block">
              <span class="demonstration">页数较少时的效果</span>
              <el-pagination layout="prev, pager, next" :total="50">
              </el-pagination>
            </div>

          </el-table>
        </div>
      </el-row>
    </el-main>
    <!-- 尾部 -->
    <Wei></Wei>
  </div>
</template>
<script>
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
    // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
      // 非空验证
      if (value === "") {
        // 输出不能为空的提示
        callback(new Error("请再次输入密码"));
      } else if (value !== this.shangpingl.password) {
        // 一致性验证
        // 输出密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };
    return {
      shangpingl: {
        username: "",
        password: "",
        checkPwd: ""
      },
      // 验证的字段
      loginRules: {
        // 验证用户名
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        checkPwd: [
          { required: true, validator: confirmPwd, trigger: "blur" } // 非空验证
        ]
      }
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>
<style lang="less">
.shangpingl {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-form {
        // .el-input__inner {

        // }
        .el-form-item {
          margin: 0px;
          padding: 0px;
        }
      }
    }
  }
}
</style>


