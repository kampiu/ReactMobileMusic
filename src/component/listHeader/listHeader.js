import React, {
	PureComponent
} from 'react'
import NavBar from './../navBar/navBar'
import './listHeader.css'

class listHeader extends PureComponent {
	constructor(props) {
		super(props)
		console.log("head",this.props)
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	render() {
		return(
			<div className="album-view-head">
				<NavBar title={"歌单"}></NavBar>
				<div className="album-view-content">
					<div className="album-view-img">
						<img alt="" src={this.props.data.coverImgUrl} />
					</div>
					<div className="album-view-main">
						<div className="album-view-name">{this.props.data.name}</div>
						<div className="album-view-create">
							<img alt="" src={this.props.data.creator.avatarUrl} />
							{this.props.data.creator.nickname}
						</div>
					</div>
				</div>
				<div id="album-view-mark" style={{ backgroundImage: ("url('" + this.props.data.coverImgUrl + "')")}}></div>
				<div className="album-view-mark-view"></div>
			</div>
		)
	}
}

export default listHeader