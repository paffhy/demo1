<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const list = router.getRoutes().filter((v) => v.meta.isShow)
const active = router.currentRoute.value.path
</script>

<template>
  <div class="home-box">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <img src="@\..\public\logo.webp" alt="" class="logo" />
          </el-col>
          <el-col :span="16">
            <h2 class="title">后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <span class="quit-login"> 退出登录 </span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="item in list"
              :key="item.path"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
$header-height: 10vh;

.el-header {
  height: $header-height;
  background-color: gray;

  .logo {
    height: $header-height;
  }

  .title,
  .quit-login {
    text-align: center;
    color: aliceblue;
    height: $header-height;
    line-height: $header-height;
  }
}

.el-aside {
  .el-menu {
    height: calc(100vh - $header-height);
  }
}
</style>
