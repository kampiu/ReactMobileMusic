const U_LOGIN = "登录状态"
const U_EXPIRY = "登陆时间过期"
const U_UPDATEINFO = "更新登录信息"
const U_LOGOUT = "登出-初始化STATE"
const U_UPDATEIMG = "更改头像"

let userStore = {
	sid:null,
	userSex:0,
	login:false,
	expiryTime:"",
	power:0,
	userPic:"http://s4.music.126.net/style/web2/img/default/default_album.jpg",
	userNickname:"请登录",
	createTime:"",
	userId:null,
	email:""
}

export const user = (state = userStore, action) => {
	switch(action.type) {
		case U_LOGIN:
			state.login = action.bool
			state.sid = action.id
			return Object.assign({}, state)
		case U_EXPIRY:
			return Object.assign({}, state)
		case U_LOGOUT:
			const _state = {
				sid:null,
				userSex:0,
				login:false,
				expiryTime:"",
				power:0,
				userPic:"http://s4.music.126.net/style/web2/img/default/default_album.jpg",
				userNickname:"请登录",
				createTime:"",
				userId:null
			}
			return _state
		case U_UPDATEINFO:
			state.login = true
			state.userId = action.msg.m_id
			state.power = action.msg.m_power
			state.userPic = action.msg.m_picurl
			state.userNickname = action.msg.m_nickname
			state.createTime = action.msg.m_createtime
			state.email = action.msg.m_email
			return Object.assign({}, state)
		case U_UPDATEIMG:
			state.userPic = action.url
			return Object.assign({}, state)
		default:
			return state
	}
}

export function u_login(id,bool) {
	return {
		type: U_LOGIN,
		bool:bool,
		id:id
	}
}
export function u_expiry() {
	return {
		type: U_EXPIRY
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