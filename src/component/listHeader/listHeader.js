import React, {
	PureComponent
} from 'react'
import NavBar from './../navBar/navBar'
import './listHeader.css'
import { connect } from 'react-redux'
import {
	removeSong
} from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		removeSong
	}
)

class listHeader extends PureComponent {
	render() {
		let img = this.props.isCollect ? this.props.msg.user.picUrl : this.props.data.coverImgUrl
		return(
			<div className="album-view-head">
				<NavBar title={"歌单"}></NavBar>
				<div className="album-view-content">
					<div className="album-view-img">
						<img alt="" src={ img } />
					</div>
					<div className="album-view-main">
						<div className="album-view-name">{this.props.data.name ? this.props.data.name : this.props.msg.user.nickName }</div>
						<div className="album-view-create">
							<img alt="" src={ this.props.data.creator ? this.props.data.creator.avatarUrl : this.props.msg.user.picUrl } />
							{ this.props.data.creator ? this.props.data.creator.nickname : this.props.msg.user.nickName }
						</div>
					</div>
				</div>
				<div id="album-view-mark" style={{ backgroundImage: "url('" + img + "')" }}></div>
				<div className="album-view-mark-view"></div>
			</div>
		)
	}
}

export default listHeader