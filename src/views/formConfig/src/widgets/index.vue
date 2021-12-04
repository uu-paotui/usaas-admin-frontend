<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-01 14:10:15
 * @LastEditTime: 2021-12-03 16:27:40
 * @Description: 桥
-->
<template>
  <Input :component="component" v-if="component.type === 'input'" />
  <Textarea :component="component" v-else-if="component.type === 'textarea'" />
  <InputNumber :component="component" v-else-if="component.type === 'inputNumber'" />
  <Radio :component="component" v-else-if="component.type === 'radio'" />
  <Select :component="component" v-else-if="component.type === 'select'" />
  <Switch :component="component" v-else-if="component.type === 'switch'" />
  <!-- <DatePicker v-else-if="component.type === 'date'" /> -->
  <div v-else>未匹配到该组件，努力开发中！</div>
</template>
<script>
import { defineComponent } from 'vue';
import Input from './Input/index.vue';
import Textarea from './Textarea/index.vue';
import InputNumber from './InputNumber/index.vue';
import Radio from './Radio/index.vue';
import Select from './Select/index.vue';
import Switch from './Switch/index.vue';
import DatePicker from './DatePicker/index.vue';

export default defineComponent({
  components: {
    Input,
    Textarea,
    InputNumber,
    Radio,
    Select,
    Switch,
    DatePicker
  },
  props: ['component'],
  setup(props) {
    const { component } = props;
    return {
      component
    }
  }
})
</script>