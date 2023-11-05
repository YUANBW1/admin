<template>
  <div class="role-box">
    <el-form ref="form" class="form-box" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.role_name"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <div class="permission-box"  v-if="permissions.length > 0">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 5px 0"></div>
          <el-checkbox-group
            v-model="checkedpermissions"
            @change="handleCheckedpermissionsChange"
          >
            <el-checkbox
              v-for="city in permissions"
              :label="city"
              :key="city"
              >{{ city }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="$goto('role-index')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      form: {
        role_name: "",
        permission: [],
      },
      checkAll: false,
      checkedpermissions: [],
      permissions: [],
      isIndeterminate: true,
      permission_list:[]
    };
  },
  mounted() {
    if(this.$route.query.id){
        this.getInfo();
    }
    this.getPermissions();
  },
  methods: {
    
    async getPermissions() {
      let { code, data } = await this.$api.permission.permission_list_all();
      if (code == 0) {
        this.permission_list = data.list;
        data.list.forEach((item) => {
          this.permissions.push(item.router_name);
        });
      }
    },
    async getInfo(){
        let {code,data} =await this.$api.role.role_info({id:this.$route.query.id});
        if(code==0){
            this.form  = data.data;
             data.data.permission = JSON.parse(data.data.permission);
            if(data.data.permission.length>0){
                data.data.permission.forEach((item)=>{
                    this.checkedpermissions.push(item.router_name)
                })
               
            }
           
        }
    },
    handleCheckAllChange(val) {
      this.checkedpermissions = val ? this.permissions : [];
      this.isIndeterminate = false;
    },
    handleCheckedpermissionsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.permissions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.permissions.length;
    },
    async onSubmit() {
      if (!this.form.role_name) {
        return this.$alert("角色名称不能为空");
      }
      let per_list =[];
      this.permission_list.forEach((item)=>{
        if(this.checkedpermissions.includes(item.router_name)){
            per_list.push(item)
        }
      })
      this.form.permission = JSON.stringify(per_list);
    
      let { code, data } = await this.$api.role.role_edit(this.form);
      if (code == 0) {
        let t = this;
        this.$message({
          duration: 3000,
          type: "success",
          message: "编辑成功",
          onClose() {
            t.$goto("role-index");
          },
        });
      }else{
          this.$message({
          duration: 3000,
          type: "error",
          message: data.message,
           
        });
      }
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.role-box {
  width: 100vw;
  height: 100vh;
  .form-box {
    width: 600px;
    margin-top: 20px;
    .permission-box {
      width: 100%;
      min-height: 300px;
      display: flex;
      flex-direction: column;
      
    }
  }
}
</style>