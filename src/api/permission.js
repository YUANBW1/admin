
import { post, get } from '@/utils/request';
 
export function permission_info(data) {
    return get('/permission/info',data)
}
export function permission_edit(data) {
    return post('/permission/edit',data)
}
export function permission_list(data) {
    return get('/permission/list',data)
}

export function permission_list_all(data) {
    return get('/permission/listall',data)
}
export function permission_delete(data) {
    return post('/permission/delete',data)
}
