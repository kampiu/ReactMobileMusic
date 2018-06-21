import React, {
	PureComponent,
	http
} from 'react'
import API from '../../comment/Api'
import './MusicRankingItem.css'
import { Toast } from 'antd-mobile'
import ListHeader from './../listHeader/listHeader'
import ListBody from './../listBody/listBody'
import { connect } from 'react-redux'
import { r_change } from './../../redux/reducers/MusicRanking'

@connect(
	state => ({
		msg: state
	}), {
		r_change
	}
)

class MusicRankingItem extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			loading:true
		}
	}
	componentWillMount() {
		if(this.props.msg.ranking.target.id !== this.props.match.params.id){
			Toast.loading('Loading...',10)
			http.get(API.getMusicSort(this.props.match.params.index)).then((res) => {
				const { creator:_creator,coverImgUrl:_coverImgUrl,name:_name,tracks:_tracks ,...removes} = res.data.playlist
				let obj = {
					id:this.props.match.params.id,
					playlist:{
						creator:_creator,
						coverImgUrl:_coverImgUrl,
						name:_name,
						tracks:_tracks
					}
				}
				this.props.r_change(obj)
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
					this.state.loading ? <div></div> :  <ListHeader data={this.props.msg.ranking.target.playlist} key={"RankListHead" + this.props.match.params.id}></ListHeader>
				}
				{
					this.state.loading ? <div></div> :  <ListBody data={this.props.msg.ranking.target.playlist.tracks} index="MusicRI" key={"RankListBox" + this.props.match.params.id}></ListBody>
				}
			</div>
		);
	}
}


export default MusicRankingItem