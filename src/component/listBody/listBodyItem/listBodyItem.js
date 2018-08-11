import React, {
	PureComponent,
	http
} from 'react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { addSong, initSong } from './../../../redux/reducers/MusicPlayer'
import API from '../../../comment/Api'
import playIcon from '../album-list-play.png'
import collectIcon from '../album-list-coll.png'

@connect(
	state => ({
		msg: state
	}), {
		addSong,
		initSong
	}
)

class listBodyItem extends PureComponent {
	constructor(props) {
		super(props)
		this.play = this.play.bind(this)
		this.addSong = this.addSong.bind(this)
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	play() {
		let song = this.props.data
		let songs = {
			id: song.id,
			name: song.name,
			singer: (song.artists ? song.artists[0].name : (song.ar ? song.ar[0].name : song.singer)),
			albumPic: (song.album ? (song.album.picUrl ? song.album.picUrl : song.albumPic) : song.al.picUrl),
			songUrl: '',
			album: (song.album ? (song.album.name ? song.album.name : song.album) : song.al.name)
		}
		http.get(API.getMusicUrl(songs.id)).then((res) => {
			if(res.code === 200) {
				songs.songUrl = res.data[0].url
				this.props.initSong(songs)
			}
		})
	}
	addSong() {
		let songs = this.props.data
		let song = {
			id: songs.id,
			name: songs.name,
			singer: (songs.artists ? songs.artists[0].name : songs.ar[0].name),
			albumPic: (songs.album ? songs.album.picUrl : songs.al.picUrl),
			songUrl: '',
			album: (songs.album ? songs.album.name : songs.al.name)
		}
		http.post(API.addSong(), {
			song: song
		}).then(res => {
			if(res.code === 200) {
				this.props.addSong(song)
			}
			Toast.info(res.msg, 0.8)
		}).catch((e) => {
			Toast.info("收藏歌曲失败", 0.8)
		})
	}
	render() {
		return(
			<div className="album-list-item">
				<div className="album-list-index">{this.props.index + 1}</div>
				<div className="album-list-song">
					<div className="album-list-name">{this.props.data.name}</div>
					<div className="album-list-singer font-break">{this.props.data.artists ? this.props.data.artists[0].name : (this.props.data.singer ? this.props.data.singer : this.props.data.ar[0].name)}</div>
				</div>
				<div className="album-list-console">
					<img onClick={ this.play } alt="" src={playIcon} />
					<img onClick={ this.addSong } alt="" src={collectIcon} />
				</div>
			</div>
		)
	}
}

export default listBodyItem