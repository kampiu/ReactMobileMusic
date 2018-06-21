import React, {
	PureComponent,
	http
} from 'react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { addSong, initSong } from './../../../redux/reducers/MusicPlayer'
import API from '../../../comment/Api'

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
	addSong(){
		let song = this.props.data
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
		return (
			<div className="album-list-item">
				<div className="album-list-index">{this.props.index + 1}</div>
				<div className="album-list-song">
					<div className="album-list-name">{this.props.data.name}</div>
					<div className="album-list-singer font-break">{this.props.data.artists ? this.props.data.artists[0].name : this.props.data.ar[0].name}</div>
				</div>
				<div className="album-list-console">
					<img onClick={ this.play } alt="" src="./img/album-list-play.png" />
					<img onClick={ this.addSong } alt="" src="./img/album-list-coll.png" />
				</div>
			</div>
		)
	}
}

export default listBodyItem