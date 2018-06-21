const C_LOADING = "初始化加载收藏歌单"

let collectionStore = {
	loading:true
}

export const collection = (state = collectionStore, action) => {
	switch(action.type) {
		case C_LOADING:
			state.loading = false
			return Object.assign({}, state)
		default:
			return state
	}
}

export function c_initLoading() {
	return {
		type: C_LOADING
	}
}