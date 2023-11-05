<template>
  <div class="home-box">
    <div class="base-box">
      <div class="title-box">基础数据</div>
      <div class="total-box">
        <countbutton
          :value="value"
          :options="options"
          title="总流水"
        ></countbutton>
        <counttotal :value="99999" title="总用户数"> </counttotal>
        <counttotal :value="99999" title="俱乐部总数量"> </counttotal>
        <counttotal :value="99999" title="VIP数量"> </counttotal>
      </div>
    </div>
    <div class="data-box">
      <div class="title-box">实时数据</div>
      <div class="total-box">
        <countbutton
          :value="value"
          :options="options"
          title="昨日营收"
        ></countbutton>
        <countbutton
          :value="value"
          :options="options"
          title="今日流水"
        ></countbutton>
        <counttotal :value="99999" title="当前用户数量"> </counttotal>
        <counttotal :value="99999" title="在线用户数量"> </counttotal>
      </div>
      <div class="total-box">
        <counttotal :value="value" title="今日充值次数"></counttotal>
        <counttotal :value="value" title="今日充值总额"></counttotal>
        <counttotal :value="99999" title="昨日新增人数"> </counttotal>
        <counttotal :value="99999" title="今日新增人数"> </counttotal>
      </div>
      <div class="total-box">
        <counttotal :value="value" title="今日保险收入"></counttotal>
        <counttotal :value="value" title="今日净收入收入"></counttotal>
        <counttotal :value="99999" title="今日总收入"> </counttotal>
      </div>
    </div>
    <div class="charts-box">
      <chart01 :data="chart01"></chart01>
      <chart02 :data="chart02"></chart02>
      <chart03 :data="chart03"></chart03>
    </div>
  </div>
</template>

<script>
import countbutton from "@/components/CountButton";
import counttotal from "@/components/CountTotal";
import chart01 from "./com/chart01.vue";
import chart02 from "./com/chart02.vue";
import chart03 from "./com/chart03.vue";
export default {
  components: { countbutton, counttotal, chart01, chart02, chart03 },
  data() {
    return {
      value: 11,
      options: [
        { value: 11, label: "切换币种" },
        { value: 22, label: 22 },
        { value: 33, label: 33 },
        { value: 44, label: 44 },
      ],
      chart01: [
        { day: "2023-02-01", total: 3 },
        { day: "2023-02-02", total: 4 },
        { day: "2023-02-03", total: 3 },
        { day: "2023-02-04", total: 5 },
        { day: "2023-02-05", total: 4 },
        { day: "2023-02-06", total: 6 },
        { day: "2023-02-07", total: 7 },
      ],
      chart02: [
        { day: "00:00", total: 3 },
        { day: "02:00", total: 4 },
        { day: "04:00", total: 3 },
        { day: "06:00", total: 5 },
        { day: "08:00", total: 4 },
        { day: "10:00", total: 6 },
        { day: "12:00", total: 7 },
      ],
      chart03: [
        { day: "2023-02-01", total: 3 },
        { day: "2023-02-02", total: 4 },
        { day: "2023-02-03", total: 3 },
        { day: "2023-02-04", total: 5 },
        { day: "2023-02-05", total: 4 },
        { day: "2023-02-06", total: 6 },
        { day: "2023-02-07", total: 7 },
      ],
    };
  },
 
};
</script>

<style lang="scss" scoped>
.home-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .base-box {
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 100%;
    .title-box {
      height: 100px;
      width: 100%;
      font-size: 20px;
      font-weight: 700;
      color: #333;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .total-box {
      height: 300px;
      width: 100%;
      display: flex;
      flex-direction: row;
    }
  }
  .data-box {
    .title-box {
      height: 100px;
      width: 100%;
      font-size: 20px;
      font-weight: 700;
      color: #333;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .total-box {
      height: 300px;
      width: 100%;
      display: flex;
      flex-direction: row;
    }
  }
  .charts-box {
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }
}
</style>