import React, {
	PureComponent,
	http
} from 'react'
import './listBody.css'
import { Toast } from 'antd-mobile'
import ListBodyItem from './listBodyItem/listBodyItem'
import { connect } from 'react-redux'
import { addSong, initSong } from './../../redux/reducers/MusicPlayer'
import API from '../../comment/Api'

@connect(
	state => ({
		msg: state
	}), {
		addSong,
		initSong
	}
)

class listBody extends PureComponent {
	componentWillMount() {
		console.log("music",this.props)
	}
	componentDidMount() {

	}
	play(song) {
		let songs = {
			id: song.id,
			name: song.name,
			singer: (song.artists ? song.artists[0].name : song.ar[0].name),
			albumPic: (song.album ? song.album.picUrl : song.al.picUrl),
			songUrl: '',
			album: ( song.album ? song.album.name : song.al.name)
		}
		http.get(API.getMusicUrl(songs.id)).then((res) => {
			if(res.data.code === 200){
				songs.songUrl = res.data.data[0].url
				this.props.initSong(songs)
			}
		})
	}
	addSong(song){
		let songs = {
			id: song.id,
			name: song.name,
			singer: (song.artists ? song.artists[0].name : song.ar[0].name),
			albumPic: (song.album ? song.album.picUrl : song.al.picUrl),
			songUrl: '',
			album: ( song.album ? song.album.name : song.al.name)
		}
		let data = {
			song:songs,
			uid:this.props.msg.user.userId
		}
		http.post(API.putSong(),data).then((res) => {
			if(res.data.code === 200){
				this.props.addSong(songs)
				Toast.info(res.data.data.msg,0.8)
			}else if(res.data.code === 204){
				Toast.info(res.data.data.msg,0.8)
			}
		}).catch((e)=>{
			console.log("N",e)
		})
	}
	render() {
		return(
			<div className="album-list" key={this.props.index}>
				<div className="album-list-head">
					<div className="album-list-index">
						<img alt="" src="./img/album-play.png" />
					</div>
					<div className="play-all">全部播放<span>(共{this.props.data.length}首)</span>	</div>
					<div className="coll-all">收藏全部</div>
				</div>
				{
					this.props.data.map((item,index)=>{
						return (
							<ListBodyItem data={item} index={index} key={this.props.index + item.id + index}></ListBodyItem>
						)
					})
				}
			</div>
		);
	}
}

export default listBody