<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-25 09:55:26
 * @LastEditTime: 2021-12-04 15:21:44
 * @Description: 设计器Wrapper
-->
<template>
  <div class="flex justify-between bg-white h-screen m-4">
    <Sidebar />
    <Canvas />
    <Setting />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from './components/Sidebar/index.vue';
import Canvas from './components/Canvas/index.vue';
import Setting from './components/Setting/index.vue';

export default defineComponent({
  name: 'formConfigIndex',
  components: {
    Sidebar,
    Canvas,
    Setting,
  },
  setup() {
    return {}
  }
})
</script>
