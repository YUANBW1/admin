import Vue from 'vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import api from '@/api' // 导入api接口
import * as extend from '@/extend/index';
import './permission' // 路由权限
import VueClipboard from 'vue-clipboard2' // 剪切板
import components from './registerComponents' // 全局通用组件
import {has_permission} from '@/utils/auth';
Vue.use(components)
Vue.use(VueClipboard)
Vue.use(Element, {})
Vue.config.productionTip = false
 
Vue.prototype.$api = api;
Vue.prototype.$has_permission = has_permission;
for (let i in extend) {
  Vue.prototype[`$${[i]}`] = extend[i]
}
new Vue({
  el: '#app',
  router,
  store,
  data: {
    event: new Vue()
  },
  render: h => h(App)
})
