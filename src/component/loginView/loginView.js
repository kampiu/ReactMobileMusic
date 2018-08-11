import React, {
	PureComponent,
	http,
	crypto
} from 'react'
import { Switch, Toast } from 'antd-mobile'
import './loginView.css'
import API from '../../../comment/Api'
import { connect } from 'react-redux'
import { u_login, u_expiry, u_updateInfo } from './../../../redux/reducers/MusicUser'

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_expiry,
		u_updateInfo
	}
)

class loginView extends PureComponent{
	constructor(props) {
		super(props)
		this.state = {
			type:false,
			loginView:this.props.loginView,
			user: {
				acount: "",
				pwd: ""
			},
			login:true
		}
		this.back = this.back.bind(this)
		this.check = this.check.bind(this)
		this.isLoginToggle = this.isLoginToggle.bind(this)
		this.logining = this.logining.bind(this)
	}
	componentWillMount() {
		
		
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
		
	}
	check(e){
		let user = this.state.user,
			name = e.target.getAttribute("name"),
			pwd = this.state.user.pwd
		if(name === "pwd") {
			pwd = crypto.MD5(pwd).toString()
		}
		user[name] = e.target.value
		this.setState({
			user: user,
			pwd: pwd
		})
	}
	loginType(){
		this.setState({
			type:!this.state.type
		})
	}
	logining(){
		if(this.state.login){
			Toast.loading('登录中...',10)
			let data = {
				acount: this.state.user.acount,
				pwd: this.state.user.pwd
			}
			http.post(API.acount(), data).then((res) => {
				Toast.hide()
				if(res.data.code === 200) {
					this.props.u_updateInfo(res.data.data.user)
					this.back()
				}
				Toast.info(res.data.data.msg,0.8)
			}).catch(() => {
				Toast.hide()
				Toast.info("登录超时!",1)
			})
		}else{
			this.register()
		}
	}
	register(){
		if(this.state.user.acount.length < 6){
			return Toast.info("帐号最少长度为6位!",0.8)
		}
		if(this.state.user.pwd === this.state.user.pwdagain){
			let data = {
				acount:this.state.user.acount,
				pwd:this.state.pwd
			}
			http.post(API.getRegister(),data).then((res)=>{
				if(res.data.code === 200){
					this.props.u_updateInfo(res.data.data.user)
					this.back()
					Toast.info("登陆成功!",0.8)
				}else if(res.data.code === 204){
					Toast.info("账号已存在!",0.8)
				}
			}).catch((err)=>{
				console.log(err)
			})
		}else{
			Toast.info("两次密码必须相同!",0.8)
		}
	}
	back(){
		this.props.fun()
		document.getElementById("login-view").className = "login-view login-view-hide"
	}
	isLoginToggle(){
		this.setState({
			login:!this.state.login
		},()=>{
			if(!this.state.login){
				document.getElementsByClassName("login-box")[0].className = "login-box login-box-reg"
			}else{
				document.getElementsByClassName("login-box")[0].className = "login-box"
			}
		})
	}
	render() {
		return(
			<div className="login-view" id="login-view">
				<div className="login-mask"></div>
				<div className="login-content">
					<span className="login-back" onClick={this.back}></span>
					<div className="login-box">
						<div className="login-title">{ this.state.login ? "登 录" : "注 册"}</div>
						<div className="input-label input-acount">
							<input onChange={ this.check } placeholder="Acount" type="string" name="acount" />
						</div>
						<div className="input-label input-pwd">
							<input onChange={ this.check } placeholder="Password" type="password" name="pwd" />
						</div>
						{
							this.state.login ? null : (
								<div className="input-label input-pwd-again">
									<input onChange={ this.check } placeholder="Password Again" type="password" name="pwdagain" />
								</div>
							)
						}
						<div className="login-set">
							{
								this.state.login ? (
									<span>
										<Switch color="#5179F1" onChange={ () => { this.loginType()}} checked={this.state.type} platform="ios" />
										网易云手机登录
									</span>
								) : null
							}
							<span className="login-toggle" onClick={ this.isLoginToggle }>{this.state.login ? "注册" : "登录"}</span>
						</div>
						<div className="login-btn" onClick={ this.logining }>{this.state.login ? "LOGIN" : "REGISTER"}</div>
					</div>
				</div>
				<div className="login-bg"></div>
			</div>
		);
	}
}

export default loginView