import $http from './index.js'
// 用于判断输入的账号密码是否能登陆
export const login=(data)=>{
    return $http.post('/car/user/login', data)
}
//退出登录
export const logOut=()=>{
    return $http.get('/car/user/logout')
}
// 用于判断输入的账号密码是否能注册
export const register=(data)=>{
    return $http.post('/car/user/register', data)
}
// 用于重置密码的函数
export const setPassword=(data)=>{
    return $http.get(`/car/user/forget/${data.userMail}/${data.verCode}`)
}
export const resetPass=(data)=>{
    return $http.post(`/car/user/reSetPassword`, data)
}
// 获取验证码
export const send=(data)=>{
    return $http.get(`/car/user/send/${data}`)
}
// 请求carinfo
export const getCarInfo=(id)=>{
    return $http.get(`/car/trading/getCar/${id}`)
}
//请求车品牌
export const getCarBrand=()=>{
    return $http.get('/car/type/allbrand')
}
//请求对应品牌的车种类
export const getCarSort=(brand)=>{
    return $http.get(`/car/type/series/${brand}`)
}
//根据搜索获取车的信息
export const getSearchCar=(data, pageCount, pageSize)=>{
    return $http.post(`/car/trading/pageCars/${pageCount}/${pageSize}`, data)
}
//根据搜索返回车的部分信息
export const getCarPage=(data)=>{
    return $http.post('/car/trading/pageCarsByQueryVo', data)
}
export const getBanner=()=>{
    return $http.get('/car/trading/getBanner')
}
//返回用户信息
export const getUserInfo=()=>{
    return $http.get('/car/userservice/getUserInfo')
}
export const getCarSeries=(id)=>{
    return $http.get(`/car/type/series/${id}`)
}
export const submitOrder=(data)=>{
    return $http.post(`/car/trading/insertCar`,data)
}
export const insertCar=(data)=>{
    return $http.post(`/car/trading/insertCar`,data)
}
export const insertComment=(data)=>{
    return $http.post(`/car/trading/insertComment`,data)
}
export const insertOrder=(data)=>{
    return $http.post(`/car/order/insertorder`,data)
}
export const getCarComment=(data)=>{
    return $http.post(`/car/trading/commentByRecord`,data)
}
//修改个人信息等
export const updateUserInfo=(data)=>{
    return $http.post('/car/userservice/updateUser',data)
}
//用户获取个人名下出售车的信息
export const sCarInfo=(data)=>{
    return $http.get(`/car/trading/getCarByUserId?userId=${data.userId}&page=${data.page}`)
}
//用户获取买车信息
export const bCarInfo=(data)=>{
    return $http.get(`/car/order/getOrderByUserId?userId=${data.userId}&page=${data.page}`)
}
// 删除未出售的汽车
export const deleteCarInfo=(data)=> {
    return $http.delete(`/car/trading/deleteCar/${data}`)
}