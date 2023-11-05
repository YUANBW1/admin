<template>
  <div>
    <el-button type="primary" @click="export2Excel">导出表格</el-button>
  </div>
</template>

<script>
const api  =  require('@/api/admin');
const moment = require('moment');
export default {
  components: {},
  props: {
    fileName: {
      type: String,
      default() {
        return "test表格";
      },
    },
    field_zh: {
      type: Array,
      default() {
        return [];//表头
      },
    },
    field_en: {
      type: Array,
      default() {
        return [];//表头对应的列名
      },
    },
    url:{
       type:String,
       default(){
         return ''//列表请求的函数名
       }
    },
    params:{
       type:Object,
       default(){
         return {} //筛选参数
       }
    }
  },

  methods: {
    async export2Excel() {
     
      let {errorCode,errorMsg,data} = await api[this.url]({...this.params,is_export:true});
       require.ensure([], () => {
        const { export_json_to_excel } = require("./util/Export2Excel");
        const list = data.list.map((v) => this.field_en.map((j) => v[j]));
        export_json_to_excel(this.field_zh, list, this.fileName+moment().format('YYYY-MM-DD'));
      });
     
    },
  },
};
</script>

<style lang="scss" scoped></style>
