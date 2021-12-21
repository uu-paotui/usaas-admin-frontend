<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-06 15:41:37
 * @LastEditTime: 2021-12-14 16:39:03
 * @Description: 表单设计器
-->
<template>
  <FramePage
    frameSrc="http://192.168.10.209:8800/schema-generator.html#/index"
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