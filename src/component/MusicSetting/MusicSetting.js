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
		this.state = {
			admin: {
				name: this.props.data.user.nickName,
				email: this.props.data.user.email
			}
		}
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
		let _title = '限制2~16中英文名字'
		prompt('修改昵称', _title, [{
			text: '取消'
		}, {
			text: '修改',
			onPress: value => this.put(value, "name", _title)
		}], 'default', this.props.data.user.nickName)
	}
	setEmail() {
		let _title = '限制正规的邮箱格式'
		prompt('修改昵称', _title, [{
			text: '取消'
		}, {
			text: '修改',
			onPress: value => this.put(value, "email", _title)
		}], 'default', this.props.data.user.email)
	}
	put(value, name, msg) {
		return new Promise((resolve, reject) => {
			if(value === this.props.data.user.nickName) {
				return resolve()
			}
			let bool = this.check(value, name),
				ms = this.state.admin
			ms[name] = value
			console.log(ms, this.props.data.user)
			bool ? Toast.loading("Loading...", 20) : Toast.info(msg, .8)
			bool ? (
				http.post(API.modifyInfo(), ms).then((res) => {
					console.log("返回数据:", res)
					if(res.code === 200) {
						Toast.info("修改成功!", .8)
						this.props.u_updateInfo(res.result)
						resolve()
					}
					Toast.hide()
				}).catch((res) => {
					Toast.info("修改失败!", .8)
					reject()
				})
			) : null
		})
	}
	check(str, name) {
		let nick = /^[\u4e00-\u9fa5_a-zA-Z.]{2,16}$/,
			kong = /(^\s*)|(\s*)$/g,
			email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
			reg = null
		switch(name) {
			case "name":
				reg = nick.test(str)
				break
			case "email":
				reg = email.test(str)
				break
			default:
				break
		}
		str.replace(kong, "")
		return reg
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
							<img alt="" src={this.props.data.user.picUrl} />
						</div>
					</div>
					<div className="setting-item" onClick={this.setName}>
						<div className="setting-name">昵称</div>
						<div className="setting-input">
							<span>{this.props.data.user.nickName}</span>
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