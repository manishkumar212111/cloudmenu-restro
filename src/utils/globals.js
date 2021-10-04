const checkLogin = () => {
    let userDetail = localStorage.getItem('userDetail') && JSON.parse(localStorage.getItem('userDetail')) ? JSON.parse(localStorage.getItem('userDetail')).user: {};
    
    if(userDetail.status){
        return true;
    } else {
        return false;

    }
}

const getUserData = (key) => {
    let users = checkLogin();
    if(users){
        users = users.user;
        return key ? users[key] : users;
    }
    return false;
}
const getCurrentLoggedInUserId = () => {
    console.log(checkLogin())
   return checkLogin() ? checkLogin().user.id : ''; 
}

const getLocalStorageItem = (key) => {
    if(typeof window !== 'undefined'){
        return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : {};
    } 
    return {};
 }
 

const setLocalStorageItem = (key , value) => {
    if(typeof window !== 'undefined'){
        window.localStorage.setItem(key, JSON.stringify(value))
    } 
 }
 
const clearUserData = () => {
    if(typeof window !== 'undefined'){
        window.localStorage.removeItem('userDetail')
    }
}
module.exports = {
    checkLogin,
    getCurrentLoggedInUserId,
    getLocalStorageItem,
    setLocalStorageItem,
    clearUserData,
    getUserData
}