import React, {
	PureComponent,
	http
} from 'react'
import './search.css'
import { Toast } from 'antd-mobile'
import API from '../../comment/Api'
import { SearchBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { addSong, initSong } from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		msg: state
	}), {
		addSong,
		initSong
	}
)
class search extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			fouse: false,
			searchWord:"",
			tab:0,
			result:[]
		}
		this.onChange = this.onChange.bind(this);
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	onFocus() {
		this.setState({
			fouse: true,
		})
		document.getElementsByTagName("body")[0].style.overflow = "hidden"
	}
	onCancel() {
		this.setState({
			fouse: false,
			searchWord:"",
			result:[]
		})
		document.getElementsByTagName("body")[0].style.overflow = "auto"
	}
	onChange(e){
		this.setState({
			searchWord:e
		})
		this.searching()
	}
	searching(){
		http.get(API.getSearch(this.state.searchWord)).then(res => {
			console.log(res)
			if(res.code === 200 && res.result.songCount > 0){
				this.setState({
					result:res.result.songs
				})
			}
		}).catch((res)=>{
			console.log("catch",res)
		})
	}
	play(song) {
		let songs = {
			id: song.id,
			name: song.name,
			singer: song.artists[0].name,
			albumPic: song.album.artist.img1v1Url,
			songUrl: '',
			album: song.album.name
		}
		http.get(API.getMusicUrl(songs.id)).then((res) => {
			if(res.code === 200){
				songs.songUrl = res.data[0].url
				this.props.initSong(songs)
			}
		})
	}
	addSong(songs){
		let song = {
			id: songs.id,
			name: songs.name,
			singer: songs.artists[0].name,
			albumPic: songs.album.artist.img1v1Url,
			songUrl: '',
			album: songs.album.name
		}
		http.post(API.addSong(),{song:song}).then(res => {
			if(res.code === 200){
				this.props.addSong(song)
				Toast.info(res.msg,0.8)
			}else {
				Toast.info(res.msg,0.8)
			}
		}).catch((e)=>{
			console.log("N",e)
		})
	}
	render() {
		return(
			<div className="search-bar" style={ this.state.fouse ? {zIndex:"4000"} : {zIndex:"1000"} }>
				<div className="search-nav" style={ this.state.fouse ? {width:"0",opacity:"0"} : {width:"0.95rem",opacity:"1"} }>
					<div className="search-slide-menu"></div>
				</div>
		        <SearchBar onChange={(e)=>{ this.onChange(e) }} value={this.state.searchWord} onFocus={()=>{this.onFocus()}} onCancel={()=>{this.onCancel()}} placeholder="Search" maxLength={26} />
				<div className="search-nav" style={ this.state.fouse ? {width:"0",opacity:"0"} : {width:"0.95rem",opacity:"1"} }>
					<div className="search-play" onClick={ () => { window.location.hash = "/player" }}></div>
				</div>
				{
					this.state.fouse ? (
						<div className="search-view">
							<div className="search-word">{ this.state.searchWord === "" ? "" : '搜索："' + this.state.searchWord + '"'}</div>
							<div className="search-result-content">
								<ul className="search-result">
									{
										this.state.result.length > 0 ? (
											this.state.result.map((item,index) => {
												return (
													<li className="search-songs-item" key={"result_" + item.id}>
														<div className="search-songs-index">{ index + 1 }</div>
														<div className="search-songs-msg">
															<div className="search-songs-name">{item.name}</div>
															<div className="search-songs-singer">{ item.artists[0].name }</div>
														</div>
														<div className="search-songs-console">
															<img onClick={ () => { this.play(item) }} alt="" src="./img/album-list-play.png" />
															<img onClick={ () => { this.addSong(item) }} alt="" src="./img/album-list-coll.png" />
														</div>
													</li>
												)
											})
										) : null
									}
								</ul>
							</div>
						</div>
					) : ""
				}
				
			</div>
		);
	}
}

export default search