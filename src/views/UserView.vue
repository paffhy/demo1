<script setup lang="ts">
import { ref, reactive, toRefs, watch } from 'vue'
import { getRoleList, getUserList, changeUser, deleteUser } from '@/request/api'
import { InitUserData, type Userable } from '@/type/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const data = reactive(new InitUserData())
//用来重置数据
let backUsers: Userable[] //此时data.userlist还为空
const { selectData, userList, roleList, userEdited } = toRefs(data)
//获取用户和角色数据
getUserList().then((res) => {
  data.userList = res.data
  backUsers = data.userList
})
getRoleList().then((res) => {
  data.roleList = res.data
})

//本地查询
function onsubmit() {
  let arr: Userable[] = backUsers
  const nickName = selectData.value.nickName
  const role = selectData.value.role

  if (nickName) {
    arr = arr.filter((value) => value.nickName.indexOf(nickName) !== -1)
  }
  if (role) {
    arr = arr.filter((value) => value.role.roleId === role)
  }
  userList.value = arr
}
// 监听搜索表单的变化,为空则重置用户数据
watch(
  [() => selectData.value.nickName, () => selectData.value.role],
  ([nickName, role]) => {
    if (!nickName && !role) {
      userList.value = backUsers
    }
  }
)
//清除搜索表单
function onclear() {
  selectData.value.nickName = ''
  selectData.value.role = 0
}

const dialogFormVisible = ref(false)
function onedit(row: Userable) {
  userEdited.value.id = row.id
  userEdited.value.nickName = row.nickName
  userEdited.value.roleId = row.role.roleId

  dialogFormVisible.value = true
}
function ondelete(row: Userable) {
  ElMessageBox.confirm(`您确认要删除${row.nickName}用户吗`, 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const index = userList.value.findIndex((value) => value.id === row.id)
      userList.value.splice(index, 1)
      deleteUser(row.id)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
function onChang() {
  dialogFormVisible.value = false
  const user = userList.value.find((value) => value.id === userEdited.value.id)
  const role = roleList.value.find(
    (value) => value.roleId === userEdited.value.roleId
  )
  if (user && role) {
    if (
      user.nickName === userEdited.value.nickName &&
      user.role.roleId === userEdited.value.roleId
    ) {
      return
    }
    user.nickName = userEdited.value.nickName
    user.role = role
    changeUser(user)
  }
}

const allowChanged = ref(false)
watch(
  () => userEdited.value.nickName,
  (nickName) => {
    if (nickName) {
      allowChanged.value = false
    } else {
      allowChanged.value = true
    }
  }
)
</script>

<template>
  <div>
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="selectData.role" class="m-2">
          <el-option label="全部角色" :value="0" />
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">查询</el-button>
        <el-button type="primary" @click="onclear">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button type="primary" round text>
            {{ scope.row.role.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="500">
        <template #default="scope">
          <el-button type="primary" @click="onedit(scope.row)">编辑</el-button>
          <el-button type="primary" @click="ondelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑页面 -->
    <el-dialog v-model="dialogFormVisible" title="用户信息编辑">
      <el-form :model="userEdited">
        <el-form-item label="用户名" label-width="140px">
          <el-input v-model="userEdited.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="140px">
          <el-select v-model="userEdited.roleId">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onChang" :disabled="allowChanged">
            更改
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
