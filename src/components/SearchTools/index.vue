<template>
  <div class="search-tools-box">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.search-tools-box{
    
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    
    .el-input{
       width: 250px;
       height: 40px;
    }
    .el-button{
      height: 40px;
    }
}
</style>
