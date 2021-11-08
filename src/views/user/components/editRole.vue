<!--
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 15:26:05
 * @LastEditors: 郑钊宇
 * @Description: 
-->
<template>
  <div class="edit-role">
    <el-dialog
      title="修改权限"
      :visible.sync="isShow"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <el-form ref="form" :model="editRoleData" label-width="80px">
        <el-form-item label="权限">
          <el-select v-model="editRoleData.roleId" placeholder="请选择权限">
            <el-option
              v-for="(item, index) in roleData"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'EditRole',
  components: {},
  props: {
    roleData: {
      // 权限数据
      type: Array,
      default: () => []
    },
    editRoleData: {
      // 表格数据
      type: Object,
      required: true
    },
    isShow: {
      // 是否显示弹窗
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    // 点击关闭弹窗
    handleClose(done) {
      this.$emit('update:isShow', false)
    },
    // 点击提交
    onSubmit() {
      this.$emit('editRole')
    }
  }
}
</script>
<style lang="scss" scoped></style>
