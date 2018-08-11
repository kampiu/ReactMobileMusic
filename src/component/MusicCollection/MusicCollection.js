import React, {
	PureComponent,
	http
} from 'react'
import './MusicCollection.css'
import { Toast } from 'antd-mobile'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import {
	removeSong,
	initSong,
	p_initsonglist
} from './../../redux/reducers/MusicPlayer'
import ListHeader from './../listHeader/listHeader'
import CollectList from './../collectList/collectList'
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
			if(res.data.code === 200) {
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
		http.post(API.removeSong(), {
			song: songs
		}).then((res) => {
			if(res.code === 200) {
				this.props.removeSong(songs)
			}
			Toast.info(res.msg, 0.8)
		}).catch((e) => {
			Toast.info("移除歌曲出错", 0.8)
		})
	}
	render() {
		return(
			<div className="collection-view">
				<ListHeader data={ this.props.msg.albumItem.info } key={"MusicCOLLECTHead"} isCollect={ true } ></ListHeader>
				<CollectList data={ this.props.msg.player.songList } index="MusicCOLLECT" key={"collect_user"}></CollectList>
			</div>
		)
	}
}

export default MusicCollection