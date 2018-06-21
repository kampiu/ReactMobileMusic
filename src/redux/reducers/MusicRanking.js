const R_CHANGE = "改变缓存排行版"
const R_INIT = "重置排行版"
const R_LOADING = "排行版列表加在完毕"

let rankingStore = {
	rank:[],
	target:{
		id:0,
		playlist:{}
	},
	loading:true
}

export const ranking = (state = rankingStore, action) => {
	switch(action.type) {
		case R_INIT:
			state.rank = action.list
			return Object.assign({}, state)
		case R_CHANGE:
			state.target = action.list
			return Object.assign({}, state)
		case R_LOADING:
			state.loading = false
			return Object.assign({}, state)
		default:
			return state
	}
}

export function r_change(list) {
	return {
		type: R_CHANGE,
		list:list
	}
}
export function r_init(list) {
	return {
		type: R_INIT,
		list:list
	}
}
export function r_loading() {
	return {
		type: R_LOADING
	}
}