import React, {
	PureComponent
} from 'react'
import './MusicNoFound.css'

class MusicNoFound extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			
		}
		this.toBack = this.toBack.bind(this)
	}
	componentWillMount() {
		
		
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
		
	}
	toBack(){
		window.location.hash = "/"
	}
	render() {
		return(
			<div className="noFound-view">
				<div className="titlebar-nav-back" onClick={ this.toBack }></div>
				<div className="onFound-box">404页面不存在</div>
			</div>
		);
	}
}

export default MusicNoFound