<template>
  <div class="club-edit-box">
    <div class="club-name"> 狮王俱乐部 </div>
    <div class="club-grade">当前等级
        <el-select v-model="value" placeholder="请选择" style="margin-left:10px;width: 220px;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </div>
    <div class="rate-box">分成比例
        <el-input v-model="rate" placeholder="请输入分成比例"  style="margin-left:10px;width: 220px;"
         oninput="value=value.replace(/^\.+|[^\d]/g,'')" 
          @blur="salaryChange"></el-input> %
    </div>
     <el-button type="primary" style="width:100px;margin:20px 0 0 100px" @click="$goto('user-club')">确定</el-button>
  </div>
</template>

<script>
export default {
data(){
    return {
        options:[
            {
                value:'1',
                label:'1'
            },
            {
                value:'2',
                label:'2'
            },
            {
                value:'3',
                label:'3'
            }
        ],
        value:1,
        rate:''
    }
},
methods:{
    salaryChange (e) {
      this.rate = e.target.value
    },
}
}
</script>
<style lang="scss" scoped>
.club-edit-box{
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .club-name{
         padding: 20px 0 0 20px;
         
    }
    .club-grade{
       padding:  20px 0 0 30px;
    }
    .rate-box{
        padding:  20px 0 0 30px;
    }

}
</style>