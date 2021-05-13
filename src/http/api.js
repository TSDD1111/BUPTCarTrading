import $http from './index.js'
// 获取数据的封装函数
export const getData=$http.get('')
// 用于判断输入的账号密码是否能登陆
export const login=(data)=>{
    return $http.post('http://10.128.255.148:8080//car/user/login', data)
}
// 用于判断输入的账号密码是否能注册
export const register=(data)=>{
    return $http.post('http://10.128.255.148:8080//car/user/register', data)
}
// 用于重置密码的函数
export const setPassword=(data)=>{
    return $http.get(`http://10.128.255.148:8080//car/user/forget/${data}`)
}
export const resetPass=(data)=>{
    return $http.post(`http://10.128.255.148:8080//car/user/reSetPassword`, data)
}
// 请求carinfo
export const getCarInfo=(id)=>{
    return $http.get(`http://10.128.255.148:8080//car/user/car/trading/getCar/${id}`)
}
