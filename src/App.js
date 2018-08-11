import React, {
	Component,
	http
} from 'react'
import './App.css'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import Audio from './component/audio/audio'
import API from './comment/Api'
import { u_login, u_updateInfo } from './redux/reducers/MusicUser'
import { p_initsonglist } from './redux/reducers/MusicPlayer'
import { TabBar, Toast } from 'antd-mobile'
import router from './router/router'

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
		super(props);
		this.state = {
			selectedTab: 'musicTab',
			hidden: false
		};
	}
	componentWillMount() {
		if(this.props.data.user.token === "" && localStorage.getItem("music_billson_token")) {
			http.post(API.getUserInfo()).then(res => {
				if(res.code !== 200 && window.location.hash.indexOf("collection") !== -1){
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
			<div className="App">
			    <Router>
			    	<Switch>
             			{
             				router.map((item, index) => {
               				return <Route key={index} path={item.path} exact render={
               					props =>
	                				(!item.auth ? (<item.component {...props} />) : (localStorage.getItem("music_billson_token") ? (<item.component {...props} />) :  (<Redirect to="/login" />)))
	                			} />
	            			})
             			}
           			</Switch>
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
		)
	}
}

export default App