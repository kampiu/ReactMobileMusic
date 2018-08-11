import React, {
	PureComponent
} from 'react'
import './listBody.css'
import ListBodyItem from './listBodyItem/listBodyItem'
import CollectListItem from './collectListItem/collectListItem'
import playIcon from './album-play.png'

class listBody extends PureComponent {
	render() {
		return(
			<div className="album-list" key={this.props.index}>
				<div className="album-list-head">
					<div className="album-list-index">
						<img alt="" src={playIcon} />
					</div>
					<div className="play-all">全部播放<span>(共{this.props.data.length}首)</span>	</div>
					<div className="coll-all">收藏全部</div>
				</div>
				{
					this.props.data.map((item,index)=>{
						return (
							this.props.isCollection ? (<CollectListItem data={item} index={index} key={this.props.index + item.id + index}></CollectListItem>) : (<ListBodyItem data={item} index={index} key={this.props.index + item.id + index}></ListBodyItem>)
						)
					})
				}
			</div>
		);
	}
}

export default listBody