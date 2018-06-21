import React, {
	PureComponent
} from 'react'
import './exclusivePush.css'

class exclusivePush extends PureComponent{
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	render() {
		return(
			<div className="exclusivepush-view">
				<div className="box-grid-head">
					最新MV
					<span>更多</span>
				</div>
				<div className="flex-row-2">
					<div className="flex-row-item">
						<div className="flex-row-img" style={{backgroundImage: 'url("' + this.props.data[0].cover + '")' }}></div>
						<div className="flex-row-name font-break">{ this.props.data[0].name }</div>
						<div className="flex-row-creator font-break">{ this.props.data[0].artists[0].name }</div>
					</div>
					<div className="flex-row-item">
						<div className="flex-row-img" style={{backgroundImage: 'url("' + this.props.data[1].cover + '")' }}></div>
						<div className="flex-row-name font-break">{ this.props.data[1].name }</div>
						<div className="flex-row-creator font-break">{ this.props.data[1].artists[0].name }</div>
					</div>
				</div>
				<div className="flex-row-1">
					<div className="flex-row-item">
						<div className="flex-row-item">
							<div className="flex-row-img" style={{backgroundImage: 'url("' + this.props.data[2].cover + '")' }}></div>
							<div className="flex-row-name font-break">{ this.props.data[2].name }</div>
							<div className="flex-row-creator font-break">{ this.props.data[2].artists[0].name }</div>
						</div>
					</div>
				</div>
				<div className="flex-row-2">
					<div className="flex-row-item">
						<div className="flex-row-img" style={{backgroundImage: 'url("' + this.props.data[3].cover + '")' }}></div>
						<div className="flex-row-name font-break">{ this.props.data[3].name }</div>
						<div className="flex-row-creator font-break">{ this.props.data[3].artists[0].name }</div>
					</div>
					<div className="flex-row-item">
						<div className="flex-row-img" style={{backgroundImage: 'url("' + this.props.data[4].cover + '")' }}></div>
						<div className="flex-row-name font-break">{ this.props.data[4].name }</div>
						<div className="flex-row-creator font-break">{ this.props.data[4].artists[0].name }</div>
					</div>
				</div>
			</div>
		);
	}
}

export default exclusivePush