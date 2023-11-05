
import { post, get } from '@/utils/request';
export function login(data) {
    return post('/noauth/login',data)
}
export function admin_info(data) {
    return get('/admin/info',data)
}
export function admin_edit(data) {
    return post('/admin/edit',data)
}
export function admin_list(data) {
    return get('/admin/list',data)
}
export function admin_editpassword(data) {
    return post('/admin/editpassword',data)
}
export function getadminroles(data) {
    return get('/admin/getadminroles',data)
}



 

