
<template>
  <div class="user-table">
    <el-table v-loading="listLoading" :data="userList" style="width: 100%" border stripe>
      <el-table-column prop="id" label="id" align="center" width="60" />
      <el-table-column prop="username" label="用户名" align="center" width="120" />
      <el-table-column prop="sex" label="性别" align="center" width="60" :formatter="formatSex" />
      <el-table-column prop="email" label="邮箱" align="center" width="200" />
      <el-table-column prop="phone_num" label="电话" align="center" width="120" />
      <el-table-column prop="address" label="地址" align="center" width="250" />
      <el-table-column prop="unit" label="单位" align="center" width="250" />
      <el-table-column prop="permission" label="权限" align="center" width="120" :formatter="formatRoleId" />

      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-tooltip v-if="userInfo.permission === 1" class="item" effect="dark" content="删除" placement="top">
            <svg-icon icon-class="delete" class-name="button" @click="handleDelete(scope.$index, scope.row)" />
          </el-tooltip>
          <el-tooltip v-if="userInfo.permission === 1 || scope.row.id === userInfo.id" class="item" effect="dark" content="编辑" placement="top">
            <svg-icon icon-class="edit" class-name="button" @click="handleEdit(scope.$index, scope.row)" />
          </el-tooltip>
          <el-tooltip v-if="userInfo.permission === 1" class="item" effect="dark" content="修改权限" placement="top">
            <svg-icon icon-class="role" class-name="button" @click="handleEditRole(scope.$index, scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import USER_CONST from '@/constant/user-const'
export default {
  name: 'UserTable',
  components: {},
  filters: {

  },
  props: {
    count: {
      // 数据总数
      type: Number,
      required: true
    },
    pageSize: {
      // 每页多少条
      type: Number,
      required: true
    },
    pageNum: {
      // 当前页数
      type: Number,
      required: true
    },
    userList: {  // 列表数据
      type: Array,
      required: true,
      default: () => []
    },
    listLoading: {  // 是否加载状态
      type: Boolean,
      default: false
    },
    roleData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userInfo: this.$store.getters.userInfo
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 页数改变
    sizeChange() {

    },

    formatSex(row) {
      if (row.sex === USER_CONST.MALE) {
        return '男'
      } else if (row.sex === USER_CONST.FEMALE) {
        return '女'
      } else {
        return '保密'
      }
    },

    // 翻译用户权限字段
    formatRoleId(row) {
      var roleData = this.roleData.filter(item => item.value === row.permission)
      if (roleData.length > 0) {
        return roleData[0].label
      }
      return ''
    },

    handleEdit(index, row) {
      this.$emit('handleEdit', index, row) // 执行绑定的方法
    },

    handleDelete(index, row) {
      this.$emit('handleDelete', index, row)
    },
    // 点击修改权限
    handleEditRole(index, row) {
      this.$emit('handleEditRole', row)
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  font-size: 16px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
</style>
