 
import router from '@/router';
 
export function goto(name, params = {},query={}) {
    router.push({ name: name, params: params,query:query })
}