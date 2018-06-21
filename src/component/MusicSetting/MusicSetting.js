import React, {
	PureComponent,
	http
} from 'react'
import TitleBar from './../titleBar/titleBar'
import './MusicSetting.css'
import { connect } from 'react-redux'
import { u_login, u_logout, u_updateInfo } from './../../redux/reducers/MusicUser'
import { p_initList } from './../../redux/reducers/MusicPlayer'
import { Modal, Toast } from 'antd-mobile'
import API from '../../comment/Api'
const prompt = Modal.prompt;

@connect(
	state => ({
		data: state
	}), {
		u_login,
		u_logout,
		p_initList,
		u_updateInfo
	}
)

class MusicSetting extends PureComponent {
	constructor(props) {
		super(props)
		this.setName = this.setName.bind(this)
		this.toSettingImg = this.toSettingImg.bind(this)
		this.setEmail = this.setEmail.bind(this)
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	componentWillUnmount() {

	}
	setName() {
		let _title = '限制4~16中英文下划线名字'
		prompt('修改昵称', _title, [{
			text: '取消'
		}, {
			text: '修改',
			onPress: value => this.put(value,"nickname",_title)
		}], 'default', this.props.data.user.userNickname)
	}
	setEmail(){
		let _title = '限制正规的邮箱格式'
		prompt('修改昵称',_title, [{
			text: '取消'
		}, {
			text: '修改',
			onPress: value => this.put(value,"email",_title)
		}], 'default', this.props.data.user.email)
	}
	put(value,name,msg) {
		return new Promise((resolve, reject) => {
			console.log(value,name)
			if(value === this.props.data.user.userNickname){
				return resolve()
			}
			let bool = this.check(value,name),ms = {}
			console.log(bool,name)
			ms[name] = value
			bool ? Toast.loading("Loading...",20) : Toast.info(msg,1)
			bool ? (
				http.post(API.resetInfo(),ms).then((res)=>{
					console.log("返回数据:",res)
					if(res.data.code === 200){
						Toast.hide()
						Toast.info("修改成功!",1)
						this.props.u_updateInfo(res.data.result)
						resolve()
					}
				}).catch((res)=>{
					Toast.info("修改失败!",1)
					reject()
				})
			) : null
		})
	}
	check(str,name) {
		let nick = /^[\u4e00-\u9fa5_a-zA-Z]{4,16}$/g,
			kong = /(^\s*)|(\s*)$/g,
			email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
			reg = null
			switch(name){
				case "nickname":reg = nick.test(str)
					break
				case "email":reg = email.test(str)
					break
				default:
					break
			}
		str.replace(kong, "")
		console.log("!!!")
		return reg
	}
	checkEmail(e) {
		let str = e,
			email = /^[\u4e00-\u9fa5_a-zA-Z]{4,16}$/g,
			kong = /(^\s*)|(\s*)$/g
		str.replace(kong, "")
		return(email.test(str))
	}
	toSettingImg() {
		window.location.hash = "/modifyUpload"
	}
	render() {
		return(
			<div className="setting-view">
				<TitleBar back={true} title="设置"></TitleBar>
				<div className="setting-box">
					<div className="setting-item">
						<div className="setting-name">头像</div>
						<div className="setting-input" onClick={this.toSettingImg}>
							<img alt="" src={this.props.data.user.userPic} />
						</div>
					</div>
					<div className="setting-item" onClick={this.setName}>
						<div className="setting-name">昵称</div>
						<div className="setting-input">
							<span>{this.props.data.user.userNickname}</span>
						</div>
					</div>
					<div className="setting-item" onClick={this.setEmail}>
						<div className="setting-name">邮箱</div>
						<div className="setting-input">
							<span>{this.props.data.user.email}</span>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}

export default MusicSetting