import router from './router';

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getKey,setKey } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title';
import {Message} from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    const hasLogin = getKey('user')
 
        //有token即已登录
    if (hasLogin && hasLogin!="{}") {
        if (to.path === '') {
            next({ path: '/' })
            NProgress.done()
        } else {
            next()
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            Message({type:'error',message:'请先登录'})
            next(`/login`)
        }
        NProgress.done()
    }
})
 
 
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})