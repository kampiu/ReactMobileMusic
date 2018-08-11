import React, {
	PureComponent,
	http
} from 'react'
import TitleBar from './../titleBar/titleBar'
import ModifyIcon from './../modifyIcon/modifyIcon'
import './MusicSetting.css'
import { connect } from 'react-redux'
import { u_login, u_logout, u_updateInfo } from './../../redux/reducers/MusicUser'
import { p_initList } from './../../redux/reducers/MusicPlayer'
import { Modal, Toast, ActionSheet } from 'antd-mobile'
import API from '../../comment/Api'
const prompt = Modal.prompt
//const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
//let wrapProps
//if(isIPhone) {
//	wrapProps = {
//		onTouchStart: e => e.preventDefault(),
//	}
//}

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
			},
			settingImg: false,
			data: {},
			formData:{}
		}
		this.setName = this.setName.bind(this)
		this.toSettingImg = this.toSettingImg.bind(this)
		this.setEmail = this.setEmail.bind(this)
		this.toPutSelect = this.toPutSelect.bind(this)
		this.toCloseView = this.toCloseView.bind(this)
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
			bool ? Toast.loading("Loading...", 20) : Toast.info(msg, .8)
			bool && (
				http.post(API.modifyInfo(), ms).then((res) => {
					if(res.code === 200) {
						this.props.u_updateInfo(res.result)
						resolve()
					}
					Toast.info(res.msg, .8)
					Toast.hide()
				}).catch((res) => {
					Toast.info("修改失败!", .8)
					reject()
				})
			)
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
	toPutSelect() {
		const BUTTONS = ['修改头像', '取消'],
			FLAGS = [true, false]
		ActionSheet.showActionSheetWithOptions({
				options: BUTTONS,
				cancelButtonIndex: BUTTONS.length - 1,
				message: '请选择相应的操作',
				maskClosable: true,
				'data-seed': 'logId'
			},
			e => {
				if(FLAGS[e]) {
					document.getElementById("userFileIcon").click()
				}
			})
	}
	toCloseView() {
		document.getElementById("userFileIcon").value = ""
		this.setState({
			settingImg: false
		})
	}
	toSettingImg(e) {
		let reader = new FileReader()
		let file = document.getElementById("userFileIcon").files[0]
		reader.onload = e => {
			console.log(e.target)
			this.setState({
				settingImg: true,
				data: e.target.result,
				formData:file
			})
		}
		reader.readAsDataURL(file)
	}
	render() {
		return(
			<div className="setting-view">
				<TitleBar back={true} title="设置"></TitleBar>
				<div className="setting-box">
					<div className="setting-item">
						<div className="setting-name">头像</div>
						<div className="setting-input" onClick={this.toPutSelect}>
							<img alt="" src={this.props.data.user.picUrl} />
						</div>
					</div>
					<input onChange={ this.toSettingImg } accept="image/jpg, image/png, image/jpeg" id="userFileIcon" name="file" type="file" />
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
				{
					this.state.settingImg ? <ModifyIcon src={ this.state.data } formData={this.state.formData} onFun={ this.toCloseView }></ModifyIcon> : null
				}
			</div>
		);
	}
}

export default MusicSetting