<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo  :collapse="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" background-color="#304156" text-color="#fff"
        active-text-color="#d54711">
        <div v-for="item in menus" :key="item.name">
          <menu-item  :item="item" @active="active"></menu-item>
        </div>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import { constantRoutes } from '@/router/index'
import variables from "@/styles/variables.scss";
import menuItem from './menuItem.vue'
import _ from 'lodash';
export default {
  components: { Logo, menuItem },
  data() {
    return {
      menus: [],
    }
  },
  created() {
    //重置左侧菜单
    let user_path = ['login', '404', '401', 'home', 'home-index'];//默认路由
    this.menus = filter(JSON.parse(JSON.stringify(constantRoutes)))
    function filter(data) {
     
    let user = JSON.parse(localStorage.getItem('user'));
   
    if(user &&  user!="{}"){
        user_path = user_path.concat( user.user.roles);
    }
    user_path = _.uniq(user_path);
 
    var newData = _.filter(data, function(o) { 
     
      return user_path.includes(o.name); })
    
    newData.forEach(x => x.children && (x.children = filter(x.children)))
     
    
    return newData

}
  },
  computed: {
    ...mapGetters(["sidebar"]),

    activeMenu() {
      const route = this.$route;
      const { meta, path, name } = route;

      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      // console.log('111', this.$route);
      return name;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    active(item) {
      this.$goto(item.name)
    },
  }

};
</script>
