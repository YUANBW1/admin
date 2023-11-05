// 引入需要全局注册的组件
import PagePagination from '@/components/PagePagination';
import Charts from '@/components/Charts'
export default {
    install(Vue) {
        // 注册全局组件
        Vue.component('page_pagination', PagePagination);
        Vue.component('charts', Charts)
    }
}