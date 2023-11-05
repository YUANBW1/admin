<template>
  <div class="chart-box-wrap">
    <div class="chart-box-title">保险收入曲线</div>
    <div id="chart-box3"></div>
  </div>
</template>
    
    <script>
import { Chart } from "@antv/g2";
export default {
  name: "Chart01",
  props: {
    data: {},
  },
  data() {
    return {
      chart: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let chart = new Chart({
        container: "chart-box3",
        height: 350,
        // width: 800,
        autoFit: true,
      });

      chart.data(this.data);
      chart.scale({
        day: {
          range: [0, 1],
        },
        total: {
          min: 0,
          nice: true,
          alias: "单日保险收入",
        },
      });

      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true,
      });

      chart.line().position("day*total").label("total");
      chart.point().position("day*total");

      chart.tooltip({
        shared: true,
      });

      chart.render();

      this.chart = chart;
    },
  },
};
</script>
  <style lang="scss" scoped>
.chart-box-wrap {
  margin-top: 20px;
  .chart-box-title {
    height: 50px;
    font-size: 20px;
    font-weight: 700;
    color: #333;
  }
}
</style>