/**
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 15:19:31
 * @LastEditors: 郑钊宇
 * @Description: 
 */

// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'
import { resetRouter } from '@/router'
import userApi from '@/api/python/user'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: getUserId(),
    name: '',
    avatar: '',
    userInfo: {} // 用户信息
  }
}

const state = getDefaultState()

const mutations = {
  SER_USERID: (state, data) => {
    state.userId = data
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      var user = { ...userInfo }
      commit('SET_USERINFO', user)
      commit('SET_TOKEN', user.token)
      commit('SER_USERID', user.id)
      // commit('SET_USERNAME', user.name)
      setToken(user.token)
      setUserId(user.id)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.getById(state.userId).then(res => {
        var user = { ...res }
        commit('SET_USERINFO', user)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserId()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

