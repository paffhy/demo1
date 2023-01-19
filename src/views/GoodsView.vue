<script setup lang="ts">
import { reactive, toRefs, computed, watch } from 'vue'
import { getGoodsList } from '@/request/api'
import { InitGoodData, type Goodable } from '../type/goods'
const data = reactive(new InitGoodData())
let backData: Goodable[]
const { selectForm, goods } = toRefs(data)
const currentGoods = computed(() => {
  const start = (selectForm.value.page - 1) * selectForm.value.pagesize
  const end = selectForm.value.pagesize * selectForm.value.page
  return data.goods.slice(start, end)
})
getGoodsList()
  .then((res) => {
    backData = res.data
    data.goods = backData
    data.selectForm.count = backData.length
  })
  .catch(() => {
    return 'error'
  })

function find(str: string, search: string) {
  return str.indexOf(search) !== -1
}
function onsubmit() {
  let arr: Goodable[] = backData
  const title = data.selectForm.title
  const introduce = data.selectForm.introduce
  if (title) {
    arr = arr.filter((value) => find(value.title, title))
  }
  if (introduce) {
    arr = arr.filter((value) => find(value.introduce, introduce))
  }
  selectForm.value.count = arr.length
  goods.value = arr
}

watch(
  [() => data.selectForm.title, () => data.selectForm.introduce],
  ([title, introduce]) => {
    if (!title && !introduce) {
      data.goods = backData
      data.selectForm.count = backData.length
    }
  }
)
function onclear() {
  data.selectForm.title = ''
  data.selectForm.introduce = ''
}
</script>

<template>
  <div class="select-box">
    <el-form :inline="true" :model="selectForm" class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="selectForm.title" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item label="详情">
        <el-input v-model="selectForm.introduce" placeholder="请输入关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">查询</el-button>
        <el-button type="primary" @click="onclear">清空</el-button>
      </el-form-item>
    </el-form>
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :total="selectForm.count"
      :size="selectForm.pagesize"
      class="mt-4"
      v-model:current-page="selectForm.page"
      v-model:page-size="selectForm.pagesize"
    />
  </div>
  <div class="good-bottom">
    <el-table :data="currentGoods" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.select-box {
  display: flex;
  justify-content: space-between;
  height: 3.4vw;
}
.mt-4 {
  margin-bottom: 1vw;
}
</style>
