import React, {
	PureComponent
} from 'react'
import './cdListPut.css'
import { connect } from 'react-redux'

@connect(
	state => ({
		msg: state
	}), {
		
	}
)
class cdListPut extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			list:[{
				type:"ALL",
				name:"全部"
			},{
				type:"ZH",
				name:"华语"
			},{
				type:"EA",
				name:"欧美"
			},{
				type:"KR",
				name:"韩国"
			},{
				type:"JP",
				name:"日本"
			}]
		}
	}
	componentDidMount() {
		
	}
	render() {
		return(
			<div className="cd-list-select-put-menu">
				<div className="player-list-mask" onClick={ this.props.fun}></div>
				<div className="player-list-view" style={ this.props.data ? {bottom:"0"} : {bottom:"-9rem"}}>
					<div className="player-list-head">新碟类型</div>
					<div className="player-list-body">
					{
						this.state.list.map((item, index) => {
							return (
								<label className="cd-type-select-item" key={ item.type + item.name }>
									<input type="radio" name="cdType" checked={item.type === this.props.data ? true : false} data-attr={ item.type } onChange={ this.props.change } />
									<div className="cd-type-select-context">{item.name}</div>
								</label>
							)
						})
					}
					</div>
					<div className="player-list-foot" onClick={ this.props.fun }>关闭</div>
				</div>
			</div>
		);
	}
}

export default cdListPut