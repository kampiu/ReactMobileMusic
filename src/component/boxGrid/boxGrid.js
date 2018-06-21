import React, {
	Component
} from 'react'
import './boxGrid.css'
import { Toast } from 'antd-mobile'
import BoxGridItem from './../boxGridItem/boxGridItem'



class boxGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:this.props.data,
			title:this.props.title,
			url:this.props.url,
			mode:this.props.mode
		}
		this.toMore = this.toMore.bind(this)
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	toMore(){
		if(this.props.mode !== "radio"){
			window.location.hash = this.state.url
		}else{
			Toast.info("更多功能模块正在开发中...",0.8)
		}
	}
	render() {
		return(
			<div className="box-grid">
				<div className="box-grid-head">
					{this.state.title}
					<span onClick={this.toMore}>更多</span>
				</div>
				<div className="box-grid-body">
				{
					this.props.data.map((item,index) => {
						return <BoxGridItem data={item} mode={this.state.mode} key={index} width="2.4rem" ></BoxGridItem>
					})
				}
				</div>
			</div>
		);
	}
}

export default boxGrid