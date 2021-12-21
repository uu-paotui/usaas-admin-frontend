<template>
  <div class="m-4 p-4 bg-white">
    <VueForm
      v-model="formData"
      :schema="schema"
      :ui-schema="uiSchema"
      :form-props="formProps"
      :form-footer="formFooter"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
                
<script>
  import { defineComponent, reactive, toRefs } from 'vue';
  import VueForm from '@lljj/vue3-form-ant'; // 需要您在当前项目下安装这个库
  
  export default defineComponent({
    components: { VueForm },
    setup() {
      let formData = reactive({});
      const formSchema = reactive({"schema":{"title":"使用ui-schema配置ui:hidden表达式","description":"实现类ali formRender的配置方法, 如下参数：<br><b>rootFormData</b>：根节点的值 <br><b>parentFormData</b>：当前父节点的值","type":"object","properties":{"case1":{"title":"整体隐藏","type":"object","properties":{"showMore":{"title":"显示更多","type":"boolean","default":false},"x1":{"title":"输入框1","type":"string","ui:hidden":"{{rootFormData.case1.showMore === false}}"},"x2":{"title":"输入框2","type":"string","ui:hidden":"{{rootFormData.case1.showMore === false}}"}}},"case3":{"title":"列表/显示不同组件","type":"object","properties":{"ruleList":{"title":"球员筛选","type":"array","items":{"type":"object","properties":{"attr":{"title":"标准","type":"string","enum":["goal","league"],"enumNames":["入球数","所在联盟"],"ui:width":"40%"},"relation":{"title":"-","type":"string","enum":[">","<","="],"ui:hidden":"{{parentFormData.attr === 'league'}}","ui:width":"20%"},"goal":{"title":"入球数","type":"string","pattern":"^[0-9]+$","message":{"pattern":"输入正确得分"},"ui:hidden":"{{parentFormData.attr !== 'goal'}}","ui:width":"40%"},"league":{"title":"名称","type":"string","enum":["a","b","c"],"enumNames":["西甲","英超","中超"],"ui:hidden":"{{parentFormData.attr !== 'league'}}","ui:width":"40%"}}}}}}}},"uiSchema":{},"formFooter":{"formItemAttrs":{"wrapperCol":{"span":12,"offset":10}}},"formProps":{"inline":false,"labelPosition":"top","inlineFooter":false,"layoutColumn":1,"labelCol":{"span":10},"wrapperCol":{"span":12}}});
  
      const handleSubmit = (values) => {
        console.log('-----values------', values)
      }
  
      const handleCancel = () => {
        console.log('您点击了取消')
      }
  
      return {
        formData,
        ...toRefs(formSchema),
        handleSubmit,
        handleCancel
      }
    }
  })
</script>
                
<style>
  
</style>
            