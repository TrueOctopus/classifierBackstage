/**
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 15:19:34
 * @LastEditors: 郑钊宇
 * @Description: 
 */

import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

const UserId = 'AuthorId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(token) {
  return Cookies.set(UserId, token)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}
