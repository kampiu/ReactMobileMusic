const U_LOGIN = "登录状态"
const U_UPDATEINFO = "更新登录信息"
const U_LOGOUT = "登出-初始化STATE"
const U_UPDATEIMG = "更改头像"

let userStore = {
	acount:"",
	nickName:"请登录",
	picUrl:"http://s4.music.126.net/style/web2/img/default/default_album.jpg",
	birthday:"",
	waller:0,
	sex:1,
	email:"",
	token:""
}

export const user = (state = userStore, action) => {
	switch(action.type) {
		case U_LOGIN:
			state.acount = action.msg.us_acount
			state.nickName = action.msg.us_nickname 
			state.picUrl = action.msg.us_picurl
			state.birthday = action.msg.us_birthday
			state.waller = action.msg.us_waller
			state.email = action.msg.us_email
			state.sex = action.msg.us_sex
			state.token = action.msg.token
			return Object.assign({}, state)
		case U_LOGOUT:
			const _state = {
				acount:"",
				nickName:"请登录",
				picUrl:"http://s4.music.126.net/style/web2/img/default/default_album.jpg",
				birthday:"",
				waller:0,
				sex:1,
				email:"",
				token:""
			}
			return _state
		case U_UPDATEINFO:
			state.acount = action.msg.us_acount
			state.nickName = action.msg.us_nickname
			state.picUrl = action.msg.us_picurl
			state.birthday = action.msg.us_birthday
			state.waller = action.msg.us_waller
			state.email = action.msg.us_email
			state.sex = action.msg.us_sex
			state.token = localStorage.getItem("music_billson_token")
			return Object.assign({}, state)
		case U_UPDATEIMG:
			state.userPic = action.url
			return Object.assign({}, state)
		default:
			return state
	}
}

export function u_login(data) {
	console.log("初始化用户信息",data)
	return {
		type: U_LOGIN,
		msg:data
	}
}
export function u_updateInfo(msg) {
	return {
		type: U_UPDATEINFO,
		msg:msg
	}
}
export function u_logout() {
	return {
		type: U_LOGOUT
	}
}
export function u_updateImg(url) {
	return {
		type: U_UPDATEIMG,
		url:url
	}
}
