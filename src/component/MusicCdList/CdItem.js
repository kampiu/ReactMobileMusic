import React, {
	PureComponent
} from 'react'
import { connect } from 'react-redux'
import { initSong } from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		initSong
	}
)

class MusicCdList extends PureComponent {
	constructor(props) {
		super(props)
		this.play = this.play.bind(this)
	}
	componentWillMount() {
		
	}
	play(){
		const data = {
			id: this.props.data.id,
			name: this.props.data.name,
			singer: this.props.data.artists[0].name,
			albumPic: this.props.data.picUrl,
			songUrl: '',
			album: this.props.data.artist.name
		}
		this.props.initSong(data)
	}
	render() {
		return(
			<div className="cd-item-view">
				<div className="cd-img-box-default" onClick={ this.play }></div>
				<div className="cd-img-box" style={{backgroundImage: 'url(' + this.props.data.picUrl + ')'}}></div>
				<div className="cd-title-box font-break">{this.props.data.name}</div>
				<div className="cd-create-box font-break">{this.props.data.artists[0].name}</div>
			</div>
		);
	}
}


export default MusicCdList