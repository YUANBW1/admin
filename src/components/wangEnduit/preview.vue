<template>
  <el-dialog
    title="手机预览(实际效果以真机为准)"
    width="400px"
    custom-class="modal-box"
    v-bind="$attrs"
    v-on="$listeners"
  >
  <div class="phone-box">
    <div class="content-box">
        <div v-html="data"></div>
    </div>
  </div>
  </el-dialog>
</template>

<script>
export default {
props:{
    data:{}
},
mounted(){
    console.log(this.data)
}
};
</script>
<style lang="scss" scoped>
.modal-box {
 
 .phone-box{
    height: 667px;
    width: 375px;
    background: url("./images/phone.png") no-repeat;
    background-size: 375px 667px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    .content-box{
        margin-top: 90px;
        width: 250px;
        height: 515px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        overflow-x: auto;
        line-height: 20px;
        font-size: 12px;
        color: #999999;
        &::-webkit-scrollbar {
            width: 0;
        }
        ::v-deep a {
            color: #0066ff;
        }
        ::v-deep image{
            width: 100% !important;
            height: 100% !important;
          }
          ::v-deep img{
            width: 100% !important;
            height: 100% !important;
          }
          ::v-deep video{
            width: 100% !important;
            height: 100% !important;
          }
       
    }
   
 }
 
}
</style>