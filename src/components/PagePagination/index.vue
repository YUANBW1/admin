<template>
  <el-pagination
    class="page-pagination-box"
    :current-page="page_index"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="page_size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
</template>
<script>

export default {
  props: {
    total: {},
    page_index: {},
    page_size:10
  },
  mounted(){
    console.log(this.page_size)
  },
  methods: {
    sizeChange(page_size) {
      
      this.$emit('change', { page_size:page_size })
    },
    currentChange(page) {
      this.$emit('change', { page_index: page })
    }

  }
}
</script>

<style lang="scss" scoped>
.page-pagination-box {
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;

}
</style>
