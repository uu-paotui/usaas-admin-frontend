<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-12-03 15:25:19
 * @LastEditTime: 2021-12-04 11:58:02
 * @Description: form容器，提供给外部调用
-->
<template>
  <a-form
    ref="formRef"
    :model="formState"
    v-bind="formItemLayout"
    :layout="formConfig.labelShowModel"
  >
    <a-row>
      <a-col
        v-for="item in schema"
        :key="item.field"
        :span="formConfig.layout"
      >
        <a-form-item
          :label="item.label"
          :name="item.field"
          :rules="[{required: item.required, message: item.message}]"
        >
          <Dynamic :component="item" v-model:value="formState[item.field]" :style="{width: `${item.width}%`}" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">{{formConfig.onOkText || '确定'}}</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">{{formConfig.onCancelText || '取消'}}</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref, computed } from 'vue';
import Dynamic from '../widgets/index.vue';
import { getFieldsFromComponentList } from '../utils/tools';

export default defineComponent({
  props: ['schema', 'formConfig'],
  components: {
    Dynamic
  },
  setup(props) {
    const formRef = ref();
    const { schema, formConfig } = props;
    const formState = reactive(getFieldsFromComponentList(schema));
    
    const formItemLayout = computed(() => {
      return formConfig.labelShowModel === 'horizontal'
        ? {
          labelCol: { span: formConfig.labelCol },
          wrapperCol: { span: 24 - Number(formConfig.labelCol) }
        }
        : {}
    })

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('----values----', formState)
        })
    }

    const resetForm = () => {
      formRef.value.resetFields();
    }

    return {
      formRef,
      formState,
      formItemLayout,
      onSubmit,
      resetForm,
      schema,
      formConfig
    }
  }
})
</script>