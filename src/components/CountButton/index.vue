<template>
  <div class="num-box">
    <div class="title-box">{{ title }}</div>
    <div class="data-text">{{ value }}</div>
    <div class="tab-box">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default() {
        return 0;
      },
    },
    options: {
      type: Array,
      default() {
        return [
          { value: 11, label: "切换币种" },
          { value: 22, label: 22 },
        ];
      },
    },
    title: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.num-box {
  height: 200px;
  width: 350px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  justify-content: flex-start;
  margin-right: 30px;
  .title-box {
    flex: 1;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .data-text {
    flex: 1;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .tab-box {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>