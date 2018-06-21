const INIT_MUSIC = "Init_music"
const INIT_TAB = "Init_tab"
const INIT_CD = "Init_cd"
const INIT_MV = "Init_mv"
const INIT_RADIO = "Init_radio"
const INDEX_LOADING = "Index_Loading"

let indexStore = {
	loading:true,
	musicList:[],
	tabImg:[],
	cd:[],
	mv:[],
	radio:[]
}

export const index = (state = indexStore, action) => {
	switch(action.type) {
		case INIT_MUSIC:
			state.musicList = action.songs
			return Object.assign({}, state)
		case INIT_TAB:
			state.tabImg = action.songs
			return Object.assign({}, state)
		case INIT_CD:
			state.cd = action.songs
			return Object.assign({}, state)
		case INIT_MV:
			state.mv = action.songs
			return Object.assign({}, state)
		case INIT_RADIO:
			state.radio = action.songs
			return Object.assign({}, state)
		case INDEX_LOADING:
			state.loading = false
			return Object.assign({}, state)
		default:
			return state
	}
}

export function initMusic(list) {
	return {
		type: INIT_MUSIC,
		songs:list
	}
}
export function initTab(list) {
	return {
		type: INIT_TAB,
		songs:list
	}
}
export function initCD(list) {
	return {
		type: INIT_CD,
		songs:list
	}
}
export function initMV(list) {
	return {
		type: INIT_MV,
		songs:list
	}
}
export function initRadio(list) {
	return {
		type: INIT_RADIO,
		songs:list
	}
}
export function indexLoading(list) {
	return {
		type: INDEX_LOADING,
	}
}