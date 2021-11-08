<!--
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 15:26:50
 * @LastEditors: 郑钊宇
 * @Description: 
-->
<template>
  <div class="user-new-dialog">
    <el-dialog
      title="新增用户"
      :visible.sync="isShow"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <UserForm :form="newUser" operation="new" @onSubmit="onSubmit" @handleClose="handleClose" />
    </el-dialog>
  </div>
</template>
<script>
import UserForm from './userForm'
export default {
  name: 'UserNewDialog',
  components: {
    UserForm
  },
  props: {
    isShow: { // 是否显示弹窗
      type: Boolean,
      default: false
    },
    editUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newUser: {}
    }
  },
  created() {},
  mounted() {},
  methods: {

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('handleClose')
          done()
        })
        .catch(_ => {})
    },

    onSubmit(data) {
      this.$emit('onSubmit', data)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
