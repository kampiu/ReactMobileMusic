import React, {
	PureComponent,
	http
} from 'react'
import Search from './../search/search'
import RankingItem from './rankingItem/rankingItem'
import './MusicRanking.css'
import API from '../../comment/Api'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { r_init, r_loading } from './../../redux/reducers/MusicRanking'

@connect(
	state => ({
		msg: state
	}), {
		r_init,
		r_loading
	}
)


class MusicRanking extends PureComponent {
	componentWillMount() {
		if(this.props.msg.ranking.loading){
			Toast.loading('Loading...',10)
			http.get(API.getRanking()).then((res) => {
				this.props.r_init(res.list)
				this.props.r_loading()
				Toast.hide()
			})
		}
		
	}
	componentDidMount() {
		
	}
	render() {
		if(!this.props.msg.ranking.loading){
			return(
				<div className="ranking-view">
					<Search></Search>
					<div className="ranking-title">官方排行榜</div>
					{
						this.props.msg.ranking.rank.map((item,index) => {
							if(index < 5){
								return (
									<div className="ranking-item" key={item.id} onClick={ () => { window.location.hash = "/rankitem/" + index + "/" + item.id }}>
										<div className="ranking-img">
											<img alt="" src={item.coverImgUrl + '?param=140y140'} />
										</div>
										<div className="ranking-list">
											{
												item.list.map((it,ind) => {
													return (
														<div className="ranking-list-item" key={item.id + ind}>
															<div className="ranking-item-name">{it.name}</div>
															<div className="ranking-item-singer">( { it.ar[0].name} )</div>
														</div>
													)
												})
											}
										
									</div>
								</div>
								)
							}else{
								return 
							}
								
						})
					}
					<div className="ranking-title">官方排行榜</div>
					{
						this.props.msg.ranking.rank.map((item,index) => {
							if(index >= 5){
								return <RankingItem data={item} key={item.id} w={"2.4rem"} index={index} id={item.id}></RankingItem>
							}
						})
					}
					
				</div>
			)
		}else{
			return (
				<div className="ranking-view"></div>
			)
		}
	}
}

export default MusicRanking