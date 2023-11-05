<template>
  <div class="permission-box">
    <el-form ref="form" class="form-box" :model="form" label-width="80px">
      <el-form-item label="路由名称">
    <el-input v-model="form.router_name"></el-input>
  </el-form-item>
  <el-form-item label="权限名称">
    <el-input v-model="form.permission_name"></el-input>
  </el-form-item>
  <el-form-item label="上级权限">
    <el-select
    v-model="form.pid"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.permission_name"
      :value="item.id">
    </el-option>
  </el-select>
  </el-form-item>
  
  <el-form-item label="权限地址">
    <el-input v-model="form.path"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button @click="$goto('permission-index')">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          permission_name: '',
          router_name:'',
          pid: 0,
          path: '',
        },
        options: [],
        value: [],
        list: [],
        loading: false,
      }
    },
    mounted(){
      if(this.$route.query.id){
        this.getInfo();
      }
      this.remoteMethod()
    },
    methods:{
      async getInfo(){
        let {code,data} = await this.$api.permission.permission_info({id:this.$route.query.id});
        if(code==0){
          this.form = data.data;
        }
      },
      async remoteMethod(name){
          this.loading =true;
           let {code,data} = await this.$api.permission.permission_list_all({name:name});
           this.loading =false;
           if(code==0){
            this.options = data.list;
            this.options.push({id:0,permission_name: "无"});//补足顶级权限
           }
           
      },
       async onSubmit(){
           
            if(!this.form.permission_name){
                return this.$alert('权限名称不能为空')
            }
            if(!this.form.path){
                return this.$alert('权限地址不能为空')
            }
            let {code,data} = await this.$api.permission.permission_edit(this.form);
            if(code==0){
              let t = this;
              this.$message({
                duration:3000,
                type:"success",
                message:"编辑成功",
                onClose(){
                  t.$goto('permission-index')
                }
              })
              
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.permission-box{
    width: 100vw;
    height: 100vh;
    .form-box{
        width: 600px;
        padding-top: 20px;
    }
}
</style>