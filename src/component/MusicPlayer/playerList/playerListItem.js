import React, {
	PureComponent,
	http
} from 'react'
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

class playerListItem extends PureComponent {
	constructor(props) {
		super(props)
		this.play = this.play.bind(this)
		this.remove = this.remove.bind(this)
	}
	componentDidMount() {
		
	}
	play(){
		this.props.initSong(this.props.data)
	}
	remove(){
		http.post(API.removeSong(),{song:this.props.data}).then(res => {
			if(res.code === 200){
				this.props.removeSong(this.props.data)
			}
			Toast.info(res.msg,0.8)
		}).catch(e => {
			Toast.info("移除出错!",0.8)
		})
	}
	render() {
		return(
			<div className="player-list-item">
				<div onClick={ this.play } className="player-list-name font-break">{this.props.data.name} - <span>{this.props.data.singer}</span></div>
				<div className="player-list-remove" onClick={ this.remove }></div>
			</div>
		);
	}
}

export default playerListItem