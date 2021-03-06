import React, {
	PureComponent,
	http
} from 'react'
import { Toast, SwipeAction, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { addSong, initSong } from './../../../redux/reducers/MusicPlayer'
import API from '../../../comment/Api'

const alert = Modal.alert

@connect(
	state => ({
		msg: state
	}), {
		addSong,
		initSong
	}
)

class listBodyItem extends PureComponent {
	constructor(props) {
		super(props)
		this.play = this.play.bind(this)
		this.removeSong = this.removeSong.bind(this)
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	play() {
		http.get(API.getMusicUrl(this.props.data.id)).then((res) => {
			if(res.code === 200) {
				this.props.data.songUrl = res.data[0].url
				this.props.initSong(this.props.data)
			}
		})
	}
	dialogDel() {
		alert('Delete', 'Are you sure???', [{
				text: 'Cancel'
			},
			{
				text: 'Ok',
				onPress: () =>
					new Promise(resolve => {
						http.post(API.removeSong(), {
							song: this.props.data
						}).then(res => {
							console.log(res)
							res.code === 200 && this.props.removeSong(this.props.data)
							resolve()
						}).catch(err => {
							console.log("移除歌曲chucuoc", err)
						})
					}),
			},
		])
	}
	removeSong(e) {
		this.dialogDel()
	}
	render() {
		return(
			<SwipeAction style={{ backgroundColor: '#FFF' }} autoClose right={[{text: 'Cancel', onPress: this.close, style: { backgroundColor: '#ddd', color: 'white' }, },
	    			{ text: 'Remove', onPress: this.removeSong, style: { backgroundColor: '#F4333C', color: 'white' }, }, ]} >
				<div className="album-list-item">
					<div className="album-list-index">{this.props.index + 1}</div>
					<div className="colection-list-song">
						<div className="album-list-name">{this.props.data.name}</div>
						<div className="album-list-singer font-break">{this.props.data.artists ? this.props.data.artists[0].name : (this.props.data.singer ? this.props.data.singer : this.props.data.ar[0].name)}</div>
					</div>
					<div className="album-list-console">
						<img onClick={ this.play } alt="" src="./img/album-list-play.png" />
					</div>
				</div>
		    </SwipeAction>
		)
	}
}

export default listBodyItem