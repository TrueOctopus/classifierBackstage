
import request from '@/utils/request'

export default {

  login(email, password) {
    return request({
      url: '/users/login',
      method: 'post',
      data: {
        email: email,
        password: password
      }
    })
  },

  register(email, password, username, phone_num) {
    return request({
      url: '/users/register',
      method: 'post',
      data: {
        email,
        password,
        username,
        phone_num
      }
    })
  }
}
