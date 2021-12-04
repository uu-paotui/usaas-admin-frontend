<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-24 14:28:05
 * @LastEditTime: 2021-12-04 15:55:36
 * @Description: 输入框
-->
<template>
  <a-input
    :placeholder="component?.options?.placeholder || '请输入'"
  />
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['component'],
  setup(props) {
    const { component } = props;
    return {
      component
    }
  }
})
</script>