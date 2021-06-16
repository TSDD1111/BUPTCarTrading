import $http from './index.js'
// 用于判断输入的账号密码是否能登陆
export const login=(data)=>{
    return $http.post('http://8.140.2.249/car/user/login', data)
}
// 用于判断输入的账号密码是否能注册
export const register=(data)=>{
    return $http.post('http://8.140.2.249/car/user/register', data)
}
// 用于重置密码的函数
export const setPassword=(data)=>{
    return $http.get(`http://8.140.2.249/car/user/forget/${data.userMail}/${data.verCode}`)
}
export const resetPass=(data)=>{
    return $http.post(`http://8.140.2.249/car/user/reSetPassword`, data)
}
// 获取验证码
export const send=(data)=>{
    return $http.get(`http://8.140.2.249/car/user/send/${data}`)
}
// 请求carinfo
export const getCarInfo=(id)=>{
    return $http.get(`http://8.140.2.249/car/trading/getCar/${id}`)
}
//请求车品牌
export const getCarBrand=()=>{
    return $http.get('http://8.140.2.249/car/type/allbrand')
}
//请求对应品牌的车种类
export const getCarSort=(brand)=>{
    return $http.get(`http://8.140.2.249/car/type/series/${brand}`)
}
//根据搜索获取车的信息
export const getSearchCar=(data, pageCount, pageSize)=>{
    return $http.post(`http://8.140.2.249/car/trading/pageCars/${pageCount}/${pageSize}`, data)
}
//根据搜索返回车的部分信息
export const getCarPage=(data)=>{
    return $http.post('http://8.140.2.249/car/trading/pageCarsByQueryVo', data)
}
export const getBanner=()=>{
    return $http.get('http://8.140.2.249/car/trading/getBanner')
}
//返回用户信息
export const getUserInfo=()=>{
    return $http.get('http://8.140.2.249/car/userservice/getUserInfo')
}
export const getCarSeries=(id)=>{
    return $http.get(`http://8.140.2.249/car/type/series/${id}`)
}
export const submitOrder=(data)=>{
    return $http.post(`http://8.140.2.249/car/trading/insertCar`,data)
}
export const insertCar=(data)=>{
    return $http.post(`http://8.140.2.249/car/trading/insertCar`,data)
}
export const insertComment=(data)=>{
    return $http.post(`http://8.140.2.249/car/trading/insertComment`,data)
}
export const insertOrder=(data)=>{
    return $http.post(`http://8.140.2.249/car/order/insertorder`,data)
}
export const getCarComment=(data)=>{
    return $http.post(`http://8.140.2.249/car/trading/commentByRecord`,data)
}
