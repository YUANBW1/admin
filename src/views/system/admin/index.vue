<template>
    <div class="company-box">
      <SearchTools>
        <div class="btn-box">
          <SearchBtn title="角色名称">
            <el-input
              v-model="name"
              placeholder="请输入角色名称"
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
            <el-button v-if="$has_permission('admin-edit')" style="margin-left: 10px" @click="$goto('admin-edit')"
              >新增管理员</el-button
            >
          </div>
        </div>
      </SearchTools>
      <div class="list-box">
        <el-table :data="data.list" style="width: 100%" fit>
          <el-table-column prop="id" label="id" width="120" />
          <el-table-column prop="user_name" label="管理员名称" width="100">
          </el-table-column>
          <el-table-column prop="role" label="角色个数" width="150">
            <template slot-scope="{row}">
                {{  row.role?JSON.parse(row.role).length:0}}
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间" width="300">
          </el-table-column>
          <el-table-column prop="status" label="操作">
            <template slot-scope="{row}" v-if="$has_permission('admin-edit')">
              <el-button @click="adminStatus(row.id,row.status==0?1:0)" ><div :class="row.status==0?'status-text2':'status-text'">{{row.status==0?"启用":'禁用'}}</div></el-button>
              <el-button  style="margin-left:10px" type="primary" @click="$goto('admin-edit',{},{id:row.id})">编辑</el-button>
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
          keyword: this.name,
         
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
  
        const { code, data } = await this.$api.admin.admin_list(params);
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
     async adminStatus(id,status){
    
         let {code,data,message} = await this.$api.admin.admin_edit({id:id,status:status});
         if(code==0){
          let t = this;
          this.$message({
            type:"success",
            duration:3000,
            message:"更新成功",
            onClose(){
              t.fethData()
            }
          })
         }else{
        
           this.$message({
            type:"error",
            duration:3000,
            message: message
           })
         }
      }
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
    
      