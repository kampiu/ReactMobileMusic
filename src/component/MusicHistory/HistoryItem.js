import React, {
	PureComponent,
	http
} from 'react'
import './MusicHistory.css'
import { Toast } from 'antd-mobile'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import {
	removeSong,
	initSong
} from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		removeSong,
		initSong
	}
)

class MusicHistory extends PureComponent {
	constructor(props) {
		super(props)
		this.play = this.play.bind(this)
		this.remove = this.remove.bind(this)
	}
	play() {
		this.props.initSong(this.props.data)
	}
	remove() {
		http.post(API.removeSong(), {
			song: this.props.data
		}).then((res) => {
			if(res.code === 200) {
				this.props.removeSong(this.props.data)
			}
			Toast.info(res.msg, 0.8)
		}).catch((e) => {
			Toast.info("移除出错!", 0.8)
		})
	}
	render() {
		return(
			<div className="collection-item">
				<div className="collection-index">{this.props.index + 1}</div>
				<div className="collection-msg">
					<div className="collection-name">{this.props.data.name}</div>
					<div className="collection-singer">{this.props.data.singer}</div>
				</div>
				<div className="collection-console">
					<span onClick={ this.play }></span>
					<span onClick={ this.remove }></span>
				</div>
			</div>
		);
	}
}

export default MusicHistory