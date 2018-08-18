import React, {
	PureComponent
} from 'react'
import './boxGridItem.css'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { initSong } from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		initSong
	}
)

class boxGridItem extends PureComponent {
	constructor(props) {
		super(props)
		this.toPage = this.toPage.bind(this)
		this.loadImg = this.loadImg.bind(this)
	}
	componentWillMount() {
		
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	loadImg(e) {
		this.props.data.isLoding = false
		e.target.className = "load-img img-loadEnd"
	}
	toPage() {
		const song = this.props.data
		if(this.props.mode === "album") {
			window.location.hash = "/album/" + song.id
		} else if(this.props.mode === "song") {
			const data = {
				id: song.id,
				name: song.name,
				singer: song.artists[0].name,
				albumPic: song.picUrl,
				songUrl: '',
				album: song.artist.name
			}
			this.props.initSong(data)
		} else if(this.props.mode === "radio") {
			Toast.info("更多功能模块正在开发中...", 0.8)
		}
	}
	render() {
		return(
			<div className="box-grid-item" style={{width:this.props.width}} onClick={this.toPage}>
				<div className="box-grid-item-img" style={{height:this.props.width}}>
					{
						this.props.data.picUrl === undefined ? <img className={ !this.props.data.isLoaing ? "load-img img-loadEnd" : "load-img" } alt="" src={this.props.data.coverImgUrl + '?param=140y140'} onLoad={ this.loadImg } /> : <img className={ !this.props.data.isLoaing ? "load-img img-loadEnd" : "load-img" } alt="" src={this.props.data.picUrl + '?param=140y140'} onLoad={ this.loadImg } /> 
					}
					<img alt="" className="img-default" src="./img/default.jpg" />
					{
						this.props.data.playCount === undefined ? '' : <div className="box-grid-item-depict">{this.timeForm(this.props.data.playCount)}</div>
					}
				</div>
				<div className="box-grid-item-content font-break">
					<div className="font-break">{this.props.data.name}</div>
					{
						this.props.data.artists === undefined ? '' : <div className="box-grid-item-creator font-break">{this.props.data.artists[0].name}</div>
					}
				</div>
				
			</div>
		);
	}
	timeForm(e) {
		let v = parseInt(e, 10)
		if(v < 9999) {
			return v
		} else {
			return(v / 10000).toFixed(0) + '万'
		}
	}
}

export default boxGridItem