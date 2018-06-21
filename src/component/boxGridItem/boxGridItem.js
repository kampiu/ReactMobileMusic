import React, {
	PureComponent
} from 'react'
import './boxGridItem.css'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { initSong } from './../../redux/reducers/MusicPlayer'
import API from '../../comment/Api'

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
		this.state = {
			data: this.props.data
		}
		this.toPage = this.toPage.bind(this)
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	componentWillUnmount() {
		
	}
	toPage(){
		const song = this.state.data
		if(this.props.mode === "album"){
			window.location.hash = "/album/" + song.id
		}else if(this.props.mode === "song"){
			const data = {
				id: song.id,
				name: song.name,
				singer: song.artists[0].name,
				albumPic: song.picUrl,
				songUrl: '',
				album: song.artist.name
			}
			this.props.initSong(data)
		}else if(this.props.mode === "radio"){
			Toast.info("更多功能模块正在开发中...",0.8)
		}
	}
	render() {
		return(
			<div className="box-grid-item" style={{width:this.props.width}} onClick={this.toPage}>
				<div className="box-grid-item-img" style={{height:this.props.width}}>
					{
						this.state.data.picUrl === undefined ? <img className="load-img" alt="" src={this.state.data.coverImgUrl} onLoad={(e)=>{this.imgLoad(e)}} /> : <img className="load-img" alt="" src={this.state.data.picUrl} onLoad={(e)=>{this.imgLoad(e)}} /> 
					}
					<img alt="" className="img-default" src="./img/default.jpg" />
					{
						this.state.data.playCount === undefined ? '' : <div className="box-grid-item-depict">{this.timeForm(this.state.data.playCount)}</div>
					}
				</div>
				<div className="box-grid-item-content font-break">
					<div className="font-break">{this.state.data.name}</div>
					{
						this.state.data.artists === undefined ? '' : <div className="box-grid-item-creator font-break">{this.state.data.artists[0].name}</div>
					}
				</div>
				
			</div>
		);
	}
	timeForm(e) {
		let v = parseInt(e)
		if(v < 9999) {
			return v
		} else {
			return(v / 10000).toFixed(0) + '万'
		}
	}
	imgLoad(e){
		e.target.className = "load-img img-loadEnd"
	}
}

export default boxGridItem