<template>
    <div class="mimaxg">
        <!-- 头部 -->
        <Tou></Tou>
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>密码修改</span>
                </div>

                <el-form :model="xiugaimima" status-icon :rules="loginRules" ref="xiugaimima" label-width="100px" class="demo-ruleForm">

                    <el-form-item label="原密码" prop="jiumima">
                        <el-input type="text" v-model="xiugaimima.jiumima" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="xinmima">
                        <el-input type="text" v-model="xiugaimima.xinmima" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="querenmima">
                        <el-input type="text" v-model="xiugaimima.querenmima"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('xiugaimima')">修改</el-button>
                    </el-form-item>

                </el-form>
            </el-card>
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
    //验证旧密码是否正确 的函数
    const checkOldPwd = (rule, value, callback) => {
      this.axios
        .get(`http://127.0.0.1:3000/users/yanzhengjmm?jiumima=${value}`)
        .then(response => {
          // 如果正确 那么通过 直接绿色勾勾
          if (response.data.rstCode === 1) {
            //验证通过直接调用
            callback();
          } else if (response.data.rstCode === 0) {
            //否则 就是旧密码不正确
            callback(new Error(response.data.msg));
          }
        });
    };
    // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
      // 非空验证
      if (value === "") {
        // 输出不能为空的提示
        callback(new Error("请再次输入密码"));
      } else if (value !== this.xiugaimima.xinmima) {
        // 一致性验证
        // 输出密码不一致的回调
        callback(new Error("两次密码不一致"));
      } else {
        // 成功提示（绿色勾勾）
        callback();
      }
    };
    return {
      xiugaimima: {
        jiumima: "",
        xinmima: "",
        querenmima: ""
      },
      // 验证的字段
      loginRules: {
        // 验证用户名
        jiumima: [
          { required: true, message: "请输入旧密码", trigger: "blur" }, // 非空验证
          { required: true, validator: checkOldPwd, trigger: "blur" }
        ],
        // 验证密码
        xinmima: [
          { required: true, message: "新密码不能为空", trigger: "blur" }, // 非空验证
          { min: 3, max: 6, message: "长度必须 3 到 6 个字符", trigger: "blur" } // 长度验证
        ],
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        querenmima: [
          { required: true, validator: confirmPwd, trigger: "blur" } // 非空验证
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .get(
              `http://127.0.0.1:3000/users/xiugaimm?xinmima=${
                this.xiugaimima.xinmima
              }`
            )
            .then(response => {
              //接收后端响应的数据 判断
              if (response.data.rstCode === 1) {
                //成功提示
                this.$message({
                  type: "success",
                  message: response.data.msg
                });
                //跳转到登录页面
                setTimeout(() => {
                  this.$router.push("/");
                }, 1000);
              } else {
                //弹出失败提示
                this.$message.error(response.data.msg);
              }
            });
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    },
    //重置表单出发的函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.mimaxg {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-form {
        width: 400px;
      }
    }
  }
}
</style>


