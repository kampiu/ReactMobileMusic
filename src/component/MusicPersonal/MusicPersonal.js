import React, {
	PureComponent,
	http
} from 'react'
import TitleBar from './../titleBar/titleBar'
import LoginView from './loginView/loginView'
import './MusicPersonal.css'
import API from '../../comment/Api'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { u_login, u_logout } from './../../redux/reducers/MusicUser'
import { p_initList } from './../../redux/reducers/MusicPlayer'

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_logout,
		p_initList
	}
)
class MusicPersonal extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			loginView:false,
			setView:false
		}
		this.toggleView = this.toggleView.bind(this)
		this.logout = this.logout.bind(this)
		this.setting = this.setting.bind(this)
		this.toHistory = this.toHistory.bind(this)
	}
	componentWillMount() {
		if(Cookies.get().accessToken) {
			this.props.u_login(Cookies.get().accessToken,true)
		}
	}
	componentDidMount() {
		
	}
	toggleView(){
		if(this.state.loginView){
			let time = setTimeout(() => {
				this.setState({
					loginView:false
				})
				clearTimeout(time)
			},1800)
		}else{
			this.setState({
				loginView:true
			})
		}
	}
	logout(){
		http.post(API.logout()).then((res)=>{
			console.log(res)
			if(res.data.code === 200){
				this.props.u_logout()
				this.props.p_initList()
				this.setState({
					loginView:true
				})
			}
		}).catch((err)=>{
			console.log(err)
		})
		
	}
	setting(){
		window.location.hash = "/setting"
	}
	toHistory(){
		window.location.hash = '/history'
	}
	render() {
		return(
			<div className="personal-view"> 
				{
					this.state.loginView ? <LoginView loginView={this.state.loginView} fun={ this.toggleView }></LoginView> : null
				}
				<TitleBar title="帐号"></TitleBar>
				<div className="personal-info">
					<div className="personal-img">
						<img alt="" src={this.props.data.user.userPic} />
					</div>
					<div className="personal-msg">
						<span>{this.props.data.user.userNickname}</span>	
						<span></span>	
					</div>
					{
						this.props.data.user.login ? <div className="personal-share" onClick={ this.logout }>注销</div> : <div className="personal-share" onClick={ this.toggleView }>登录</div>
					}
				</div>
				<div className="personal-menu">
					<div className="personal-nav" onClick={this.toHistory}>
						<span></span>
						歌曲足迹
					</div>
					<div className="personal-nav">
						<span></span>
						好友搜索
					</div>
					<div className="personal-nav">
						<span></span>
						最新通告
					</div>
					<div className="personal-nav" onClick={this.setting}>
						<span></span>
						个人设置
					</div>
				</div>
			</div>
		);
	}
}

export default MusicPersonal