import React, {
	PureComponent,
	http
} from 'react'
import BoxGrid from './../boxGrid/boxGrid' 
import ExclusivePush from './exclusivePush/exclusivePush' 
import Search from './../search/search'
import { Carousel, WingBlank, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { initMusic, initTab, initCD, initMV, initRadio, indexLoading } from './../../redux/reducers/MusicIndex'
import './MusicIndex.css'
import API from '../../comment/Api'

@connect(
	state => ({
		data: state
	}), {
		initMusic,
		initTab,
		initCD,
		initMV,
		initRadio,
		indexLoading
	}
)

class MusicIndex extends PureComponent {
	componentWillMount() {
		if(this.props.data.index.loading) {
			Toast.loading('Loading...')
			this.initData()
		}
		this.onload = this.onload.bind(this)
	}
	initData() {
		let count = 5
		http.get(API.getBananer()).then((res) => {
			this.props.initTab(res.data.banners)
			if(--count === 0) {
				this.props.indexLoading()
				Toast.hide()
			}
		})
		http.get(API.getAlbum('全部', 'hot', 0, true, 9)).then((res) => {
			this.props.initMusic(res.data.playlists)
			if(--count === 0) {
				this.props.indexLoading()
				Toast.hide()
			}
		})
		http.get(API.getNewCd(0, 9, 'All')).then((res) => {
			this.props.initCD(res.data.albums)
			if(--count === 0) {
				this.props.indexLoading()
				Toast.hide()
			}
		})
		http.get(API.getnewMv()).then((res) => {
			let arr = []
			for(let i = 0; i < 5; i++) {
				arr.push(res.data.data[i])
			}
			this.props.initMV(arr)
			if(--count === 0) {
				this.props.indexLoading()
				Toast.hide()
			}
		})
		http.get(API.getRadioStation()).then((res) => {
			let arr = []
			for(let i = 0; i < 9; i++) {
				arr.push(res.data.djRadios[i])
			}
			this.props.initRadio(arr)
			if(--count === 0) {
				this.props.indexLoading()
				Toast.hide()
			}
		})
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	onload(){
		window.dispatchEvent(new Event('resize'))
	}
	render() {
		console.log("Index --- render执行一次")
		return(
			<div className="app-view">
			    {
			        this.props.data.index.loading ? <div></div> : (
			        	<div>
							<Search></Search>
							<WingBlank key="tabImg">
						        <Carousel autoplay={true} infinite beforeChange={(from, to) => {}} afterChange={index =>  {}} >
						       		{
						       			this.props.data.index.tabImg.map((item,index) => {
						        			return <img src={item.pic} alt="" key={"Adv" + index} style={{ width: '100%', verticalAlign: 'top' }} onLoad={ this.onload } />
						        		})
						       		}
						        </Carousel>
						    </WingBlank>
						    <BoxGrid data={this.props.data.index.musicList} key="boxGrid-album" title="推荐歌单" mode="album" url="/albumlist"></BoxGrid>
						    <ExclusivePush data={this.props.data.index.mv} key="boxGrid-mv"></ExclusivePush>
						    <BoxGrid data={this.props.data.index.cd} key="boxGrid-song" title="最新音乐" mode="song" url="/song"></BoxGrid>
						    <BoxGrid data={this.props.data.index.radio} key="boxGrid-radios" title="主播电台" mode="radio" url="/radio"></BoxGrid>
					    </div>
			        )
			    }
			</div>
		);
	}
}
export default MusicIndex