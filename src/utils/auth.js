export function getKey(key) {
    return localStorage.getItem(key)
}

export function setKey(key, value) {
    return localStorage.setItem(key, value)
}

export function removeKey(key) {
    return localStorage.removeItem(key)
}

export function loginOut() {
    removeKey('token');
    removeKey('user');
}

export function has_permission(permission){
    
    let user = JSON.parse(localStorage.getItem("user"));
   
    if (user && user.user.roles) {
   
      let i =  user.user.roles.findIndex((item) => {
        return item ==permission;
      });
      return i >= 0 ? true : false;
    }
    return false;
}
