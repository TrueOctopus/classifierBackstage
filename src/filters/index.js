/**
 * @Author: 郑钊宇
 * @Date: 2021-10-30 22:16:29
 * @LastEditTime: 2021-10-31 15:19:22
 * @LastEditors: 郑钊宇
 * @Description: 
 */

import USER_CONST from '@/constant/user-const'
export function img(value) {
  return `${USER_CONST.BASEURL}gets/getImgs/${value}`
}
