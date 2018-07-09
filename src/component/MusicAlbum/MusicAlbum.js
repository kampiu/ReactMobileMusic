import React, {
	PureComponent,
	http
} from 'react'
import { connect } from 'react-redux'
import { changeType, changeMode, changeOffset, albumLoading, insertSongs } from './../../redux/reducers/MusicAlbumList'
import './MusicAlbum.css';
import { Toast } from 'antd-mobile'
import NavBar from './../navBar/navBar'
import BoxGridItem from './../boxGridItem/boxGridItem'
import AlbumMenu from './albumMenu/albumMenu'
import API from '../../comment/Api'


@connect(
  state=>({ album: state }),
  { changeType, changeMode, changeOffset, albumLoading, insertSongs }
)

class boxGrid extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			menu: false,
			refreshing: false
		}
		this.onScroll = this.onScroll.bind(this)
		this.changeMenu = this.changeMenu.bind(this)
	}
	componentWillMount() {
		if(this.props.album.albumList.loading) {
			Toast.loading('Loading...')
			http.get(API.getAlbum(this.props.album.albumList.type, 'hot', this.props.album.albumList.offset, true, this.props.album.albumList.limit)).then((res) => {
				this.props.insertSongs(res.data.playlists)
				this.props.changeOffset(this.props.album.albumList.offset + this.props.album.albumList.limit)
				this.props.albumLoading()
				Toast.hide()
			})
		}
	}
	componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll)
	}
	changeMenu() {
		this.setState({
			menu: !this.state.menu
		}, () => {
			document.getElementsByTagName("body")[0].style.overflow = this.state.menu ? "hidden" : "auto"
		})
	}
	changeAlbumType(e) {
		Toast.loading('Loading...')
		document.getElementById("album-menu-view").className = "album-menu-view-leave"
		let timer = setTimeout(() => {
			this.props.changeType(e)
			this.changeMenu()
			this.reloadData(e)
			clearTimeout(timer)
		}, 400)
	}
	reloadData(e) {
		http.get(API.getAlbum(this.props.album.albumList.type, 'hot', this.props.album.albumList.offset, true, this.props.album.albumList.limit)).then((res) => {
			Toast.hide()
			this.props.insertSongs(res.data.playlists)
			this.props.changeOffset(this.props.album.albumList.offset + this.props.album.albumList.limit)
		})
	}
	onScroll() {
		if(!this.props.album.albumList.loading && !this.state.refreshing && (document.body.offsetHeight - window.screen.height - document.getScrollTop() <= 600)) {
			this.setState({
				refreshing: true
			}, () => {
				http.get(API.getAlbum(this.props.album.albumList.type, 'hot', this.props.album.albumList.offset, true, this.props.album.albumList.limit)).then((res) => {
					this.setState({
						refreshing: false
					})
					this.props.insertSongs(res.data.playlists)
					this.props.changeOffset(this.props.album.albumList.offset + this.props.album.albumList.limit)
				})
			})
		}
	}
	render() {
		console.log("MusicAlbum --- render执行一次")
		return(
			<div className="albumlist-view">
				<NavBar title={"歌单"}></NavBar>
				<div className="albumlist-view-nav">
					<div className="albumlist-mask"></div>
					<div className="albumlist-mask-img"></div>
					<div className="albumlist-view-main">
						<img alt="" src="http://p4.music.126.net/iGkccsTmrXB2sStE9NfC-A==/109951163286464456.jpg" />
						<div className="albumlist-view-msg">
							<div className="albumlist-name">精品歌单</div>
							<div className="albumlist-msg">[摇曳着优雅与浪漫]三步华尔兹</div>
							<div className="albumlist-describe">共赴一场浪漫的舞会吧</div>
						</div>
					</div>
				</div>
				<div className="albumlist-view-content">
					<div className="albumlist-menu">
						<div id="albumlist-nav-select" onClick={ this.changeMenu }>{ this.props.album.albumList.type === "全部" ? '全部歌单' : this.props.album.albumList.type }</div>
					</div>
					{
						this.props.album.albumList.songs.map((item,index) => {
							return <BoxGridItem data={item} mode="album" key={ "album_" + item.id } width="3.54rem" ></BoxGridItem>
						})
					}
				</div>
				{
					this.state.menu ? <AlbumMenu type={ this.props.album.albumList.type }  show={ this.state.menu } typeFun={ this.changeAlbumType.bind(this) } fun={ this.changeMenu.bind(this) } ></AlbumMenu> : null
				}
			</div>
		);
	}
}

export default boxGrid