import axios from 'axios'
import router from '../router'
import ElementUI from 'element-ui';
import Vue from 'vue'
Vue.use(ElementUI);
import crypto from "crypto";
//window.imgUrl='http://support.bk.cloudns.cc:8080/api/v1/file?id=';
//var config="http://support.bk.cloudns.cc:8081";
//if(window.origin.indexOf('localhost')>-1||window.origin.indexOf('127')>-1){
//	window.imgUrl='http://216.24.249.93:8080/api/v1/pics?id=';
//	var config="/api";
//}

window.imgUrl='http://216.24.249.93:8080/api/v1/pics?id=';
	var config="http://216.24.249.93:8080";
/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
let loading;
let i = 0;
axios.interceptors.request.use(config => {
			config.headers.lqcms_token = localStorage.token;
	if(config.url.indexOf('/payment/paypal/info/' == -1)) {
		i++;

		loading = Vue.prototype.$loading({
			lock: true,
			text: '',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0,0)'
		});

	}

	return config;
}, error => {
	return Promise.reject(error);
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/

axios.interceptors.response.use(response => {

	i--
	if(i <=0) {
		loading.close();
	}
	return response.data;
}, error => { //响应错误处理
	i--
	if(i <= 0) {
		loading.close();
	}
	return Promise.reject(error);
})

export default {
	fetchGet(url, params) {
		return new Promise(function(resolve, reject) {
			axios.get(config + url, params).then((response) => {
				resolve(response);
			})
		})
	},
	fetchPost(url, params) {
		return new Promise(function(resolve, reject) {

			axios.post(config + url, params).then((response) => {
				resolve(response);
			})
		})
	},
	fetchDelete(url, params) {
		return new Promise(function(resolve, reject) {

			axios.delete(config + url, {
				data: params
			}).then((response) => {
				resolve(response);
			})
		})
	}
}