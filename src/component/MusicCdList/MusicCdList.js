import React, {
	PureComponent,
	http
} from 'react'
import { connect } from 'react-redux'
import { cd_initloading, add_cdlist, init_cd_type } from './../../redux/reducers/MusicCdList'
import { PullToRefresh, Toast } from 'antd-mobile'
import TitleBar from './../titleBar/titleBar'
import CdItem from './CdItem'
import API from '../../comment/Api'
import './MusicCdList.css'
import CdListPut from './cdListPut/cdListPut'

@connect(
	state => ({
		data: state
	}), {
		cd_initloading,
		init_cd_type,
		add_cdlist
	}
)

class MusicCdList extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			menu: false,
			down: false,
			refreshing: false,
			height:document.documentElement.clientHeight - 142
		}
		this.onScroll = this.onScroll.bind(this)
		this.toggleList = this.toggleList.bind(this)
	}
	componentWillMount() {
		if(this.props.data.cd.loading) {
			Toast.loading('Loading...')
			this.refreshCd(() => {
				this.props.cd_initloading()
				Toast.hide()
			})
		}
	}
	refreshCd(callback){
		http.get(API.getNewCd(this.props.data.cd.offset, this.props.data.cd.limit, this.props.data.cd.type)).then(res => {
			console.log(res)
			if(res.code === 200){
				this.props.add_cdlist(res.albums)
			}
			callback && callback()
		})
	}
	onScroll(){
		if(!this.props.data.cd.loading && !this.state.refreshing && (document.body.offsetHeight - window.screen.height - document.getScrollTop() <= 600)) {
			this.setState({
				refreshing: true
			}, () => {
				this.refreshCd(() => {
					this.setState({
						refreshing: false
					})
				})
			})
		}
	}
	setType(e){
		this.props.init_cd_type(e.target.getAttribute("data-attr"))
		this.refreshCd()
		this.toggleList()
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
		
	}
	chooseType(){
		let name = ""
		switch(this.props.data.cd.type){
			case "ALL": name = "全部"
				break
			case "ZH": name = "华语"
				break
			case "EA": name = "欧美"
				break
			case "KR": name = "韩国"
				break
			case "JP": name = "日本"
				break
			default: name = "全部"
				break
		}
		return name
	}
	toggleList() {
		this.setState({
			menu: !this.state.menu
		})
	}
	render() {
		return(
			<div className="cdlist-view">
				<TitleBar title={"新碟上架"} back={true}></TitleBar>
				<div className="cd-list-menu">
					<div className="cd-list-nav" onClick={ this.toggleList }>{ this.chooseType() }</div>
				</div>
				<PullToRefresh damping={ 200 } ref={el => this.ptr = el} distanceToRefresh={38}
	        		style={{ height: this.state.height, overflow: 'auto', }}
	        		indicator={{ activate: '放开我加载...',deactivate: '上拉加载',release: '正努力加载...',finish: '加载完成' }}
			        direction={'up'}
			        refreshing={ this.state.refreshing }
			        onRefresh={ this.onScroll }>
					<div className="cd-view-content">
					{
						this.props.data.cd.cdList.map((item, index) => {
							return <CdItem data={ item } key={ 'cd-item' + item.id }></CdItem>
						})
					}
					</div>
	      		</PullToRefresh>
	      		{
	      			this.state.menu ? (<CdListPut fun={ this.toggleList.bind(this) } data={ this.props.data.cd.type } key="playlist-put" change={ this.setType.bind(this) }></CdListPut>) : null
	      		}
			</div>
		);
	}
}


export default MusicCdList