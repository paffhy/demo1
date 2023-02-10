<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { LoginData } from '@/type/login'
import type { FormInstance } from 'element-plus'
import { getRoleList, login } from '@/request/api'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useLoginStore } from '@/stores/store'

const store = useLoginStore()
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
//表单数据
const ruleForm = reactive(new LoginData())
//表单校验规则
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名!',
      trigger: 'blur',
    },
    {
      min: 1,
      max: 10,
      message: '账号长度在1到10之间',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码!',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 10,
      message: '密码长度在3到10之间',
    },
  ],
}
//提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl
    .validate()
    .then(() => {
      login(toRaw(ruleForm))
        .then((data: any) => {
          localStorage.setItem('token', data.token)
          store.roleId = data.roleId
          getRoleList().then((req: any) => {
            store.authority = req.data.find(
              (value: any) => value.roleId === store.roleId
            ).authority
          })
          router.push('/')
        })
        .catch(() => {
          ElMessage.error('用户名或密码错误')
        })
    })
    .catch(() => {
      console.log('error submit')
      return false
    })
}
function onreset() {
  ruleForm.username = ''
  ruleForm.password = ''
}
</script>

<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="4vw"
      class="demo-ruleForm"
    >
      <h1>后台管理系统</h1>
      <el-form-item label="账号:" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="btn"
          >提交</el-button
        >
        <el-button class="btn" @click="onreset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .demo-ruleForm {
    position: absolute;
    width: 25vw;
    padding: 2vw;
    background-color: #fff;
    border-radius: 2vw;

    .btn {
      width: 10vw;
    }

    h1 {
      text-align: center;
      margin-bottom: 2vw;
      font-size: 25px;
    }
  }
}
</style>
