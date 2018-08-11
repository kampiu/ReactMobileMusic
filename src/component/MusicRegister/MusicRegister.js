import React, {
	PureComponent,
	http,
	crypto
} from 'react'
import { u_login, u_updateInfo } from './../../redux/reducers/MusicUser'
import { Toast } from 'antd-mobile'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import loginlogo from './login-logo.png'
import './MusicRegister.css'

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_updateInfo
	}
)

class MusicRegister extends PureComponent{
	constructor(props) {
		super(props)
		this.state = {
			user: {
				acount: "",
				pwd: "",
				sms:"",
				phone:""
			},
			len:0,
			canSend:false,
			canPost:false
		}
		this.back = this.back.bind(this)
		this.check = this.check.bind(this)
		this.send = this.send.bind(this)
		this.register = this.register.bind(this)
	}
	componentWillMount() {
		
		
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
		
	}
	send(){
		if(!this.state.canSend){
			return
		}
		http.post(API.getPhoneCode(),{phone: this.state.user.phone}).then(res => {
			
			Toast.info(res.msg, 1)
		}).catch(err => {
			Toast.info('获取验证码出错!', 1)
		})
	}
	register(){
		if(!this.state.canPost){
			return
		}
		let data = {
			acount:this.state.user.acount,
			pwd:this.state.user.pwd,
			code:this.state.user.sms,
			phone:this.state.user.phone
		}
		http.post(API.getRegister(),data).then(res => {
			if(res.code === 200){
				localStorage.setItem("music_billson_token",res.result.token)
				this.props.u_updateInfo(res.result)
				window.location.href = "/"
			}
			Toast.info(res.msg, 1)
		}).catch(err => {
			Toast.info('获取验证码出错!', 1)
		})
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
			canSend:(/^1[3|5|7|8|]\d{9}$/.test(this.state.user.phone)) ? true : false,
			canPost:(/^[_A-Za-z0-9]{6,}$/gi.test(this.state.user.acount) && len >=6 && len <=16 && /^1[3|5|7|8|]\d{9}$/.test(this.state.user.phone) && /^[0-9]{6}$/.test(this.state.user.sms)) ? true : false
		})
	}
	back(){
		window.location.hash = '/login'
	}
	render() {
		return(
			<div className="login-view">
	            <div className="view-back" onClick={ this.back }></div>
	            <img className="login-logo" src={ loginlogo } alt="" />
	            <div className="login-item">
	                <i className="user-icon"></i>
	                <input placeholder="Acount" autoComplete="off" type="text" maxLength="16" name="acount" onChange={ this.check } />
	            </div>
	            <div className="login-item">
	                <i className="pwd-icon"></i>
	                <input placeholder="Password" autoComplete="off" type="password" maxLength="16" name="pwd" onChange={ this.check } />
	            </div>
	            <div className="login-item">
	                <i className="phone-icon"></i>
	                <input placeholder="Phone" autoComplete="off" type="number" maxLength="16" name="phone" onChange={ this.check } />
	            </div>
	            <div className="sms-item">
	                <i className="sms-icon"></i>
	                <input placeholder="Code" autoComplete="off" type="number" maxLength="6" name="sms" onChange={ this.check } />
	                <div className="sms-btn"  style={{color:this.state.canSend ? '#0387ff' : 'rgb(208, 208, 208)'}} onClick={ this.send }>Send</div>
	            </div>
	            <div className="login-btn" style={{color:this.state.canPost ? '#0387ff' : 'rgb(208, 208, 208)'}} onClick={ this.register }>注册</div>
	        </div>
		);
	}
}

export default MusicRegister