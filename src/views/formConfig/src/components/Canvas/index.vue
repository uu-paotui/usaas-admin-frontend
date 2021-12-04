<!--
 * @Author: wendy
 * @LastEditors: wendy
 * @Date: 2021-11-25 10:15:47
 * @LastEditTime: 2021-12-04 15:21:12
 * @Description: 绘制
-->
<template>
  <div class="w-2/4 design">
    <div class="design--header">
      <a-button class="mr-2" @click="handleShowPreview">{{isEdit ? '最终展示' : '开始编辑'}}</a-button>
      <a-button class="mr-2">导入</a-button>
      <a-button class="mr-2">导出schema</a-button>
      <a-button type="primary" class="mr-2">生成vue文件</a-button>
      <a-button danger ghost class="mr-2 right" @click="store.clearAllComponentList()">清空</a-button>
    </div>
    <div class="design--body" :class="{'design--body_preview': !isEdit}">
      <UForm
        v-if="!isEdit"
        :schema="store.componentList"
        :formConfig="store.formConfig"
      />
      <div v-if="store.componentList.length > 0 && isEdit">
        <a-form
          :layout="store.formConfig.labelShowModel"
          v-bind="formItemLayout"
          :model="formState"
        >
          <a-row>
            <a-col
              :span="store.formConfig.layout"
              v-for="item in store.componentList"
              :key="item.componentId"
              class="draggle--form_item"
              :class="{'draggle--form_item_active': item.selected}"
              @click="() => handleUpdateComponentList(item, 'selectComponent')"
            >
              <span class="field">{{item.field}}</span>
              <a-form-item
                :label="item.label"
                :name="item.field"
                :rules="[{required: item.required, message: item.message}]"
              >
                <Dynamic
                  :component="item"
                  v-model:value="formState[item.field]"
                  :style="{width: `${item.width}%`}" />
              </a-form-item>
              <div v-if="item.selected" class="bottom">
                <CopyOutlined @click="handleUpdateComponentList(item, 'copyComponent')" class="copy" />
                <DeleteOutlined @click="handleUpdateComponentList(item, 'deleteComponent')" class="delete" />
              </div>
            </a-col>
          </a-row>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary">{{store.formConfig.onOkText || '确定'}}</a-button>
            <a-button style="margin-left: 10px">{{store.formConfig.onCancelText || '取消'}}</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div v-show="isEdit && store.componentList.length === 0" class="placeholder">点击左侧栏的组件进行添加</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import Dynamic from '../../widgets/index.vue';
import { DeleteOutlined, CopyOutlined } from '@ant-design/icons-vue';
import { componentListStore } from '../../store/index';
import UForm from '../../generator/UForm.vue';
import { getFieldsFromComponentList } from '../../utils/tools';

export default defineComponent({
  components: {
    Dynamic,
    DeleteOutlined,
    CopyOutlined,
    UForm
  },
  setup() {
    const store = componentListStore();
    const isEdit = ref(true);
    const formState = reactive(getFieldsFromComponentList(store.componentList));

    const handleUpdateComponentList = (component, type) => {
      store.dispatchComponentList({
        type,
        component
      })
    }

    const formItemLayout = computed(() => {
      return store.formConfig.labelShowModel === 'horizontal'
        ? {
          labelCol: { span: store.formConfig.labelCol },
          wrapperCol: { span: 24 - Number(store.formConfig.labelCol) }
        }
        : {}
    })

    const handleShowPreview = () => {
      isEdit.value = !isEdit.value;
    }

    return {
      store,
      formItemLayout,
      isEdit,
      handleUpdateComponentList,
      handleShowPreview,
      formState
    }
  }
})
</script>
<style lang="less">
@import '../../styles/canvas.less';
</style>