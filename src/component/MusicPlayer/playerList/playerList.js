import React, {
	PureComponent
} from 'react'
import './playerList.css'
import { connect } from 'react-redux'
import PlayerListItem from './playerListItem'

@connect(
	state => ({
		msg: state
	}), {
		
	}
)
class playerList extends PureComponent {
	componentDidMount() {
		
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
								<PlayerListItem data={item} key={'playlist-item-' + item.id}></PlayerListItem>
							)
						})
					}
					</div>
					<div className="player-list-foot" onClick={ this.props.fun }>关闭</div>
				</div>
			</div>
		)
	}
}

export default playerList