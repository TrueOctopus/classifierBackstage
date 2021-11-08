<!--
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 15:26:02
 * @LastEditors: 郑钊宇
 * @Description: 
-->

<template>
  <div class="hand-serch">
    <el-form ref="headForm" :model="value" label-width="80px" :inline="true">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="value.username" placeholder="请输入用户名" clearable />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="value.sex" placeholder="请选择性别" clearable>
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="value.email" placeholder="请输入邮箱" clearable />
      </el-form-item>
      <el-form-item label="手机号" prop="phone_num">
        <el-input v-model="value.phone_num" placeholder="请输入手机号" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="onSerch">搜索</el-button>
        <el-button type="info" @click="handleNew">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'HandSerch',
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {

    onSerch() {
      this.$emit('onSerch')
    },

    handleReset() {
      this.$refs['headForm'].resetFields()
      this.$emit('handleReset')
    },

    handleNew() {
      this.$emit('handleNew')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
