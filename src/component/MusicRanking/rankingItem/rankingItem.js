import React, {
	PureComponent
} from 'react'
import './rankingItem.css'

class rankingItem extends PureComponent {
	constructor(props) {
		super(props)
		this.imgLoad = this.imgLoad.bind(this)
		this.toPages = this.toPages.bind(this)
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	componentWillUnmount() {
		
	}
	imgLoad(event){
		this.props.data.isLoding = false
		event.target.className = "load-img img-loadEnd"
	}
	toPages(){
		window.location.hash = "/rankitem/" + this.props.index + "/" + this.props.id
	}
	render() {
		return(
			<div className="box-grid-item" style={{width:this.props.w}} onClick={ this.toPages }>
				<div className="box-grid-item-img" style={{height:this.props.w}}>
					<img className={ !this.props.data.isLoaing ? "load-img img-loadEnd" : "load-img" } alt="" src={this.props.data.coverImgUrl + '?param=140y140'} onLoad={ this.imgLoad } />
					<img alt="" className="img-default" src="./img/default.jpg" />
				</div>
				<div className="box-grid-item-content font-break">
					<div className="font-break">{this.props.data.name}</div>
				</div>
				
			</div>
		);
	}
	timeForm(e) {
		let v = parseInt(e,10)
		if(v < 9999) {
			return v
		} else {
			return(v / 10000).toFixed(0) + '万'
		}
	}
}

export default rankingItem