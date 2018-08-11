import React, {
	PureComponent
} from 'react'
import TitleBar from './../titleBar/titleBar'
import './MusicPersonal.css'
import { Toast } from 'antd-mobile'
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
		this.setting = this.setting.bind(this)
		this.toLogin = this.toLogin.bind(this)
		this.toHistory = this.toHistory.bind(this)
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	toLogin(){
		window.location.hash = "/login"
	}
	setting(){
		if(this.props.data.user.token !== ""){
			window.location.hash = "/setting"
		}else{
			Toast.info("请先登录!")
		}
	}
	toHistory(){
		window.location.hash = '/history'
	} 
	render() {
		return(
			<div className="personal-view"> 
				<TitleBar title="帐号"></TitleBar>
				<div className="personal-info">
					<div className="personal-img">
						<img alt="" src={this.props.data.user.picUrl} />
					</div>
					<div className="personal-msg">
						<span>{this.props.data.user.nickName}</span>	
						<span></span>	
					</div>
					{
						this.props.data.user.token === "" ? (<div className="personal-share" onClick={ this.toLogin }>登录</div>) : null
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