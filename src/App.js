import React, {
	Component,
	http
} from 'react'
import './App.css'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import { HashRouter as Router, Route, Link } from "react-router-dom"
import Loading from './component/loading/loading'
import Audio from './component/audio/audio'
import API from './comment/Api'
//Component
//redux
import Cookies from 'js-cookie'
import { u_login, u_expiry, u_updateInfo } from './redux/reducers/MusicUser'

//Ant
import { TabBar } from 'antd-mobile'


//懒加载 view
const MusicIndex = Loadable({
	loader: () =>
		import('./component/MusicIndex/MusicIndex'),
	loading: Loading,
	timeout: 10000
})
const MusicRanking = Loadable({
	loader: () =>
		import('./component/MusicRanking/MusicRanking'),
	loading: Loading,
	timeout: 10000
})
const MusicRankingItem = Loadable({
	loader: () =>
		import('./component/MusicRankingItem/MusicRankingItem'),
	loading: Loading,
	timeout: 10000
})
const MusicCollection = Loadable({
	loader: () =>
		import('./component/MusicCollection/MusicCollection'),
	loading: Loading,
	timeout: 10000
})
const MusicPersonal = Loadable({
	loader: () =>
		import('./component/MusicPersonal/MusicPersonal'),
	loading: Loading,
	timeout: 10000
})
const MusicAlbum = Loadable({
	loader: () =>
		import('./component/MusicAlbum/MusicAlbum'),
	loading: Loading,
	timeout: 10000
})
const MusicAlbumItem = Loadable({
	loader: () =>
		import('./component/MusicAlbumItem/MusicAlbumItem'),
	loading: Loading,
	timeout: 10000
})
const MusicPlayer = Loadable({
	loader: () =>
		import('./component/MusicPlayer/MusicPlayer'),
	loading: Loading,
	timeout: 10000
})
const MusicSetting = Loadable({
	loader: () =>
		import('./component/MusicSetting/MusicSetting'),
	loading: Loading,
	timeout: 10000
})
const MusicModifyUpload = Loadable({
	loader: () =>
		import('./component/MusicModifyUpload/MusicModifyUpload'),
	loading: Loading,
	timeout: 10000
})

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_expiry,
		u_updateInfo
	}
)
//10-7B-44-49-A5-36

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'musicTab',
			hidden: false
		};
	}
	componentWillMount(){
		console.log(Cookies.get())
//		if(Cookies.get().accessToken){
			http.post(API.acount()).then((res) => {
				console.log(res)
				if(res.data.code === 200) {
					this.props.u_updateInfo(res.data.data.user)
				}
			})
//		}
	}
	componentDidMount() {
		
	}
	componentWillReceiveProps(newProps) {
		
	}
	shouldComponentUpdate(newProps, newState) {
		return true;
	}
	componentWillUpdate(nextProps, nextState) {
		
	}
	componentDidUpdate(prevProps, prevState) {
		
	}
	componentWillUnmount() {
		
	}
	render() {
		return(
			<div className="App">
			    <Router>
			        <div className="app-box-view">
				        <Route exact path="/" component={ MusicIndex } />
				        <Route path="/ranking" component={ MusicRanking } />
				        <Route key="collection" path="/collection" component={ MusicCollection } />
						<Route path="/personal" component={ MusicPersonal } />
						<Route path="/albumlist" component={ MusicAlbum } />
						<Route path="/album/:id" component={ MusicAlbumItem } />
						<Route path="/player" component={ MusicPlayer } />
						<Route path="/rankitem/:index/:id" component={ MusicRankingItem } />
						<Route path="/setting" component={ MusicSetting } />
						<Route path="/modifyUpload" component={ MusicModifyUpload } />
						<Route key="history" path="/history" component={ MusicCollection } />
			        </div>
				</Router>
		        <div className="App-tabbar">
			        <TabBar unselectedTintColor="#7F7F7F" tintColor="#5179F1" barTintColor="white" hidden={this.state.hidden} >
			            <TabBar.Item title="Music" key="Music" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_music.svg) center center /  21px 21px no-repeat' }} /> }
			            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_music.svg) center center /  21px 21px no-repeat' }} /> }
			            	selected={this.state.selectedTab === 'musicTab'}
			            	onPress={() => { 
			            		this.setState({selectedTab: 'musicTab'})    
			            		window.location.hash = "/"
			            	}}>
			            </TabBar.Item>
			            
			            <TabBar.Item title="Ranking" key="Ranking" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_sort.svg) center center /  21px 21px no-repeat' }} /> }
			            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_sort.svg) center center /  21px 21px no-repeat' }} /> }
			            	selected={this.state.selectedTab === 'rankingListTab'}
			            	onPress={() => { 
			            		this.setState({selectedTab: 'rankingListTab'})    
			            		window.location.hash = "/ranking"
			            	}}>
			            </TabBar.Item>
			            
			            <TabBar.Item title="Collection" key="Collection" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_collection.svg) center center /  21px 21px no-repeat' }} /> }
			            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_collection.svg) center center /  21px 21px no-repeat' }} /> }
			            	selected={this.state.selectedTab === 'collectionTab'}
			            	onPress={() => { 
			            		this.setState({selectedTab: 'collectionTab'})    
			            		window.location.hash = "/collection"
			            	}}>
			            </TabBar.Item>
			            
			            <TabBar.Item title="Personal" key="Personal" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_personal.svg) center center /  21px 21px no-repeat' }} /> }
			            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_personal.svg) center center /  21px 21px no-repeat' }} /> }
			            	selected={this.state.selectedTab === 'personalTab'}
			            	onPress={() => { 
			            		this.setState({selectedTab: 'personalTab'})    
			            		window.location.hash = "/personal"
			            	}}>
			            </TabBar.Item>
		        	</TabBar>
		        </div>
				<Audio></Audio>
		    </div>
		);
	}
}

export default App;