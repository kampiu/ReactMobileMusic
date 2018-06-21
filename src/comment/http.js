import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.retry = 4
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
// code状态码200判断
axios.interceptors.response.use((res) => {
	if(res.status === 654) {
		console.log('请求超时！')
	}
	if(res.data.code < 200 && res.data.code >= 300) {
		console.error('数据返回有误')
		return Promise.reject(res)
	}
	return res
}, (error) => {
	let config = error.config
    if(!config || !config.retry) return Promise.reject(error)
    config.__retryCount = config.__retryCount || 0
    
    if(config.__retryCount >= config.retry) {
		console.log('promise error:' + error)
        return Promise.reject(error)
    }
    config.__retryCount += 1
    
    let backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve()
        }, config.retryDelay || 1)
    })
    
    return backoff.then(function() {
        return axios(config)
    })
    
})

export default axios