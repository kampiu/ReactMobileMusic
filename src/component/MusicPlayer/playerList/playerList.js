import React, {
	PureComponent,
	http
} from 'react'
import './playerList.css'
import { Toast } from 'antd-mobile'
import API from '../../../comment/Api'
import { connect } from 'react-redux'
import { removeSong, initSong } from './../../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		removeSong,
		initSong
	}
)
class playerList extends PureComponent {
	componentDidMount() {
		
	}
	play(e){
		this.props.initSong(e)
	}
	remove(song){
		let songs = {
			id: song.id,
			name: song.name,
			singer: song.singer,
			albumPic: song.albumPic,
			songUrl: '',
			album: song.album
		}
		let data = {
			song:songs,
			uid:this.props.msg.user.userId
		}
		http.post(API.removeSong(),data).then((res) => {
			if(res.data.code === 200){
				Toast.info(res.data.data.msg,0.8)
				this.props.removeSong(songs)
			}
		}).catch((e)=>{
			console.log("N",e)
		})
	}
	render() {
		return(
			<div className="player-list">
				<div className="player-list-mask" onClick={ this.props.fun}></div>
				<div className="player-list-view" style={ this.props.data ? {bottom:"0"} : {bottom:"-9rem"}}>
					<div className="player-list-head">播放歌单</div>
					<div className="player-list-body">
					{
						this.props.msg.player.songList.map((item,index) => {
							return (
								<div className="player-list-item" key={item.id}>
									<div onClick={ () => { this.play(item) }} className="player-list-name font-break">{item.name} - <span>{item.singer}</span></div>
									<div className="player-list-remove" onClick={ () => { this.remove(item) }}></div>
								</div>
							)
						})
					}
					</div>
					<div className="player-list-foot" onClick={ this.props.fun }>关闭</div>
				</div>
			</div>
		);
	}
}

export default playerList