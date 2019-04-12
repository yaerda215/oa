import axios from 'axios';

let base = 'localhost:8080';
// let base = '';

//登录请求
export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data); };
//注册请求
export const requestRegister = params => { return axios.post(`${base}/user/register`, params).then(res => res.data); };
//获取用户页面数据
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };
//保存用户数据修改
export const submitChange = params => { return axios.get(`${base}/user/change`, { params: params }); };
//获取team页table数据
export const getUserListPage = params => { return axios.get(`${base}/team/list`, { params: params }); };
//team页删除数据
export const removeInfo = params => { return axios.get(`${base}/team/remove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };