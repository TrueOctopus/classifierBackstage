
<template>
  <div class="app-container">
    <HeadSerch v-model="headSerchData" @onSerch="onSerch" @handleReset="handleReset" @handleNew="handleNew" />
    <UserTable
      :user-list="userList"
      :list-loading="listLoading"
      :role-data="roleData"
      :page-size="(pageSize)"
      :page-num="(pageNum)"
      :count="(count)"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @handleEditRole="handleEditRole"
    />
    <el-pagination
      layout="prev, pager, next"
      :total="count"
      background
      :page-size.sync="pageSize"
      :current-page.sync="pageNum"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
    <UserEditDialog
      :edit-user="editUserData"
      :is-show="isShowEditDialog"
      @handleClose="handleClose"
      @onSubmit="update"
    />
    <UserNewDialog :is-show="isShowNewDialog" @handleClose="handleClose" @onSubmit="insert" />
    <EditRole
      :is-show.sync="isShowEditRoleDialog"
      :role-data="roleData"
      :edit-role-data="editRoleData"
      @editRole="editRole"
    />
  </div>
</template>

<script>
import UserApi from '@/api/python/user.js'
import USER_CONST from '@/constant/user-const'
import UserTable from './components/userTable'
import UserEditDialog from './components/userEditDialog'
import UserNewDialog from './components/userNewDialog'
import HeadSerch from './components/headSerch'
import EditRole from './components/editRole'
export default {
  name: 'User',
  components: {
    UserTable,
    UserEditDialog,
    HeadSerch,
    UserNewDialog,
    EditRole
  },
  data() {
    return {
      pageSize: parseInt(USER_CONST.PAGE_SIZE), // 每页多少条
      pageNum: parseInt(USER_CONST.PAGE_NUM), // 第多少页
      count: 0,  // 数据总条数
      userList: [], // 用户数据
      listLoading: true, // 表单是否处于加载状态
      queryUser: {}, // 查询的user对象
      isShowEditDialog: false, // 是否显示编辑弹窗
      editUserData: {}, // 编辑用户的信息
      isShowNewDialog: false, // 是否显示新增弹窗
      headSerchData: {
        // 头部搜索的数据
        username: '',
        sex: '',
        email: '',
        phone_num: ''
      },
      roleData: [
        // 用户权限信息
        {
          value: 0,
          label: '普通用户',
          name: 'NormalUser'
        },
        {
          value: 1,
          label: '管理员',
          name: 'Administrator'
        }
      ],
      editRoleData: {}, // 修改权限弹窗数据
      isShowEditRoleDialog: false // 是否显示修改权限弹窗
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {

    getUserList() {
      UserApi.listAll(
        this.pageNum,
        this.pageSize,
        this.queryUser.username,
        this.queryUser.sex,
        this.queryUser.email,
        this.queryUser.phone_num
      ).then((res) => {
        this.userList = res.data
        this.count = res.count
        this.listLoading = false
      })
    },

    handleEdit(index, row) {
      this.isShowEditDialog = true
      this.editUserData = { ...row }
    },
    handleClose() {
      this.isShowEditDialog = false
      this.isShowNewDialog = false
    },

    update(updateUser) {
      this.listLoading = true // 启动表格加载状态
      UserApi.update(updateUser).then((res) => {
        if (res.code === 1) {
          // 更新成功
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.isShowEditDialog = false // 关闭弹窗
          this.getUserList() // 更新成功，重新获取数据
        } else {
          // 更新失败
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 修改权限
    editRole() {
      console.log('editData', this.editRoleData)
      var roleName = this.roleData.filter((item) => item.value === this.editRoleData.roleId)
      console.log('roleName', roleName)
      UserApi.changeRole(this.editRoleData.id, roleName[0].value).then((res) => {
        this.$message({
          type: res.code === 1 ? 'success' : 'error',
          message: res.message
        })
        this.getUserList()
        this.isShowEditRoleDialog = false
      })
    },

    onSerch() {
      this.listLoading = true // 启动表格加载状态
      this.queryUser = this.headSerchData
      this.getUserList()
    },
    handleReset() {
      this.headSerchData = {
        // 头部搜索的数据
        id: '',
        username: '',
        email: '',
        sex: '',
        phone_num: ''
      }
      this.getUserList()
    },

    handleNew() {
      this.isShowNewDialog = true
    },

    insert(newUser) {
      this.listLoading = true
      UserApi.add(newUser).then((res) => {
        if (res.code === 1) {
          // 添加成功
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.isShowNewDialog = false // 关闭弹窗
          this.getUserList() // 更新成功，重新获取数据
        } else {
          // 更新失败
          this.$message({
            message: res.message,
            type: 'error'
          })
          this.isShowNewDialog = false // 关闭弹窗
          this.getUserList() // 更新成功，重新获取数据
        }
      })
    },

    handleDelete(index, row) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        UserApi.delete(row.id).then((res) => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getUserList()
        })
      })
    },
    // 修改权限
    handleEditRole(row) {
      // console.log('点击了修改权限', row.email, row.role_id)
      this.isShowEditRoleDialog = true
      this.editRoleData = { id: row.id, roleId: row.role_id }
    },
    
    // 当前页数切换
    sizeChange() {
      console.log('adf')
    },
    // 当前页数发生改变
    currentChange() {
      console.log('qwer')
      this.getUserList()
    }
  }
}
</script>

<style lang="scss" scoped></style>
