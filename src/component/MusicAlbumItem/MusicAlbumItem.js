import React, {
	PureComponent,
	http
} from 'react'
import API from '../../comment/Api'
import './MusicAlbumItem.css'
import { Toast } from 'antd-mobile'
import ListHeader from './../listHeader/listHeader'
import ListBody from './../listBody/listBody'
import { connect } from 'react-redux'
import { ai_change, ai_init, ai_initInfo } from './../../redux/reducers/MusicAlbumItem'

@connect(
	state => ({
		msg: state
	}), {
		ai_change,
		ai_init,
		ai_initInfo
	}
)

class MusicAlbumItem extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			loading:true
		}
	}
	componentWillMount() {
		document.documentElement.scrollTop = 0
		if(this.props.match.params.id !== this.props.msg.albumItem.albumId){
			Toast.loading('Loading...',8000)
			http.get(API.getAlbumList(this.props.match.params.id)).then(res => {
				let { tracks:list  , ...info } = res.result
				this.props.ai_init(list)
				this.props.ai_change(this.props.match.params.id)
				this.props.ai_initInfo(info)
				this.setState({
					loading:false
				})
				Toast.hide()
			})
		}else{
			this.setState({
				loading:false
			})
		}
	}
	render() {
		return(
			<div className="album-view">
				{
					this.state.loading ? <div></div> :  <ListHeader data={ this.props.msg.albumItem.info } key={"albumhead" + this.props.msg.albumItem.albumId}></ListHeader>
				}
				{
					this.state.loading ? <div></div> :  <ListBody data={ this.props.msg.albumItem.songsList } index="MusicAI" key={"albumlist" + this.props.msg.albumItem.albumId }></ListBody>
				}
			</div>
		);
	}
}



export default MusicAlbumItem