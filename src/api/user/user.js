import request from '@/utils/request'

export default {

  listAll(queryUser, pageNum, pageSize) {
    const params = new URLSearchParams()
    params.append('pageNum', pageNum)
    params.append('pageSize', pageSize)
    return request({
      url: 'user/list',
      method: 'post',
      params,
      data: queryUser
    })
  },

  update(updateUser) {
    return request({
      url: 'user/update',
      method: 'post',
      data: updateUser
    })
  },

  add(newUser) {
    return request({
      url: 'user/add',
      method: 'post',
      data: newUser
    })
  },

  delete(id) {
    return request({
      url: 'user/delete/' + id,
      method: 'post'
    })
  },

  checkUsername(username) {
    return request({
      url: 'user/checkUsername/' + username,
      method: 'post'
    })
  },

  checkStuNum(stuNum) {
    return request({
      url: 'user/checkStuNum/' + stuNum,
      method: 'post'
    })
  }
}
