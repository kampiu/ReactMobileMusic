import React, {
	PureComponent,
	http
} from 'react'
import TitleBar from './../titleBar/titleBar'
import './MusicCollection.css'
import { Toast } from 'antd-mobile'
import Cookies from 'js-cookie'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import {
	removeSong,
	initSong,
	p_initsonglist
} from './../../redux/reducers/MusicPlayer'
import { c_initLoading } from './../../redux/reducers/MusicCollection'

@connect(
	state => ({
		msg: state
	}), {
		removeSong,
		initSong,
		p_initsonglist,
		c_initLoading
	}
)

class MusicCollection extends PureComponent {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		if(this.props.location.pathname.indexOf("history") === -1){
			this.loading()
		}
	}
	loading() {
		if(this.props.msg.collection.loading) {
			Toast.loading('Loading...', 10)
			http.get(API.getUserList()).then((res) => {
				if(res.data.code === 200) {
					this.props.p_initsonglist(res.data.data.playlist.list)
					this.props.c_initLoading()
				}
				Toast.hide()
			}).catch(() => {
				this.loading()
			})
		}
	}
	componentDidMount() {

	}
	play(song) {
		let songs = {
			id: song.id,
			name: song.name,
			singer: song.singer,
			albumPic: song.albumPic,
			songUrl: '',
			album: song.album
		}
		http.get(API.getMusicUrl(songs.id)).then((res) => {
			if(res.data.code === 200){
				songs.songUrl = res.data.data[0].url
				this.props.initSong(songs)
			}
		})
	}
	remove(song) {
		let songs = {
			id: song.id,
			name: song.name,
			singer: song.singer,
			albumPic: song.albumPic,
			songUrl: '',
			album: song.album
		}
		let data = {
			song: songs,
			uid: this.props.msg.user.userId
		}
		http.post(API.removeSong(), data).then((res) => {
			if(res.data.code === 200) {
				Toast.info(res.data.data.msg, 0.8)
				this.props.removeSong(songs)
			}
		}).catch((e) => {
			console.log("N", e)
		})
	}
	render() {
		let len = this.props.location.pathname.indexOf("history") === -1 ? this.props.msg.player.songList.length : (localStorage.getItem("music_history") ? JSON.parse(localStorage.getItem("music_history")).length : 0)
		let list = this.props.location.pathname.indexOf("history") === -1 ? this.props.msg.player.songList : (localStorage.getItem("music_history") ? JSON.parse(localStorage.getItem("music_history")) : [])
		return(
			<div className="collection-view">
				<TitleBar back={this.props.location.pathname.indexOf("history") === -1 ? null:true} title={this.props.location.pathname.indexOf("history") === -1 ? "收藏" : "历史"}></TitleBar>
				<div className="collection-list">
					<div className="collection-list-title">{this.props.location.pathname.indexOf("history") === -1 ? "歌单歌曲" : "收听历史"}共{"(" + len + ")"}首</div>
					{
						list.map((item,index) => {
							return (
								<div className="collection-item" key={item.id}>
									<div className="collection-index">{index + 1}</div>
									<div className="collection-msg">
										<div className="collection-name">{item.name}</div>
										<div className="collection-singer">{item.singer}</div>
									</div>
									<div className="collection-console">
										<span onClick={ () => { this.play(item) }}></span>
										<span onClick={ () => { this.remove(item) }}></span>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default MusicCollection
