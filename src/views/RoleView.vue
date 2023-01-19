<script setup lang="ts">
import { reactive, ref, watch, isReactive } from 'vue'
import { getRoleList } from '@/request/api'
import { RoleData } from '@/type/role'
import { ElMessage } from 'element-plus'
import type { Roleable } from '@/type/user'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/store'
const route = useRouter()
const roleName = ref('')
const data = reactive(new RoleData())
getRoleList().then((res) => {
  data.list = res.data
})

function addRole() {
  if (!roleName.value.replace(/\s+/g, '')) {
    ElMessage({
      message: '角色名不能为空',
      type: 'warning',
    })
    return
  }
  const roles = data.list
  const role: Roleable = {
    roleId: roles.length,
    roleName: roleName.value.replace(/\s+/g, ''),
    authority: [],
  }
  roles.push(role)
  roleName.value = ''
}
const store = useStore()
function onchange(row: Roleable) {
  route.push({
    name: 'authority',
  })
  store.$patch((store) => {
    store.roleId = row.roleId
    store.roleName = row.roleName
    store.authority = row.authority
  })
}
</script>

<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="角色">
        <el-input v-model="roleName" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data.list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="onchange(scope.row)">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss"></style>
