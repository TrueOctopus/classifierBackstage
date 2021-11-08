
<template>
  <div class="test">
    <button @click="sendAjax2">发请求</button>
    <input
      ref="file"
      type="file"
      accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
      multiple="multiple"
      @change="getFiles"
    >
    <img ref="img" :src="res.profile_photo" alt="">
    <button @click="register">注册</button>
  </div>
</template>
<script>
import request from '@/utils/request'
import loginApi from '@/api/python/login'
export default {
  name: 'Test',
  components: {},
  props: {},
  data() {
    return {
      data: {
        email: '18368876370@163.com',
        username: '11',
        name: '11',
        sex: 1,
        grade: '11',
        college: '11',
        major: '11',
        student_num: '11',
        phone_num: '11',
        about_me: '11',
        profile_photo: ''
      },
      res: {}
    }
  },
  created() {},
  mounted() {
    this.getDate()
  },
  methods: {
    register() {
      loginApi.register('18368876370@163.com', '123456', '郑钊宇').then(res => {
        console.log('res', res)
      })
    },
    getFiles() {
      console.log('asdf')
      var file = this.$refs.file.files[0] // 使用ref属性，获取input file值
      var reader = new FileReader() // 创建FileReader对象
      reader.readAsDataURL(file) // 给FileReader对象设置数据
      var _this = this // 使用_this代替this，防止再function函数中this作用域改变，调用不到vue对象
      reader.onload = function(e) { // 执行FileReader的onload     参数e为读取的文件
        _this.data.profile_photo = e.target.result // 给this.data.profile_photo赋值   e.target.reault为图片base64
        console.log('asdf', e.target.result)
        _this.sendAjax2()
      }
    },

    sendAjax2() {
      console.log(this.data)
      request({
        url: 'http://api.hguxgkx.com/api/v1/posts/uploadProfile',
        method: 'post',
        headers: {
          // 'Content-Type': 'multipart/form-data'
          'Content-Type': 'application/json'
        },
        data: this.data
      }).then((res) => {
        console.log(res)
        this.res = res
      })
    },

    getDate() {
      request({
        url: 'http://api.hguxgkx.com/api/v1/gets/getById/1',
        method: 'get'
      }).then(res => {
        this.res = res
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
