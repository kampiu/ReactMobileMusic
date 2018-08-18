import React, {
	Component,
	http
} from 'react'
import './App.css'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import MusicLogin from './component/MusicLogin/MusicLogin'
import MusicNoFound from './component/MusicNoFound/MusicNoFound'
import Audio from './component/audio/audio'
import { connect } from 'react-redux'
import { u_login, u_updateInfo } from './redux/reducers/MusicUser'
import { p_initsonglist } from './redux/reducers/MusicPlayer'
import { TabBar, Toast } from 'antd-mobile'
import router from './router/router'
import API from './comment/Api'

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_updateInfo,
		p_initsonglist
	}
)

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'musicTab',
			hidden: false
		}
		this.noFound = this.noFound.bind(this)
	}
	noFound() {
		return(
			<MusicNoFound></MusicNoFound>
		)
	}
	componentWillMount() {
		if(this.props.data.user.token === "" && localStorage.getItem("music_billson_token")) {
			http.post(API.getUserInfo()).then(res => {
				if(res.code !== 200 && window.location.hash.indexOf("collection") !== -1) {
					window.location.hash = "/"
				}
				res.code === 200 && this.props.u_updateInfo(res.result.data[0])
				Toast.info(res.msg, 0.8)
				this.initList()
			}).catch(err => {
				Toast.info('登录出错!', 1)
			})
		}
	}
	initList() {
		http.post(API.getUserList()).then(res => {
			res.code === 200 && this.props.p_initsonglist(res.result.col_list)
			res.code !== 200 && localStorage.removeItem("music_billson_token")
			Toast.info(res.msg, 0.8)
		}).catch(err => {
			Toast.info('获取收藏列表失败!', .8)
		})
	}
	componentDidMount() {

	}
	componentWillReceiveProps(newProps) {

	}
	shouldComponentUpdate(newProps, newState) {
		return true
	}
	componentWillUpdate(nextProps, nextState) {

	}
	componentDidUpdate(prevProps, prevState) {

	}
	componentWillUnmount() {

	}
	render() {
		return(
			<Router>
		    	<Route 
			    	render={({location}) => (
			    		location.pathname === "/login" ? <MusicLogin></MusicLogin> : (
			    		<div>
				            <TransitionGroup>
				            	<CSSTransition key={location.pathname + 'keys'} classNames={(location.pathname.indexOf("player") !== -1 || location.pathname.indexOf("setting") !== -1 || location.pathname.indexOf("history") !== -1 || location.pathname.indexOf("albumlist") !== -1) ? "left" : "none"}
				            			timeout={(location.pathname.indexOf("player") !== -1 || location.pathname.indexOf("setting") !== -1 || location.pathname.indexOf("history") !== -1 || location.pathname.indexOf("albumlist") !== -1) ? 120 : 0}>
					                <Switch location={location}>
					                {
						                router.map((item, index) => {
			               					return (
					               				<Route key={item.name + "route-key"} path={item.path} exact render={
					               					props =>
						                				(!item.auth ? <item.component key={item.name} {...props} /> : (localStorage.getItem("music_billson_token") ? <item.component key={item.name} {...props} /> : <Redirect to='/login' /> ))
						                			} 
						                		/>
				                			)
				            			})
					                }
					                <Route render={ this.noFound } />
					                </Switch>
				            	</CSSTransition>
				            </TransitionGroup>
					        <div className="App-tabbar">
						        <TabBar unselectedTintColor="#7F7F7F" tintColor="#5179F1" barTintColor="white" hidden={this.state.hidden} >
						            <TabBar.Item title="音乐" key="Music" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_music.svg) center center /  21px 21px no-repeat' }} /> }
						            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_music.svg) center center /  21px 21px no-repeat' }} /> }
						            	selected={this.state.selectedTab === 'musicTab'}
						            	onPress={() => { 
						            		this.setState({selectedTab: 'musicTab'})    
						            		window.location.hash = "/"
						            	}}>
						            </TabBar.Item>
						            <TabBar.Item title="排行榜" key="Ranking" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_sort.svg) center center /  21px 21px no-repeat' }} /> }
						            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_sort.svg) center center /  21px 21px no-repeat' }} /> }
						            	selected={this.state.selectedTab === 'rankingListTab'}
						            	onPress={() => { 
						            		this.setState({selectedTab: 'rankingListTab'})    
						            		window.location.hash = "/ranking"
						            	}}>
						            </TabBar.Item>
						            <TabBar.Item title="收藏" key="Collection" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_collection.svg) center center /  21px 21px no-repeat' }} /> }
						            	selectedIcon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_active_collection.svg) center center /  21px 21px no-repeat' }} /> }
						            	selected={this.state.selectedTab === 'collectionTab'}
						            	onPress={() => { 
						            		this.setState({selectedTab: 'collectionTab'})    
						            		window.location.hash = "/collection"
						            	}}>
						            </TabBar.Item>
						            <TabBar.Item title="个人" key="Personal" icon={<div style={{width: '22px',height: '22px',background: 'url(https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tabbar_personal.svg) center center /  21px 21px no-repeat' }} /> }
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
						</div>)
			    	)}
			    />
			</Router>
		)
	}
}

export default App