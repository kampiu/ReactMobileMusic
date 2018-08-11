const CD_LOADING = "初始化加载新碟上架"
const CD_ADDCD = "加载新碟"
const INIT_CD_TYPE = "修改新碟的类型"

let cdStore = {
	loading:true,
	cdList:[],
	type: "ALL",
	offset: 0,
	limit: 20
}

export const cd = (state = cdStore, action) => {
	switch(action.type) {
		case CD_LOADING:
			state.loading = false
			return Object.assign({}, state)
		case CD_ADDCD:
			state.offset += state.limit
			action.list.forEach((item, index) => {
				state.cdList.push(item)
			})
			state.cdList = Array.from(new Set(state.cdList))
			return Object.assign({}, state)
		case INIT_CD_TYPE:
			state.offset = 0
			state.type = action.mode
			state.cdList = []
			return Object.assign({}, state)
		default:
			return state
	}
}


export function cd_initloading() {
	return {
		type: CD_LOADING
	}
}
export function add_cdlist(list) {
	return {
		type: CD_ADDCD,
		list:list
	}
}
export function init_cd_type(type){
	return {
		type:INIT_CD_TYPE,
		mode:type
	}
}
