import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash';
Vue.use(Router)

/* Layout */
import Layout from '@/layout';

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () =>
        import('@/views/login/index'),
    hidden: true,
    name: 'login',
},
{
    path: '/404',
    component: () =>
        import('@/views/error-page/404'),
    hidden: true,
    name: '404'
},
{
    path: '/401',
    component: () =>
        import('@/views/error-page/401'),
    hidden: true,
    name: '401'
},
{
    path: '/',
    component: Layout,
    name: "home",
    redirect: '/home',
    meta: { title: '运营数据', icon: 'el-icon-data-board', affix: true },

    children: [
        {
            path: '/home',
            component: () =>
                import('@/views/home/index'),
            name: 'home-index',
            meta: { title: '运营数据', icon: 'el-icon-data-line', affix: true }
        },
    ]
},
{
    path: '/user',
    component: Layout,
    name: "user",
    redirect: '/user/user-index',
    meta: { title: '用户管理', icon: 'el-icon-user', affix: true },
    children: [
        {
            path: '/user/user-index',
            component: () =>
                import('@/views/user/index'),
            name: 'user-index',
            meta: { title: '用户列表', icon: 'el-icon-view', affix: true }
        },
        {
            path: '/user/club',
            component: () =>
                import('@/views/user/club'),
            name: 'user-club',
            meta: { title: '俱乐部', icon: 'el-icon-view', affix: true }
        },
        {
            path: '/user/club-edit',
            component: () =>
                import('@/views/user/club_edit'),
            name: 'club-edit',
            meta: { title: '俱乐部编辑', icon: 'el-icon-view', affix: true },
            hidden: true,

        },

    ]
},
{
    path: '/operate',
    component: Layout,
    name: "operate",
    redirect: '/operate/operate-index',
    meta: { title: '运营管理', icon: 'el-icon-present', affix: true },
    children: [
        {
            path: '/operate/operate-index',
            component: () =>
                import('@/views/operate/index'),
            name: 'operate-index',
            meta: { title: '消息推送', icon: 'el-icon-box', affix: true }
        },

    ]
},
{
    path: '/bookkeeping',
    component: Layout,
    name: "bookkeeping",
    redirect: '/bookkeeping/bookkeeping-index',
    meta: { title: '流水记账', icon: 'el-icon-coin', affix: true },
    children: [
        {
            path: '/bookkeeping/bookkeeping-index',
            component: () =>
                import('@/views/bookkeeping/index'),
            name: 'bookkeeping-index',
            meta: { title: '总流水', icon: 'el-icon-tableware', affix: true }
        },
        {
            path: '/bookkeeping/revenue',
            component: () =>
                import('@/views/bookkeeping/revenue'),
            name: 'bookkeeping-revenue',
           
            meta: { title: '营收', icon: 'el-icon-s-platform', affix: true }
        },

    ]
},
{
    path: '/system',
    component: Layout,
    name: "system",
    redirect: '/system/permission-index',
    meta: { title: '系统管理', icon: 'el-icon-circle-plus-outline', affix: true },
    children: [
        {
            path: '/system/permission-index',
            component: () =>
                import('@/views/system/permission/index.vue'),
            name: 'permission-index',
            meta: { title: '权限列表', icon: 'el-icon-help', affix: true }
        },
        {
            path: '/system/permission-edit',
            component: () =>
                import('@/views/system/permission/edit.vue'),
            name: 'permission-edit',
            hidden: true,
            meta: { title: '权限编辑', icon: 'el-icon-s-platform', affix: true }
        },
        {
            path: '/system/role-index',
            component: () =>
                import('@/views/system/role/index.vue'),
            name: 'role-index',
            meta: { title: '角色列表', icon: 'el-icon-help', affix: true }
        },
        {
            path: '/system/role-edit',
            component: () =>
                import('@/views/system/role/edit.vue'),
            name: 'role-edit',
            hidden: true,
            activeMenu: 'role-index',
            meta: { title: '角色编辑', icon: 'el-icon-help', affix: true }
        },
        {
            path: '/system/admin-index',
            component: () =>
                import('@/views/system/admin/index.vue'),
            name: 'admin-index',
            meta: { title: '管理员列表', icon: 'el-icon-help', affix: true }
        },
        {
            path: '/system/admin-edit',
            component: () =>
                import('@/views/system/admin/edit.vue'),
            name: 'admin-edit',
            hidden: true,
            meta: { title: '管理员编辑', icon: 'el-icon-help', affix: true }
        },
    ]
},

]


let user_path = ['login', '404', '401', 'home', 'home-index'];//默认路由
 
 

function filter(data) {
    let user =   JSON.parse(localStorage.getItem('user'));
    if(user &&  user!="{}"){
        user_path = user_path.concat( user.user.roles);
    }
    user_path = _.uniq(user_path);
    var newData = data.filter(x => user_path.includes(x.name))
    newData.forEach(x => x.children && (x.children = filter(x.children)))
  
    return newData

}
 

 
const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: filter(constantRoutes)
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export async function resetRouter() {
   
    const newRouter = new Router({
      
        scrollBehavior: () => ({ y: 0 }),
        routes: filter(constantRoutes)
    });
    
  
    router.matcher = newRouter.matcher // reset router
}

export default router