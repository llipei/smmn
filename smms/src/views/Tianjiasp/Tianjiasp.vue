<template>
    <div class="tianjiasp">
        <Tou></Tou>
        <el-form :inline="true" :model="tianjiasp" class="demo-form-inline">
            
            <el-form-item label="所属分类:">
                <el-select v-model="tianjiasp.region" placeholder="----------选择分类----------">
                    <el-option label="厨房用品" value="shanghai"></el-option>
                    <el-option label="清洁用具" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品条形码:">
                <el-input v-model="tianjiasp.user" placeholder="商品条形码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">生成条形码</el-button>
            </el-form-item>

            <el-form-item label="商品名称:">
                <el-input v-model="tianjiasp.user" placeholder="商品名称"></el-input>
            </el-form-item>

            <el-form-item label="商品售价:">
                <el-input v-model="tianjiasp.user" placeholder="商品售价"></el-input>
            </el-form-item>
            <el-form-item label="">
                元
            </el-form-item>

            <el-form-item label="市场价:">
                <el-input v-model="tianjiasp.user" placeholder="市场价"></el-input>
            </el-form-item>
            <el-form-item label="">
                元
            </el-form-item>

            <el-form-item label="商品进价:">
                <el-input v-model="tianjiasp.user" placeholder="商品进价"></el-input>
            </el-form-item>
            <el-form-item label="">
                元
            </el-form-item>

             <el-form-item label="入库数量:">
                <el-input v-model="tianjiasp.user" placeholder="入库数量"></el-input>
            </el-form-item>

             <el-form-item label="商品重量:">
                <el-input v-model="tianjiasp.user" placeholder="商品重量"></el-input>
            </el-form-item>

             <el-form-item label="商品单位:">
                <el-input v-model="tianjiasp.user" placeholder="商品单位"></el-input>
            </el-form-item>

             <el-form-item label="会员优惠:">
                <el-radio v-model="radio" label="1">享受</el-radio>
                <el-radio v-model="radio" label="2">不享受</el-radio>
            </el-form-item>
            <br>
             <el-form-item label="是否促销:">
                <el-radio v-model="radio" label="1">启用</el-radio>
                <el-radio v-model="radio" label="2">禁用</el-radio>
            </el-form-item>

             <el-form-item label="商品简介:">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <br>
             <el-form-item label="">
                <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
        </el-form>
        <Wei></Wei>
    </div>
</template>
<script>
import Tou from "@/components/Tou/Tou.vue";
import Wei from "@/components/Wei/Wei.vue";
export default {
  components: {
    Tou,
    Wei
  },
   data() {
       return {
      tianjiasp: {
        yonghuming: "",
        mima: "",
        querenmima: "",
        yonghuzu:""
      },
      // 验证的字段
      tianjiaDate: {
        
      }
    };
   },
    methods:{
      onSubmit(){}
  },
  
};
</script>
<style lang="less">
.tianjiasp {
  width: 100%;
  display: flex;
  flex-direction: column;
  .el-form{
      width: 500px;
      margin-top: 20px;
  }
}
</style>
