/**
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 14:40:28
 * @LastEditors: 郑钊宇
 * @Description: 
 */

// 分页搜索参数
const PAGE_SIZE = 7
const PAGE_NUM = 1

// 头像前缀
// const BASEURL = 'http://api.hguxgkx.com/api/v1/'
const BASEURL = 'http://localhost:5000/api/v1/'

// 性别
const MALE = 1
const FEMALE = 0

// 权限
const NORMALUSER = {
  value: 0,
  label: '普通用户',
  name: 'NormalUser'
}
const ADMINISTRATOR = {
  value: 1,
  label: '管理员',
  name: 'Administrator'
}

export default {
  MALE,
  FEMALE,
  BASEURL,
  NORMALUSER,
  ADMINISTRATOR,
  PAGE_SIZE,
  PAGE_NUM
}
