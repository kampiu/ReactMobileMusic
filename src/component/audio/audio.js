import React, {
	Component
} from 'react'
import './audio.css'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { changPlay, changCurrent, initDuration, nextPlay  } from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		changPlay,
		changCurrent,
		initDuration,
		nextPlay
	}
)

class Audio extends Component {
	constructor(props) {
		super(props)
		this.changeTime = this.changeTime.bind(this)
		this.play = this.play.bind(this)
		this.onerror = this.onerror.bind(this)
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	play() {
		document.getElementById("audio").play()
		this.props.initDuration(document.getElementById("audio").duration)
		this.props.changPlay(true)
	}
	onerror(){
		Toast.info("加载歌曲出错!",0.6)
	}
	changeTime() {
		this.props.changCurrent(document.getElementById("audio").currentTime)
		if(document.getElementById("audio").currentTime === document.getElementById("audio").duration) {
			this.props.nextPlay()
		}
	}
	render() {
		return(
			<div>
				<audio src={ this.props.msg.player.audio.songUrl } onTimeUpdate={this.changeTime} onCanPlay={ this.play}  onError={this.onerror} id="audio"></audio>
			</div>
		)
	}
}

export default Audio