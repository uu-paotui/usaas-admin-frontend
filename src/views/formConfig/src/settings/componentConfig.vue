<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-02 14:07:10
 * @LastEditTime: 2021-12-04 15:19:01
 * @Description: 组件配置集
-->
<template>
  <h3 class="title">基础配置</h3>
  <a-form
    layout="horizontal"
    v-bind="formItemLayout"
    :model="store.component"
  >
    <a-form-item label="属性名" name="field" :rules="[{required: true, message: '属性名是必填项！', trigger: 'blur'}]">
      <a-input
        v-model:value="store.component.field"
        @change="({target}) => handleUpdate('field', target.value)"
        placeholder="请输入属性名称" />
    </a-form-item>
    <a-form-item label="标题">
      <a-input
        v-model:value="store.component.label"
        @change="({target}) => handleUpdate('label', target.value)"
        placeholder="请输入标题" />
    </a-form-item>
    <a-form-item label="必填">
      <a-radio-group
        v-model:value="store.component.required"
        @change="({ target }) => handleUpdate('required', target.value)"
      >
        <a-radio :value="false">否</a-radio>
        <a-radio :value="true">是</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="提示" v-if="store.component.required">
      <a-input
        v-model:value="store.component.message"
        @change="({target}) => handleUpdate('message', target.value)"
        placeholder="请输入提示文案" />
    </a-form-item>
    <a-form-item label="元素宽度">
      <a-row>
        <a-col :span="16">
          <a-slider
            v-model:value="store.component.width"
            @change="(value) => handleUpdate('width', value)"
            :min="10"
            :max="100" />
        </a-col>
        <a-col :span="7">
          <a-input-number
            v-model:value="store.component.width"
            @change="(value) => handleUpdate('width', value)"
            :min="10" :max="100" :formatter="value => `${value}%`" />
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
  <h3 class="title">选项</h3>
  <Config />
</template>
<script>
import { defineComponent } from 'vue';
import { componentListStore } from '../store/index';
import Config from './index.vue';

export default defineComponent({
  components: { Config },
  setup() {
    const store = componentListStore();
    const formItemLayout =  {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }

    const handleUpdate = (name, value) => {
      store.dispatchComponentList({
        type: 'updateComponent',
        component: store.component,
        options: {
          [name]: value
        }
      })
    }

    return {
      store,
      formItemLayout,
      handleUpdate
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
}
.ant-input-number {
  min-width: none !important;
  width: 100%;
  margin-left: 10px;
}
</style>