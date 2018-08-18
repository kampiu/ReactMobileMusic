import React, {
	PureComponent,
	http,
	crypto
} from 'react'
import { u_login, u_updateInfo } from './../../redux/reducers/MusicUser'
import { p_initsonglist } from '../../redux/reducers/MusicPlayer'
import { Toast } from 'antd-mobile'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import loginlogo from './login-logo.png'
import './MusicLogin.css'

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_updateInfo,
		p_initsonglist
	}
)

class MusicLogin extends PureComponent{
	constructor(props) {
		super(props)
		this.state = {
			user: {
				pwd: "",
				acount: ""
			},
			len:0,
			canPost:false
		}
		this.back = this.back.bind(this)
		this.check = this.check.bind(this)
		this.logining = this.logining.bind(this)
		this.Register = this.Register.bind(this)
	}
	check(e){
		let admin = this.state.user,
			name = e.target.getAttribute("name"),
			len = this.state.len
		len = (name === 'pwd' ? e.target.value.length : len)
		admin[name] = (name === 'pwd' ? (crypto.MD5(e.target.value).toString()) : e.target.value)
		this.setState({
			user: admin,
			len:len,
			canPost:(/^[_A-Za-z0-9]{6,}$/gi.test(this.state.user.acount) && len >=6 && len <=16) ? true : false
		})
	}
	logining(){
		if(!this.state.canPost){
			Toast.info("帐号或密码格式不正确!", 0.8)
			return	
		}
		http.post(API.login(),{acount:this.state.user.acount,pwd:this.state.user.pwd}).then(res => {
			if(res.code === 200){
				this.getUserInfo()
				localStorage.setItem("music_billson_token",res.result.token)
				this.props.u_updateInfo(res.result)
				window.location.hash = "/"
			}
			Toast.info(res.msg, 0.8)
		}).catch(err => {
			Toast.info('登录出错!', 1)
		})
	}
	Register(){
		window.location.hash = '/register'
	}
	getUserInfo(){
		http.post(API.getUserList()).then(res => {
			res.code === 200 && this.props.p_initsonglist(res.result.col_list)
			Toast.info(res.msg, 0.8)
		}).catch(err => {
			Toast.info('获取收藏列表失败!', .8)
		})
	}
	back(){
		window.location.hash = '/'
	}
	render() {
		console.log("!!!!!")
		return(
			<div className="login-view" id="login-view">
				<div className="view-back" onClick={ this.back }></div>
	            <div className="to-regpage" onClick={ this.Register }>注册</div>
	            <img className="login-logo" src={loginlogo} alt="" />
	            <div className="login-item">
	                <i className="user-icon"></i>
	                <input autoComplete="off" placeholder="Acount" maxLength="16" type="text" name="acount" onChange={ this.check } />
	            </div>
	            <div className="login-item">
	                <i className="pwd-icon"></i>
	                <input autoComplete="off" placeholder="Password" maxLength="16" type="password" name="pwd" onChange={ this.check } />
	            </div>
	            <div className="login-btn" style={{color:this.state.canPost ? '#0387ff' : 'rgb(208, 208, 208)'}} onClick={ this.logining } >登录</div>
			</div>
		);
	}
}

export default MusicLogin