<template>
  <div class="tianjiazh">
    <!-- 头部 -->
    <Tou></Tou>
    <!-- 主体 -->
    <el-main>
      <el-card class="box-card">
        <!-- 面板标题 -->
        <div slot="header" class="clearfix">
          <span>添加账号</span>
        </div>

        <el-form :model="tianjiazhForm" status-icon :rules="tianjiaDate" ref="tianjiazhForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="账号" prop="yonghuming">
            <el-input type="text" v-model="tianjiazhForm.yonghuming" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="mima">
            <el-input type="text" v-model="tianjiazhForm.mima" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="querenmima">
            <el-input type="text" v-model="tianjiazhForm.querenmima"></el-input>
          </el-form-item>

          <el-form-item label="用户组" prop="yonghuzu">
            <el-select v-model="tianjiazhForm.yonghuzu" placeholder="选择用户组" size="400px">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通用户" value="普通用户"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('tianjiazhForm')">添加</el-button>
            <el-button @click="resetForm('tianjiazhForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
    <!-- 尾部 -->
    <Wei></Wei>
  </div>
</template>
<script>
//引入axios依赖库
import qs from 'qs';
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
      } else if (value !== this.tianjiazhForm.mima) {
        // 一致性验证
        // 输出密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };
    return {
      tianjiazhForm: {
        yonghuming: "",
        mima: "",
        querenmima: "",
        yonghuzu:""
      },
      // 验证的字段
      tianjiaDate: {
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
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        querenmima: [
          { required: true, validator: confirmPwd, trigger: "blur" } // 非空验证
        ],
        yonghuzu: [
          { required: true, message: "请选择用户组", trigger: "change" } // 非空验证
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            yonghuming: this.tianjiazhForm.yonghuming,
            mima: this.tianjiazhForm.mima,
            yonghuzu: this.tianjiazhForm.yonghuzu
          }

          //发送ajax请求 发数据给后端
          this.axios.post("http://192.168.20.200:3000/users/tianjiazh",qs.stringify(params), {
              headers: { "Content-Type": "application/x-www-form-urlencoded" } // 设置请求头
            })
            .then(response => {
              if (response.data.rstCode === 1) {
                //弹出成功提示信息
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
                //跳转到账号挂历页面
                this.$router.push("/Zhanghaogl");
              } else {
                //弹出添加失败的信息
                this.$message.Error(response.data.msg)
              }
            });
        } else {
          console.log("前段验证不通过");
          return false;
        }
      });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.tianjiazh {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-form {
        width: 400px;
        .el-input__inner {
          width: 300px;
        }
      }
    }
  }
}
</style>


