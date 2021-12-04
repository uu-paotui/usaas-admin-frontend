<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-25 10:17:16
 * @LastEditTime: 2021-12-03 14:54:50
 * @Description: 配置
-->
<template>
  <div class="w-1/4 p-2">
    <a-tabs :activeKey="activeKey" @change="handleChange">
      <a-tab-pane :key="1" v-if="store.component?.selected === true" tab="组件属性">
        <ComponentSetting />
      </a-tab-pane>
      <a-tab-pane :key="2" tab="表单属性">
        <FormSetting />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { componentListStore } from '../../store';
import ComponentSetting from '../../settings/componentConfig.vue';
import FormSetting from '../../settings/formConfig.vue';

export default defineComponent({
  components: {
    ComponentSetting,
    FormSetting
  },
  setup() {
    const activeKey = ref<number>(2);
    const store = componentListStore();

    const handleChange = (key: number) => {
      activeKey.value = key
    }

    watchEffect(() => {
      if (store.component?.selected) {
        activeKey.value = 1
      } else {
        activeKey.value = 2
      }
    })

    return {
      store,
      activeKey,
      handleChange
    }
  }
})
</script>