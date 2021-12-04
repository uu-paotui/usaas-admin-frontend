<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-04 15:11:42
 * @LastEditTime: 2021-12-04 15:40:08
 * @Description: 
-->
<template>
  <a-collapse activeKey(v-model)="1">
    <Input v-if="store.component.isInput" />
  </a-collapse>
</template>
<script>
import { defineComponent } from 'vue';
import { componentListStore } from '../store/index';
import Input from './input.vue';

export default defineComponent({
  components: {
    Input
  },
  setup() {
    const store = componentListStore();

    return { store }
  }
})
</script>
<style lang="less" scoped>
.ant-row {
  margin-bottom: 10px;
}
</style>