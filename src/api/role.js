
import { post, get } from '@/utils/request';
 
export function role_info(data) {
    return get('/role/info',data)
}
export function role_edit(data) {
    return post('/role/edit',data)
}
export function role_list(data) {
    return get('/role/list',data)
}

export function role_list_all(data) {
    return get('/role/listall',data)
}
export function role_delete(data) {
    return post('/role/delete',data)
}