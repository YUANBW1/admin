<template>
  <div class="company-box">
    <SearchTools>
      <div class="btn-box">
        <SearchBtn title="会长ID">
          <el-input
            v-model="uid"
            placeholder="请输入会长ID"
            style="width: 420px"
          ></el-input>
        </SearchBtn>
        <SearchBtn title="俱乐部名称">
          <el-input
            v-model="uid"
            placeholder="请输入俱乐部名称"
            style="width: 420px"
          ></el-input>
        </SearchBtn>
        <div class="btn-click">
          <el-button
            style="margin-left: 10px"
            type="primary"
            @click="searchData"
            >搜索</el-button
          >
          <el-button style="margin-left: 10px" @click="searchData"
            >导出</el-button
          >
        </div>
      </div>
      <div class="input-box">
        <SearchBtn title="俱乐部等级">
          <el-select v-model="role" placeholder="请选择" style="width: 420px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </SearchBtn>
        <SearchBtn title="地区">
          <el-select v-model="role" placeholder="请选择" style="width: 420px">
            <el-option
              v-for="item in area_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </SearchBtn>
      </div>
      <div class="input-box">
        <SearchBtn title="注册时间">
          <el-date-picker
            v-model="datetime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 420px"
          >
          </el-date-picker>
        </SearchBtn>
        <SearchBtn title="人数">
          <el-input
            v-model="uid"
            placeholder="请输入俱乐部人数"
            style="width: 420px"
          ></el-input>
        </SearchBtn>
      </div>
    </SearchTools>
    <div class="list-box">
      <el-table :data="data.list" style="width: 100%" fit>
        <el-table-column prop="id" label="会长ID" width="120" />
        <el-table-column prop="club_name" label="俱乐部名称" width="100">
        </el-table-column>
        <el-table-column prop="users" label="人数" width="150">
        </el-table-column>
        <el-table-column prop="grade" label="等级" width="150">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="{ row }">
            {{ row.status == 0 ? "禁用" : "启用" }}
          </template>
        </el-table-column>
        <el-table-column prop="reg_time" label="注册时间" width="300">
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary">{{
              row.status == 0 ? "启用" : "禁用"
            }}</el-button>
            <el-button size="mini" type="primary" @click="$goto('club-edit')"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <page_pagination
        :total="data.total"
        :page_index="data.page_index"
        @change="pageChange"
      />
    </div>
  </div>
</template>
    
    <script>
import SearchTools from "@/components/SearchTools";
import moment from "moment";
import SearchBtn from "./com/SearchBtn.vue";
export default {
  components: {
    SearchTools,
    SearchBtn,
  },
  computed: {
    params() {
      const params = {};
      if (this.datetime && this.datetime.length > 0) {
        params.begin_time = moment(this.datetime[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        params.end_time = moment(this.datetime[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return {
        keyword: this.keyword,
        ...params,
      };
    },
    page() {
      return {
        page_index: this.page_index,
        page_size: this.page_size,
      };
    },
  },
  data() {
    return {
      datetime: [],
      keyword: "",
      total: 0,
      data: {
        pagge_index: 1,
        total: 2,
        list: [
          {
            id: "1",
            club_name: "test",
            users: "9999",
            grade: "一级俱乐部",
            status: 0,
            reg_time: "2023-02-01 02:39",
          },
          {
            id: "2",
            club_name: "test2",
            users: "163",
            grade: "会员",
            status: 1,
            reg_time: "2023-02-01 02:39",
          },
        ],
      },
      page_size: 10,
      page_index: 1,
      uid: "",
      role: "",
      options: [
        {
          value: "2",
          label: "一级俱乐部",
        },
        {
          value: "3",
          label: "二级俱乐部",
        },
      ],
      area_options: [
        {
          value: "1",
          label: "美国",
        },
        {
          value: "2",
          label: "新加坡",
        },
      ],
    };
  },
  mounted() {
    //this.fethData();
  },
  methods: {
    async fethData(args) {
      const params = {
        ...args,
        ...this.params,
        ...this.page,
      };
      // console.log(params)
      const { error, data } = await this.$api.user.getUserListByManage(params);
      if (error == 0) {
        this.data = data;
        if (data.list && data.list.length > 0) {
          data.list.forEach((item) => {
            item.intime = moment(item.intime * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          });
        }
      }
    },
    pageChange(args) {
      if (args.page_size) {
        this.page_size = args.page_size;
      }
      if (args.page_index) {
        this.page_index = args.page_index;
      }
      this.fethData(args);
    },
    searchData() {
      this.fethData();
    },
  },
};
</script>
    
    <style lang="scss" scoped>
.company-box {
  .status-text {
    color: #f53232;
  }
  .status-text2 {
    color: #67c23a;
  }
  .btn-box {
    display: flex;
    flex-direction: row;
  }
  .input-box {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
}
</style>
  