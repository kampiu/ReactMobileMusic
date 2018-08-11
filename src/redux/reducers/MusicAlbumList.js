const CHANGE_TYPE = '修改歌单类型'
const CHANGE_MODE = '修改歌单模式'
const CHANGE_OFFSET = '修改歌单数量'
const INSERT_SONGS = '添加歌单列表'
const LOADING = "加载状态"

let albumListStore = {
	type: "全部",
	mode: "hot",
	offset: 0,
	limit: 20,
	loading:true,
	songs:[]
}

export const albumList = (state = albumListStore, action) => {
	switch(action.type) {
		case CHANGE_TYPE:
			state.type = action._type
			state.offset = 0
			state.songs = []
			return Object.assign({},state)
		case CHANGE_MODE:
			state.mode = action._mode
			state.offset = 0
			state.songs = []
			return Object.assign({},state)
		case CHANGE_OFFSET:
			state.offset = action._offset
			return Object.assign({},state)
		case INSERT_SONGS:
			let arr = Object.assign({},state)
			for(let i = 0,len = action._songs.length;i < len;i++){
				arr.songs.push(action._songs[i])
			}
			return arr
		case LOADING:
			state.loading = false
			return Object.assign({},state)
		default:
			return state
	}
}
export function changeType(e) {
	return {
		type: CHANGE_TYPE,
		_type:e
	}
}
export function changeMode() {
	return {
		type: CHANGE_MODE,
		_mode:"hot"
	}
}
export function changeOffset(e) {
	return {
		type: CHANGE_OFFSET,
		_offset:e
	}
}
export function insertSongs(songs) {
	return {
		type: INSERT_SONGS,
		_songs:songs
	}
}
export function albumLoading() {
	return {
		type: LOADING
	}
}