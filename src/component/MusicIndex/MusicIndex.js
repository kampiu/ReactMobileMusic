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
		http.get(API.getHome()).then(res => {
			if(res.code === 200) {
				this.props.initTab(res.data.banner)
				this.props.initMusic(res.data.playlist)
				this.props.initCD(res.data.cd)
				this.props.initMV(res.data.mv)
				this.props.initRadio(res.data.radio)
				this.props.indexLoading()
			}
			Toast.hide()
		}).catch(err => {
			Toast.info('数据加载失败!', 1)
		})
	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	onload() {
		window.dispatchEvent(new Event('resize'))
	}
	render() {
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