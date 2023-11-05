<template>
  <div ref="echarts"  class="echarts-box"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  props: {
    data: {},
  },
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.echarts);
    this.myChart.setOption(this.data);
    //监听窗口缩放
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", () => {
      this.myChart.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>
