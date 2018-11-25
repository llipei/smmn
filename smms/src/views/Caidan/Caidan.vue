<template>
    <div class="home">
        <!-- 头部 -->
        <Tou></Tou>
        <!-- 主体 -->
        <el-main>
            <el-card class="box-card">
                <!-- 面板标题 -->
                <div slot="header" class="clearfix">
                    <span>系统信息</span>
                </div>
                <!-- 面板内容 -->
                <div class="text item">
                    <el-alert
                        title="消息提示的文案"
                        type="info">
                    </el-alert>
                   <el-alert
                        title="成功提示的文案"
                        type="success">
                    </el-alert>
                    <!-- 表格 -->
                    <el-row :gutter="20">
                        <el-col :span="12">
                           <!-- 左侧表格 -->
                           <el-card>
                                <!-- 面板标题 -->
                                <div slot="header" class="clearfix">
                                    <span>销售排行</span>
                                </div>
                                <div class="text item">
                                    <!-- 表格 -->
                                    <el-table
                                        :data="tableDataLeft"
                                        style="width: 100%">
                                        <el-table-column
                                            prop="goodsname"
                                            label="商品名称"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="sales"
                                            label="销量">
                                        </el-table-column>
                                    </el-table>
                                </div>
                           </el-card>
                        </el-col>
                        <el-col :span="12">
                            <!-- 右侧表格 -->
                           <el-card>
                                <!-- 面板标题 -->
                                <div slot="header" class="clearfix">
                                    <span>缺货的商品</span>
                                </div>
                                <div class="text item">
                                    <!-- 表格 -->
                                    <el-table
                                        :data="tableDataRight"
                                        style="width: 100%">
                                        <el-table-column
                                            prop="goodsname"
                                            label="商品名称"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="repertoryCount"
                                            label="库存"
                                            >
                                        </el-table-column>
                                        <el-table-column
                                            prop="option"
                                            label="操作">
                                        </el-table-column>
                                           
                                    </el-table>
                                </div>
                           </el-card>
                        </el-col>
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
      // 左侧表格数据
      tableDataLeft: [
        {
          goodsname: "蒂花之秀",
          sales: 100
        },
        {
          goodsname: "海飞丝",
          sales: 105
        },
        {
          goodsname: "曼秀雷敦",
          sales: 107
        },
        {
          goodsname: "辣条",
          sales: 500
        }
      ],
      tableDataRight: [
        {
          goodsname: "海飞丝",
          repertoryCount: 1000,
          option: '入库'
        },
        {
          goodsname: "蒂花之秀",
          repertoryCount: 5,
          option: '入库'
        },
        {
          goodsname: "曼秀雷敦",
          repertoryCount: 5,
          option: '入库'
        },
        {
          goodsname: "辣条",
          repertoryCount: 5,
          option: '入库'
        }
      ]
    };
  }
};
</script>
<style lang="less">
.home {
  width: 100%;
  display: flex; // 让这个盒子 变为一个可以伸缩的盒子
  flex-direction: column; // 方向是 纵向
  // 主体
  .el-main {
    flex: 1; // 自动增长 撑满
    .el-card {
      .el-card__header {
        font-weight: 700;
        font-size: 15px;
        background-color: #f1f1f1;
      }
      .el-card__body {
        .item {
          .el-alert {
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>


