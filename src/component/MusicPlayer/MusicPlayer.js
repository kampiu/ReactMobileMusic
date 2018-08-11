import React, {
	PureComponent
} from 'react'
import './MusicPlayer.css' 
import PlayerList from './playerList/playerList'
import { connect } from 'react-redux'
import { changPlay, changeSongIndex, loadSong, addSong, changemode, removeSong, changCurrent, initSong, initDuration, prevPlay, nextPlay, p_initsonglist } from './../../redux/reducers/MusicPlayer'
import { c_initLoading } from './../../redux/reducers/MusicCollection'

@connect(
	state => ({
		msg: state
	}), {
		changPlay,
		changeSongIndex,
		loadSong,
		addSong,
		removeSong,
		changCurrent,
		initSong,
		initDuration,
		prevPlay,
		nextPlay,
		p_initsonglist,
		c_initLoading,
		changemode
	}
)

class MusicPlayer extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			list: false,
			offset: 0
		}
		this.changeMode = this.changeMode.bind(this)
		this.onPlay = this.onPlay.bind(this)
		this.toggleList = this.toggleList.bind(this)
	}
	componentWillMount() {
		
	}
	componentDidMount() {

	}
	timeForm(value) {
		let length = Math.floor(parseInt(value,10))
		let minute = Math.floor(value / 60)
		if(minute < 10) {
			minute = '0' + minute
		}
		let second = length % 60
		if(second < 10) {
			second = '0' + second
		}
		return minute + ':' + second
	}
	changeTime(e) {
		document.getElementById("audio").currentTime = e.target.value
		this.props.changCurrent(e.target.value)
	}
	onPlay() {
		if(this.props.msg.player.audio.id !== 0){
			this.props.msg.player.playing ? document.getElementById("audio").pause() : document.getElementById("audio").play()
			this.props.changPlay(!this.props.msg.player.playing)
		}
	}
	changeMode(){
		this.props.changemode()
	}
	toggleList() {
		this.setState({
			list: !this.state.list
		})
	}
	render() {
		return(
			<div id="player-view">
				<div id="player">
					<div className="player-head">
						<div className="player-back" onClick={ () => { window.history.go(-1) }}></div>
						<div className="player-msg">
							<div className="player-name">{ this.props.msg.player.audio.name }</div>
							<div className="player-singer">{ this.props.msg.player.audio.singer }</div>
						</div>
					</div>
					<div className="player-lyric">
						<div id="player-lyric-gettop" className="player-lyric-view" style={{top: -this.props.msg.player.lyricIndex * 0.4 + 4.2 + "rem"}}>
							{
								this.props.msg.player.lyric.length === 0 ? "暂无歌词" : null
							}
							{
								this.props.msg.player.lyric.map((item,index) => {
									return <p key={item.time + item.txt + index} style={ this.props.msg.player.lyricIndex === index ? {color:"#517AF1",fontSize:"16px"} : {}}>{item.txt}</p>
								})
							}
						</div>
					</div>
					<div className="player-menu">
						<div className="player-progress-view">
							<span>{  this.timeForm(this.props.msg.player.currentTime)  }</span>
							<input onChange={ (e) => { this.changeTime(e) }} max={ parseInt(this.props.msg.player.durationTime,10) } value={ parseInt(this.props.msg.player.currentTime,10) } id="player-road" type="range" style={{backgroundSize: (this.props.msg.player.currentTime / this.props.msg.player.durationTime) * 100 + "% 100%"}} />
							<span>{  this.timeForm(this.props.msg.player.durationTime)  }</span>
						</div>
						<div className="player-console">
							<div className={ 'player-mode mode' + this.props.msg.player.mode} onClick={ this.changeMode }></div>
							<div className="player-perv" onClick={ () => { this.props.prevPlay() }}></div>
							<div onClick={ this.onPlay } className={ this.props.msg.player.playing ? "player-pause" : "player-play"}></div>
							<div className="player-next" onClick={ () => { this.props.nextPlay() }}></div>
							<div className="player-lists" onClick={ this.toggleList }></div>
						</div>
					</div>
				</div>
				{
					this.state.list ? <PlayerList data={ this.state.list } fun={ this.toggleList.bind(this) } key="playlist-put"></PlayerList> : null
				}
				<div style={{backgroundImage: "url(" + this.props.msg.player.audio.albumPic + ")"}} className="player-mask"></div>
			</div>
		);
	}
}

export default MusicPlayer