import React, {
	PureComponent
} from 'react'
import './titleBar.css'

class titleBar extends PureComponent {
	constructor(props) {
		super(props)
		this.scrollToTop = this.scrollToTop.bind(this)
		this.toPages = this.toPages.bind(this)
		this.back = this.back.bind(this)
	}
	componentWillMount() {
		
		
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
		
	}
	scrollToTop(){
		document.documentElement.scrollTop = 0
	}
	toPages(){
		window.location.hash = "/player"
	}
	back(){
		window.history.go(-1)
	}
	render() {
		return(
			<div className="titlebar-view" style={{backgroundColor: this.props.isCollection ? 'rgba(0,0,0,0)' : '#5179F1'}}>
				{
					this.props.back ? <div className="titlebar-nav-back" onClick={ this.back }></div> : null
				}
				<span onClick={ this.scrollToTop }>{ this.props.title }</span>
				<div className="titlebar-nav" onClick={ this.toPages }></div>
			</div>
		);
	}
}

export default titleBar