
<template>
  <div class="user-form">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      :hide-required-asterisk="true"
      :status-icon="true"
      :validate-on-rule-change="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="id">
            <el-input v-model="form.id" :disabled="true" clearable style="width:100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" clearable :disabled="operation === 'edit'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" clearable :disabled="operation === 'edit'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="电话" prop="phone_num">
            <el-input v-model="form.phone_num" clearable />
          </el-form-item>
        </el-col><el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="单位" prop="unit">
            <el-input v-model="form.unit" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item v-if="operation === 'edit'" label="地址" prop="address">
            <el-input v-model="form.address" clearable />
          </el-form-item>
        </el-col>
        

        <el-col :span="12">
          <el-form-item v-if="operation === 'new'" label="密码">
            <el-input v-model="form.password" type="password" autosize placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        
        <el-col :span="24">
          <el-form-item>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import USER_CONST from '@/constant/user-const'
export default {
  name: 'UserForm',
  components: {},
  filters: {
    // img: (value) => {
    //   return (value.indexOf('data:image') >= 0) ? value : 'http://api.hguxgkx.com/api/v1/gets/getImgs/' + value
    // }
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    operation: {
      type: String,
      required: true
    }
  },
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        // if (this.operation === 'edit') {
        //   callback()
        // } else {
        //   UserApi.checkUsername(value).then((res) => {
        //     console.log('res: ', res)
        //     if (res.code === -1) {
        //       callback(new Error('用户名已存在'))
        //     } else {
        //       callback()
        //     }
        //   })
        // }
        callback()
      }
    }
    return {
      data: {}, // 表单数据
      rules: {
        // 表单验证规则
        username: [{ validator: checkUsername, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        passwordHash: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {

    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          return false
        }
      })
    },

    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>
<style lang="scss" scoped></style>
