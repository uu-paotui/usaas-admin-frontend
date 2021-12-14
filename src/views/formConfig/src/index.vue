<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-06 15:41:37
 * @LastEditTime: 2021-12-14 09:13:18
 * @Description: 表单设计器
-->
<template>
  <FramePage
    frameSrc="http://39.101.133.238:28000/schema-generator.html#/index"
  />
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';
import FramePage from '/@/views/sys/iframe/index.vue';

export default defineComponent({
  components: { FramePage },
  setup() {
    return {}
  }
})
</script>