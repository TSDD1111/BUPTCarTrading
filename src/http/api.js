import $http from './index.js'
// 获取数据的封装函数
export const getData=$http.get('')
// 用于判断输入的账号密码是否能登陆
export const login=(data)=>{
    return $http.post('http://10.128.209.93:8001//car/user/login', data)
}
// 用于判断输入的账号密码是否能注册
export const register=(data)=>{
    return $http.post('http://10.128.209.93:8001//car/user/register', data)
}
// 用于重置密码的函数
export const setPassword=(data)=>{
    return $http.get(`http://10.128.209.93:8001//car/user/forget/${data.userMail}/${data.verCode}`)
}
export const resetPass=(data)=>{
    return $http.post(`http://10.128.209.93:8001//car/user/reSetPassword`, data)
}
// 获取验证码
export const send=(data)=>{
    return $http.get(`http://10.128.209.93:8001//car/user/send/${data}`)
}
// 请求carinfo
export const getCarInfo=(id)=>{
    return $http.get(`http://10.128.255.148:8080//car/user/car/trading/getCar/${id}`)
}
//请求车品牌
export const getCarBrand=()=>{
    return $http.get('http://10.28.208.233:8060/car/type/allbrand')
}
//请求对应品牌的车种类
export const getCarSort=(brand)=>{
    return $http.get(`http://10.28.208.233:8060/car/type/series/${brand}`)
}
//根据搜索获取车的信息
export const getSearchCar=(data, pageCount, pageSize)=>{
    return $http.post(`http://10.28.208.233:8001/car/trading/pageCars/${pageCount}/${pageSize}`, data)
}