
import request from '@/utils/request'

export default {

  listAll(pageNum, pageSize, username, sex, email, phone_num) {
    return request({
      url: '/gets/getList',
      method: 'post',
      data: {
        pageNum,
        pageSize,
        username,
        sex,
        email,
        phone_num
      }
    })
  },

  update(data) {
    return request({
      url: '/users/update',
      method: 'post',
      data
    })
  },

  add(newUser) {
    return request({
      url: '/users/addUser',
      method: 'post',
      data: newUser
    })
  },

  delete(id) {
    return request({
      url: `/users/deleteUserById/${id}`,
      method: 'get'
    })
  },

  getById(id) {
    return request({
      url: `/gets/getById/${id}`,
      method: 'get'
    })
  },
  // 修改权限
  changeRole(id, perm) {
    return request({
      url: '/users/changePermission',
      method: 'post',
      data: {
        id,
        perm
      }
    })
  }
}
