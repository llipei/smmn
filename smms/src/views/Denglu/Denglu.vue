<template>
<div class="denglu">
        <!-- 登录容器 -->
        <div class="login-form">
            <!-- 标题 -->
            <h1 class="title">
                <i class="el-icon-setting"></i>
                华联超市系统登录
            </h1>
            <!-- 登录表单 -->
            <el-form :model="dengluForm" status-icon :rules="loginRules" ref="dengluForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="yonghuming">
                    <el-input type="text" v-model="dengluForm.yonghuming" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="mima">
                    <el-input type="text" v-model="dengluForm.mima" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="querenmima">
                    <el-input type="text" v-model="dengluForm.querenmima"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('dengluForm')">登录</el-button>
                    <el-button @click="resetForm('dengluForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
     
</template>
<script>
// 引入qs库 处理axios 的post方式的参数
        import qs from 'qs';
export default {   
  data() {
    // 自定义一个验证密码一致性的函数
    const confirmPwd = (rule, value, callback) => {
        // 非空验证
        if (value === '') {
            // 输出不能为空的提示
            callback(new Error('请再次输入密码'));
        } else if (value !== this.dengluForm.mima) { // 一致性验证
            // 输出密码不一致的回调
            callback(new Error('两次密码不一致'))
        } else {
            // 成功提示（绿色勾勾）
            callback()
        }
    }

    return {
      // 登录表单数据对象
      dengluForm: {
        yonghuming: "",
        mima: "",
        querenmima: ""
      },
      // 验证的字段   
      loginRules: {
        // 验证用户名
        yonghuming: [
            { required: true, message: '账号不能为空', trigger: 'blur' }, // 非空验证
            { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
        ],
        // 验证密码
        mima: [
            { required: true, message: '密码不能为空', trigger: 'blur' }, // 非空验证
            { min: 3, max: 6, message: '长度必须 3 到 6 个字符', trigger: 'blur' } // 长度验证
        ],
        // 验证确认密码 --- 自定义验证规则
        // validtor 配置选项的值 是一个函数 可以自己在这个函数里面验证
        querenmima: [
            { required: true, validator: confirmPwd, trigger: 'blur' }, // 非空验证
        ]
      }
    };
  },
  methods: {
    // 表单提交触发的函数
    submitForm(formName) {
      //  获取登录表单 
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
               yonghuming:this.dengluForm.yonghuming,
                     mima:this.dengluForm.mima
          }
          //允许携带cookie
            this.axios.defaults.withCredentials=true;
        //把用户名和密码一起发送给后端
        this.axios.post('http://127.0.0.1:3000/users/denglu',
         qs.stringify(params),
        { headers: {'Content-Type':'application/x-www-form-urlencoded'} }
        ).then(response=>{
            // 接收后端响应的数据 判断
              if (response.data.rstCode === 1) {
                // 成功 弹出登录成功的提示
                this.$message({
                  type: 'success',
                  message: response.data.msg
                });

                // 跳转到首页
                setTimeout(() => {
                  this.$router.push("/hindex");
                }, 500)
              } else {
                // 失败 弹出失败的提示
                this.$message.error(response.data.msg)
              }
        })         
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }

}
</script>
<style lang="less">
.denglu {
  background-color: #2d3a4b;
  height: 100%;
  .login-form {
    width: 500px;
    height: 350px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 7px;
    padding-right: 34px;
    // 居中
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    .title {
        text-align: center;
        color: #ffffff;
        font-size: 24px;
        margin-bottom: 30px;
    }
    .el-form {
       .el-form-item {
           .el-form-item__label {
               color: #ffffff;
           }
       }
    }
  }
}
</style>
