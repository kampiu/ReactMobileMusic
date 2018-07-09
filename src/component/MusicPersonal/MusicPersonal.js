import React, {
	PureComponent,
	http
} from 'react'
import TitleBar from './../titleBar/titleBar'
import LoginView from './loginView/loginView'
import './MusicPersonal.css'
import { Toast } from 'antd-mobile'
import API from '../../comment/Api'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { u_login, u_logout } from './../../redux/reducers/MusicUser'
import { p_initList } from './../../redux/reducers/MusicPlayer'
import crypto from 'crypto'
import cryptojs from 'crypto-js'
import aes from 'aes'

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
		this.test = this.test.bind(this)
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
		if(this.props.data.user.login){
			window.location.hash = "/setting"
		}else{
			Toast.info("请先登录!")
		}
	}
	toHistory(){
		window.location.hash = '/history'
	}
	test(){
		http.get("http://localhost:8088/art").then((res)=>{
			console.log(res)
			let key = cryptojs.enc.Latin1.parse('5AA765D61D8327DE')
			let iv = cryptojs.enc.Latin1.parse('1234567812345678')
			
			let encrypted = cryptojs.AES.encrypt("abcdefg",key,{iv:iv,mode:cryptojs.mode.CBC,padding:cryptojs.pad.ZeroPadding}); 	//AES加密传后台

//			console.log(JSON.stringify(encrypted.toString(cryptojs.enc.Utf8)))
//			let decrypted = cryptojs.AES.decrypt(res.data.result.data,key,{iv:iv,padding:cryptojs.pad.ZeroPadding});
//			let len = decrypted.toString(cryptojs.enc.Utf8);
//			console.log(len)
//			console.log(JSON.parse(len))
		}).catch((res)=>{
			console.log("error",res)
		})
	}
	decode(encrypted, key) {
	    const decipher = crypto.createDecipher('aes128', key);
	    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	    decrypted += decipher.final('utf8');
	    console.log(decrypted)
//	    return decrypted;
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
					<div className="personal-nav" onClick={ this.test }>
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