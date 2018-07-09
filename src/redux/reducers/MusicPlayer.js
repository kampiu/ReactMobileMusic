import {
	http
} from 'react'
import { Toast } from 'antd-mobile'
import API from './../../comment/Api'
const P_PLAYING = "歌曲播放状态"
const P_LYRIC = "歌曲获取歌词"
const P_LOADING = "加载歌曲"
const P_ADDSONG = "收藏歌曲"
const P_REMOVESONG = "移除歌曲"
const P_CURRENTTIME = "更改播放进度"
const P_CHENGE = "更改歌曲"
const P_INITSONG = "初始化歌曲"
const P_INITDURATION = "初始化歌曲时长"
const P_PREVPLAY = "上一首歌曲"
const P_NEXTPLAY = "下一首歌曲"
const P_DEFAULT = "默认"
const P_SETURL = "设置歌曲资源路径"
const P_ERROR = "加载歌曲出错"
const P_INITSONGLIST = "初始化歌单列表"
const P_INITLOGOUT = "初始化收藏歌单"
const P_CHANGEMODE = "更改歌曲播放模式"

let playerStore = {
	audio: {
		'id': 0,
		'name': '歌曲名称',
		'singer': '演唱者',
		'albumPic': '/static/player-bar.png',
		'songUrl': '',
		'album': ''
	},
	lyric: [],
	currentIndex: 0, // 当前播放的歌曲位置 从1开始
	playing: false, // 是否正在播放
	loading: false, // 是否正在加载中
	songList: [], // 播放列表
	currentTime: 0, //歌曲播放进度
	durationTime: 0, //歌曲时长
	change: false, //歌曲是否被改变
	lyricIndex: 0, //歌词的下标
	mode:0,			//播放模式 0 => 列表循环, 1 => 单曲循环, 2 => 随机播放
	randList:[]		//随机播放的歌曲
}

export const player = (state = playerStore, action) => {
	switch(action.type) {
		case P_PLAYING:
			state.playing = action.flag
			return Object.assign({}, state)
		case P_LYRIC:
			state.lyric = action.lyric
			return Object.assign({}, state)
		case P_CHENGE:
			state.currentIndex = action.index
			return Object.assign({}, state)
		case P_LOADING:
			state.loading = action.flag
			return Object.assign({}, state)
		case P_ADDSONG:
			state.songList.push(action.song)
			return Object.assign({}, state)
		case P_INITSONGLIST:
			state.songList = action.songlist
			return Object.assign({}, state)
		case P_REMOVESONG:
			state = action.state
			const obj = {
				'id': 0,
				'name': '歌曲名称',
				'singer': '演唱者',
				'albumPic': '/static/player-bar.png',
				'songUrl': '',
				'album': ''
			}
			state.audio = (action.state.songList.length === 0 ? obj : action.state.audio)
			state.lyric = (action.state.songList.length === 0 ? [] : action.state.lyric)
			state.playing = (action.state.songList.length === 0 ? false : action.state.playing)
			return Object.assign({}, state)
		case P_CURRENTTIME:
			state.currentTime = action.time
			if(state.lyric.length > 0) {
				for(var i = 0, len = state.lyric.length; i < len; i++) {
					if(state.lyric[i + 1] !== undefined) {
						if((state.lyric[i].time <= state.currentTime) && (state.lyric[i + 1].time > state.currentTime)) {
							state.lyricIndex = i
							return Object.assign({}, state)
						}
					}
				}
			}
			return Object.assign({}, state)
		case P_INITSONG:
			state.audio = action.song
			for(let i = 0, len = state.songList.length; i < len; i++) {
				if(state.songList[i].id === action.song.id) {
					state.currentIndex = (i + 1)
					return Object.assign({}, state)
				}
			}
			state.playing = true
			state.currentIndex = state.songList.length
			return Object.assign({}, state)
		case P_INITDURATION:
			state.durationTime = action.time
			return Object.assign({}, state)
		case P_PREVPLAY:
			console.log(action)
			state.currentIndex = action.index
			state.audio = action.audio
			state.audio.songUrl = action.url
			state.lyricIndex = 0
			return Object.assign({}, state)
		case P_NEXTPLAY:
			state.currentIndex = action.index
			state.audio = action.audio
			state.audio.songUrl = action.url
			state.lyricIndex = 0
			return Object.assign({}, state)
		case P_DEFAULT:
			return state
		case P_INITLOGOUT:
			let _state = {
				audio: {
					'id': 0,
					'name': '歌曲名称',
					'singer': '演唱者',
					'albumPic': '/static/player-bar.png',
					'songUrl': '',
					'album': ''
				},
				lyric: [],
				currentIndex: 0, // 当前播放的歌曲位置 从1开始
				playing: false, // 是否正在播放
				loading: false, // 是否正在加载中
				songList: [], // 播放列表
				currentTime: 0, //歌曲播放进度
				durationTime: 0, //歌曲时长
				change: false, //歌曲是否被改变
				lyricIndex: 0 //歌词的下标
			}
			return _state
		case P_SETURL:
			state.audio.songUrl = action.url
			return Object.assign({}, state)
		case P_ERROR:
			Toast.info('歌曲存在版权问题，无法播放!', 0.8, null, false);
			return Object.assign({}, state)
		case P_CHANGEMODE:
			state.mode = (++state.mode === 3) ? 0 : state.mode++
			if(state.mode === 2){
				state.randList = state.songList.slice().sort(function(){ return 0.5 - Math.random() })
			}
			return Object.assign({}, state)
		default:
			return state
	}
}

export function changemode(){
	return{
		type:P_CHANGEMODE
	}
}

export function changPlay(bool) {
	return {
		type: P_PLAYING,
		flag: bool
	}
}
export function p_initList() {
	return {
		type: P_INITLOGOUT
	}
}
export function changeSongIndex(index) {
	return {
		type: P_CHENGE,
		index: index
	}
}
export function loadSong(bool) {
	return {
		type: P_LOADING,
		flag: bool
	}
}
export function p_initsonglist(list){
	return {
		type:P_INITSONGLIST,
		songlist:list
	}
}
export function addSong(song) {
	for(let i = 0, len = this.msg.player.songList.length; i < len; i++) {
		if(this.msg.player.songList[i].id === song.id) {
			return {
				type: P_DEFAULT
			}
		}
	}
	return {
		type: P_ADDSONG,
		song: song
	}
}
export function removeSong(song) { //移除歌曲，判断移除的歌曲是当前播放下标的前中后，三部分
	return dispatch => {
		let state = this.msg.player
		for(let i = 0, len = state.songList.length; i < len; i++) {
			if(state.songList[i].id === song.id) {
				if(state.currentIndex > (i + 1)) {
					state.currentIndex = (state.currentIndex === 1) ? (state.songList.length - 1) : (state.currentIndex - 1)
					state.songList.splice(i, 1)
					dispatch({
						type: P_REMOVESONG,
						state: state
					})
				} else if(state.currentIndex === (i + 1)) {
					state.currentIndex = (state.currentIndex === 1) ? (state.songList.length - 1) : (state.currentIndex - 1)
					state.songList.splice(i, 1)
					state.audio = state.songList[state.currentIndex - 1]
					dispatch({
						type: P_REMOVESONG,
						state: state
					})
					http.get(API.getMusicUrl(state.audio.id)).then((res) => {
						if(res.data.data[0].url === null) {
							dispatch({
								type: P_ERROR
							})
							return
						}
						dispatch({
							type: P_SETURL,
							url: res.data.data[0].url
						})
					})
				} else if(state.currentIndex < (i + 1)) {
					state.songList.splice(i, 1)
					dispatch({
						type: P_REMOVESONG,
						state: state
					})
				}
				return(state.audio.id === 0 ? null : _getLyric(state.audio, dispatch))
			}
		}
	}
}

export function changCurrent(time) {
	return {
		type: P_CURRENTTIME,
		time: time
	}
}
export function initDuration(time) {
	return {
		type: P_INITDURATION,
		time: time
	}
}
export function prevPlay() {
	return dispatch => {
		let len,audio
		switch(this.msg.player.mode){
			case 0:
				len = ((this.msg.player.currentIndex === 1) ? this.msg.player.songList.length : this.msg.player.currentIndex - 1)
				audio = this.msg.player.songList[len - 1]
				break
			case 1:
				len = this.msg.player.currentIndex + 1
				audio = this.msg.player.audio
				break
			case 2:
				len = ((this.msg.player.currentIndex === 1) ? this.msg.player.songList.length : this.msg.player.currentIndex - 1)
				audio = this.msg.player.randList[len - 1]
				break
			default:
				len = ((this.msg.player.currentIndex === 1) ? this.msg.player.songList.length : this.msg.player.currentIndex - 1)
				audio = this.msg.player.songList[len - 1]
				break
		}
		return http.get(API.getMusicUrl(audio.id)).then((res) => {
			if(res.data.data[0].url === null) {
				dispatch({
					type: P_ERROR
				})
				return
			}
			dispatch({
				type: P_PREVPLAY,
				url: res.data.data[0].url,
				audio:audio,
				index: len
			})
			return _getLyric(audio, dispatch)
		})
	}
}
export function nextPlay() {
	return dispatch => {
		let len,audio
		switch(this.msg.player.mode){
			case 0:
				len = ((this.msg.player.currentIndex === this.msg.player.songList.length) ? 1 : this.msg.player.currentIndex + 1)
				audio = this.msg.player.songList[len - 1]
				break
			case 1:
				len = this.msg.player.currentIndex + 1
				audio = this.msg.player.audio
				break
			case 2:
				len = ((this.msg.player.currentIndex === this.msg.player.songList.length) ? 1 : this.msg.player.currentIndex + 1)
				audio = this.msg.player.randList[len - 1]
				break
			default:
				len = ((this.msg.player.currentIndex === this.msg.player.songList.length) ? 1 : this.msg.player.currentIndex + 1)
				audio = this.msg.player.songList[len - 1]
				break
		}
		return http.get(API.getMusicUrl(audio.id)).then((res) => {
			console.log("res",res.data.data[0].url)
			if(res.data.data[0].url === null) {
				dispatch({
					type: P_ERROR
				})
				return
			}
			dispatch({
				type: P_NEXTPLAY,
				url: res.data.data[0].url,
				audio:audio,
				index: len
			})
			return _getLyric(audio, dispatch)
		})
	}
}

export function initSong(song) { //初始化歌曲，顺便播放的时候获取歌曲的播放路径与歌词,异步action
	return dispatch => {
		_getUrl(song, P_INITSONG, dispatch)
		let data = localStorage.getItem("music_history") ? JSON.parse(localStorage.getItem("music_history")) : []
		if(data.length >= 50){
			console.log("进来了",data)
			data.splice(data.length-1,1)
		}
		data.unshift(song)
		for(let i =0,len = data.length;i < len;i++){
			if(data[i].id === song.id && i !== 0){
				data.splice(i,1)
				localStorage.setItem("music_history",JSON.stringify(data))
				return 
			}
		}
		localStorage.setItem("music_history",JSON.stringify(data))
	}
}
const _getUrl = (song, type, dispatch) => {
	http.get(API.getMusicUrl(song.id)).then((res) => {
		if(res.data.data[0].url === null) {
			dispatch({
				type: P_ERROR
			})
			return
		}
		song.songUrl = res.data.data[0].url
		dispatch({
			type: type,
			song: song
		})
		return _getLyric(song, dispatch)
	})
}

const _getLyric = (song, dispatch) => {
	http.get(API.getLyric(song.id)).then((res) => {
		if(!res.data.lrc){
			return
		}
		let lyrics = res.data.lrc.lyric.split('\n'),
			lrcObj = [],
			timeReg = /\[\d*:\d*((.|:)\d*)*\]/g
		for(let i = 0, len = lyrics.length; i < len; i++) {
			let timeRegExpArr = lyrics[i].match(timeReg)
			if(!timeRegExpArr) continue
			let txt = lyrics[i].replace(timeReg, '')
			for(let k = 0, len = timeRegExpArr.length; k < len; k++) {
				let t = timeRegExpArr[k]
				let min = Number(String(t.match(/\[\d*/i)).slice(1))
				let sec = Number(String(t.match(/:\d*/i)).slice(1))
				let time = min * 60 + sec
				let array = {
					time: time,
					txt: txt
				}
				lrcObj.push(array)
			}
		}
		dispatch({
			type: P_LYRIC,
			lyric: lrcObj
		})
	})
}

const rand = (min,max) => {
	return Math.floor(Math.random()*(max-min+1))+min;
}
