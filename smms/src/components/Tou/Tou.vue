<template>
    <div class="header">
        <el-header>
            <h1 class="title">
                <i class="el-icon-menu"></i>                
                华联超市管理系统
            </h1>
            <!-- 当前登录用户名 -->
            <div class="dangqianyh">
                <!-- 下拉框 -->
                <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                    {{ dangqianyh }} <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="gerenzx">个人中心</el-dropdown-item>
                        <el-dropdown-item command="tuichu">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="avatar">
                    <img style="border-radius: 50%;" width="50px" height="50px" src="./avatar.jpg" alt="">
                </div>
            </div>
        </el-header>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dangqianyh:''  
        }
    },
    methods:{
        handleCommand (command) {
            //判断点击的是退出还是个人中心
            if(command === "gerenzx"){
                // this.$router.push('/gerenzx')
            }else if(command === "tuichu"){
                // 发送ajax请求 给后端
                this.axios.get('http://127.0.0.1:3000/users/tuichu')
                .then(response=>{
                    if(response.data.rstCode === 1){
                        // 弹出提示信息
                        this.$message({
                              type: 'success',
                              message: response.data.msg
                          })
                          setTimeout(()=>{
                              this.$router.push('/')
                          },1000)
                    }
                })
            }
        }
    },
    created(){
        this.axios.get('http://127.0.0.1:3000/users/yonghumingdq')
        .then(response=>{
            this.dangqianyh = response.data;
        })
    }
}
</script>
<style lang="less">
    .header {
        // 头
       .el-header {
           position: relative;
           height: 60px;
           line-height: 60px;
           background-color: #ffffff;
           text-align: right;
           border-bottom: 1px solid rgba(0, 0, 0, 0.1);
           .title {
               margin: 0;
               position: absolute;
               height: 60px;
               line-height: 60px;
           }
           .dangqianyh {
               vertical-align: top;
               display: inline-block;
               height: 60px;
               line-height: 60px;
               margin-right: 20px;
               .avatar {
                   vertical-align: top;
                   display: inline-block;
                   margin-top: 5px;
                   margin-left: 10px;
                   height: 50px;
                   line-height: 50px;
                   border-radius: 50%;
                   text-align: center;
               }
           }
       }
    }
</style>

