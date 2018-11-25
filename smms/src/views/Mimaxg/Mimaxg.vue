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


                <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">

                        <el-form-item label="原密码" prop="username">
                            <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="新密码" prop="password">
                            <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="确认密码" prop="checkPwd">
                            <el-input type="text" v-model="loginForm.checkPwd"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm('loginForm')">修改</el-button>
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
      // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
        // 非空验证
        if (value === '') {
            // 输出不能为空的提示
            callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.password) { // 一致性验证
            // 输出密码不一致的回调
            callback(new Error('两次密码不一致'))
        } else {
            // 成功提示（绿色勾勾）
            callback()
        }
    }
    return {
          loginForm: {
        username: "",
        password: "",
        checkPwd: ""
      },
      // 验证的字段   
      loginRules: {
        // 验证用户名
        username: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }, // 非空验证
            { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
        ],
        // 验证密码
        password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }, // 非空验证
            { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
        ],
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        checkPwd: [
            { required: true, validator: confirmPwd, trigger: 'blur' }, // 非空验证
        ]
      }
    };
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
    .el-card{
        .el-form{
            width: 400px;
        }
    }
  }

}
</style>


