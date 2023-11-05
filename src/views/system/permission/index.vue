<template>
  <div class="company-box">
    <SearchTools>
      <div class="btn-box">
        <SearchBtn title="权限名称">
          <el-input
            v-model="name"
            placeholder="请输入权限名称"
            style="width: 420px"
          ></el-input>
        </SearchBtn>
        <SearchBtn title="页面地址">
          <el-input
            v-model="path"
            placeholder="请输入页面地址"
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
          <el-button
            v-if="$has_permission('permission-edit')"
            style="margin-left: 10px"
            @click="$goto('permission-edit')"
            >新增权限</el-button
          >
        </div>
      </div>
    </SearchTools>
    <div class="list-box">
      <el-table :data="data.list" style="width: 100%" fit>
        <el-table-column prop="id" label="id" width="120" />
        <el-table-column prop="router_name" label="路由名称" width="100">
        </el-table-column>
        <el-table-column prop="permission_name" label="权限名称" width="100">
        </el-table-column>
        <el-table-column prop="path" label="地址" width="150">
        </el-table-column>
        <el-table-column prop="pid" label="上级权限id" width="150">
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间" width="300">
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="{ row }" v-if="$has_permission('role-edit')" >
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="permissionDelete(row.id)"
            >
              <el-button slot="reference">删除</el-button>
            </el-popconfirm>
            <el-button
              style="margin-left: 10px"
              type="primary"
              @click="$goto('permission-edit', {}, { id: row.id })"
              >编辑</el-button
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

import SearchBtn from "../com/SearchBtn.vue";

export default {
  components: {
    SearchTools,
    SearchBtn,
  },
  computed: {
    params() {
      return {
        name: this.name,
        path: this.path,
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
      name: "",
      path: "",
      data: {},
      page_size: 10,
      page_index: 1,
    };
  },
  mounted() {
    this.fethData();
     
  },
  methods: {
    async fethData(args) {
      const params = {
        ...args,
        ...this.params,
        ...this.page,
      };

      const { code, data } = await this.$api.permission.permission_list(params);
      if (code == 0) {
        this.data = data;
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
    async permissionDelete(id) {
      let { code, data, message } =
        await this.$api.permission.permission_delete({ id: id });

      if (code == 0) {
        let t = this;
        this.$message({
          type: "success",
          duration: 3000,
          message: "删除成功",
          onClose() {
            t.fethData();
          },
        });
      } else {
        this.$message({
          type: "error",
          duration: 3000,
          message: message,
        });
      }
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
  
    