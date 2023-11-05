<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" :key='getSidebarKey' />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar @editpassword="editPassword" />
        <!-- <tags-view v-if="needTagsView" /> -->
      </div>
      <app-main />
      <right-panel />
    </div>

    <el-dialog title="修改登录密码" :visible.sync="show" width="450px">
      <el-form label-position="left" label-width="90px">
        <el-form-item label="旧密码">
          <el-input style="width: 250px" v-model="old_password" placeholder="请输入旧密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input style="width: 250px" v-model="password" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input style="width: 250px" v-model="confirm_password" placeholder="确认新密码" show-password></el-input>
        </el-form-item>
     
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import { loginOut } from "@/utils/auth";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader,
    }),
    classObj() {
      return {
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === 'mobile' 移动端适配处理
      };
    },
    getSidebarKey(){
      return this.sidebar_key +'key'
    }
  },
  data() {
    return {
      show: false,
      password: "",
      old_password: "",
      confirm_password: "",
      userInfo:  localStorage.user?JSON.parse(localStorage.user) : {},
      sidebar_key:0,
    };
  },
  created(){
     this.sidebar_key += 1;
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    editPassword() {
      this.show = true;
    },
    async submitEdit() {
      if (!this.old_password) {
        return this.$message({
          type: "error",
          message: "旧密码不能为空",
        });
      }
      if(this.old_password === this.password){
        return this.$message({
          type: "error",
          message: "新密码不能和旧密码一致",
        });
      }
      if (this.password !== this.confirm_password) {
        return this.$message({
          type: "error",
          message: "确认密码与密码不一致",
        });
      }
      if (!this.password)
        return this.$message({ type: "error", message: "密码不能为空" });
    
        let { code, data,message } = await this.$api.admin.admin_editpassword({
          old_password: this.old_password,
          password: this.password,
          confirm_password: this.confirm_password,
        })
        if (code == 0) {
          let t = this;
          this.$message({
            type: "info",
            message: "密码修改成功,请重新登录",
            duration: 2000,
            onClose() {
              t.$router.push('/login')
            },
          });
        } else {
          this.$message({ type: "error", message: message});
        }
       
     
    },
    
   
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
