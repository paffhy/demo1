<script setup lang="ts"></script>

<template>
  <div class="swipe-item-box">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.swipe-item-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
</style>
