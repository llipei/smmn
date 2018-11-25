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
                            <el-table :data="tableData" style="width: 100%">
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
                                <div style="margin-top: 20px">
                                    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                                    <el-button @click="toggleSelection()">取消选择</el-button>
                                </div>
                            </el-table>
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
      tableData: []
    };
  },
  methods: {
    //修改信息函数
    handleEdit(id) {
      console.log("你想要修改?" + id);
    },
    //删除的函数
    handleDelete(id) {
        this.axios.get(`http://192.168.20.200:3000/users/shanchuyh?id=${id}`)
        .then(response=>{
            if(response.data.rstCode === 1){
                //弹出删除成功提示
                this.$message({
                    type:"success",
                    message:response.data.msg
                });

                this.yonghuliebiao();
            }else{
                this.$message.error(response.data.msg)    
            }
        })
    },
    yonghuliebiao(){
       this.axios.get('http://192.168.20.200:3000/users/yonghulb')
        .then(response=>{
            this.tableData = response.data;
        })   
     }
    },
     created(){
         this.yonghuliebiao();
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
  }
}
</style>


