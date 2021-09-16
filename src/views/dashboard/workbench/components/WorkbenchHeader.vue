<template>
  <div class="lg:flex">
    <Avatar :src="headerImg" :size="72" class="!mx-auto !block" />
    <div class="md:ml-6 flex flex-col justify-center md:mt-0 mt-2">
      <h1 class="md:text-lg text-md">早安, {{ user.userName }}, 开始您一天的工作吧！</h1>
      <span class="text-secondary"> 今日晴，20℃ - 32℃！ </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Avatar } from 'ant-design-vue';
  import { useAppStore } from '/@/store/modules/app';
  import headerImg from '/@/assets/images/header.jpg';

  const user = useAppStore().currentUser;
</script>
