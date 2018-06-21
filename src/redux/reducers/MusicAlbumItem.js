const AI_INIT = "重新获取歌单列表"
const AI_CHANGE = "重置歌单ID"
const AI_INITINFO = "重置歌单信息"
let playerStore = {
	albumId:0,
	songsList:[],
	info:{}
}

export const albumItem = (state = playerStore, action) => {
	switch(action.type) {
		case AI_INIT:
			state.songsList = action.list
			return Object.assign({}, state)
		case AI_CHANGE:
			state.albumId = action.id
			return Object.assign({}, state)
		case AI_INITINFO:
			state.info = action.info
			return Object.assign({}, state)
		default:
			return state
	}
}

export function ai_init(list) {
	return {
		type: AI_INIT,
		list:list
	}
}
export function ai_change(id) {
	return {
		type: AI_CHANGE,
		id:id
	}
}
export function ai_initInfo(info) {
	return {
		type: AI_INITINFO,
		info:info
	}
}