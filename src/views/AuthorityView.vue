<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from '@/stores/store'
import { AuthorityData } from '@/type/authority'
import { getAuthorityList, changeAuthority } from '@/request/api'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const data = reactive(new AuthorityData(store))
const tree = ref()
getAuthorityList().then((res) => {
  data.list = res.data
})
function onchange() {
  const role = { roleId: data.roleId, authority: tree.value.getCheckedKeys() }
  changeAuthority(role)
  router.push('/role')
}
</script>

<template>
  <div>
    <el-tree
      :data="data.list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="data.authority"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
      :check-strictly="true"
      ref="tree"
    />
  </div>
  <el-button type="primary" @click="onchange">更改</el-button>
</template>

<style scoped lang="scss"></style>
