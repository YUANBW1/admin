<template>
    <div class="role-box">
      <el-form ref="form" class="form-box" :model="form" label-width="90px">
        <el-form-item label="管理员名称">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" v-if="!$route.query.id">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色">
          <div class="admin-box"  v-if="roles.length > 0">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 5px 0"></div>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handlecheckedRolesChange"
            >
              <el-checkbox
                v-for="city in roles"
                :label="city"
                :key="city"
                >{{ city }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="$goto('admin-index')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
    
    <script>
  export default {
    data() {
      return {
        form: {
          user_name: "",
          password:'',
          role: [],
        },
        checkAll: false,
        checkedRoles: [],
        roles: [],
        isIndeterminate: true,
        role_list:[]
      };
    },
    mounted() {
      if(this.$route.query.id){
          this.getInfo();
      }
      this.getRoles();
    },
    methods: {
      
      async getRoles() {
        let { code, data } = await this.$api.role.role_list_all();
        if (code == 0) {
          this.role_list = data.list;
          data.list.forEach((item) => {
            this.roles.push(item.role_name);
          });
        }
      },
      async getInfo(){
          let {code,data} =await this.$api.admin.admin_info({id:this.$route.query.id});
          if(code==0){
              this.form  = data.data;
              if(data.data.role.length>0){
                  data.data.role.forEach((item)=>{
                      this.checkedRoles.push(item.role_name)
                  })
              }
          }
      },
      handleCheckAllChange(val) {
        this.checkedRoles = val ? this.roles : [];
        this.isIndeterminate = false;
      },
      handlecheckedRolesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.roles.length;
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.roles.length;
      },
      async onSubmit() {
        if (!this.form.user_name) {
          return this.$alert("管理员名称不能为空");
        }
        if (!this.form.password && !this.$route.query.id) {
          return this.$alert("密码不能为空");
        }
        let role_list = [];
        this.role_list.forEach((item)=>{
          if(this.checkedRoles.includes(item.role_name)){
            role_list.push(item)
          }
        })
        this.form.role = JSON.stringify(role_list);
     
        let { code, data } = await this.$api.admin.admin_edit(this.form);
        if (code == 0) {
          let t = this;
          this.$message({
            duration: 3000,
            type: "success",
            message: "编辑成功",
            onClose() {
              t.$goto("admin-index");
            },
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
      .admin-box {
        width: 100%;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        
      }
    }
  }
  </style>