<template>
  <div class="message-box">
    <div class="message-select-box">
      <labelVue title="选择消息类型">
        <el-select
          v-model="type"
          placeholder="请选择"
          style="margin-left: 10px; width: 380px"
        >
          <el-option
            v-for="item in type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </labelVue>
      <labelVue title="选择消息生效区域">
        <el-select
          v-model="area"
          placeholder="请选择"
          style="margin-left: 10px; width: 380px"
        >
          <el-option
            v-for="item in area_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </labelVue>
    </div>
    <div class="message-timing-box">
      定时发送设置
      <el-switch v-model="timing" style="margin-left: 45px"> </el-switch>
      <el-date-picker
        v-if="timing == true"
        v-model="time"
        type="datetime"
        placeholder="选择日期时间"
        style="margin-left: 50px; width: 280px"
      >
      </el-date-picker>
    </div>
    <div class="message-content">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="content"
        maxlength="300"
        show-word-limit
        resize="none"
        rows="12"
        style="width: 1000px"
      >
      </el-input>
    </div>
    <div class="submit-box">
      <el-button type="primary" style="height: 40px; width: 120px"
        >发送</el-button
      >
      <el-button style="height: 40px; width: 120px">查看历史消息</el-button>
    </div>
  </div>
</template>

<script>
import labelVue from "./com/label.vue";
export default {
  components: {
    labelVue,
  },
  data() {
    return {
      type: "1",
      type_options: [
        { value: "1", label: "全服消息" },
        { value: "2", label: "俱乐部消息" },
        { value: "3", label: "个人消息" },
        { value: "4", label: "运营公告" },
      ],
      area: "1",
      area_options: [
        { value: "1", label: "全部区域" },
        { value: "2", label: "中" },
        { value: "3", label: "美" },
        { value: "4", label: "英" },
      ],
      timing: true,
      time: "",
      content: "",
    };
  },
};
</script>

 <style lang="scss" scoped>
.message-box {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
  .message-select-box {
    display: flex;
    flex-direction: row;
    height: 80px;
    align-items: center;
  }
  .message-timing-box {
    display: flex;
    flex-direction: row;
    height: 80px;
    align-items: center;
  }
  .submit-box {
    display: flex;
    flex-direction: row;
    width: 1000px;
    height: 60px;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>