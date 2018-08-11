import React, {
	PureComponent
} from 'react'
import './navBar.css'

class navBar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			title:this.props.title,
			scroll:0
		}
		this.onScroll = this.onScroll.bind(this)
		this.scrollToTop = this.scrollToTop.bind(this)
		this.toPages = this.toPages.bind(this)
	}
	componentWillMount() {
		
		
	}
	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}
	onScroll() {
		this.setState({
			scroll:document.getScrollTop()
		})
	}
	scrollToTop(){
		document.documentElement.scrollTop = 0
	}
	toPages(){
		window.location.hash = "/player"
	}
	render() {
		return(
			<div className="navbar-view" style={ this.state.scroll > 280 ? {backgroundColor:"#5179F1"} : {backgroundColor:"rgba(0,0,0,0)"}}>
				<div className="navbar-nav" onClick={ () => { window.history.go(-1) }}></div>
				<span onClick={ this.scrollToTop }>{ this.state.title }</span>
				<div className="navbar-nav" onClick={ this.toPages }></div>
			</div>
		);
	}
}

export default navBar