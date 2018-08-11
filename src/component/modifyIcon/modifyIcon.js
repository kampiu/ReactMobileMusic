import React, {
	PureComponent,
	http
} from 'react'
import { Toast } from 'antd-mobile'
import './modifyIcon.css'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import { u_updateInfo } from './../../redux/reducers/MusicUser'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

@connect(
	state => ({
		data: state
	}), {
		u_updateInfo
	}
)

class modifyIcon extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {

		}
		this.handlSave = this.handlSave.bind(this)
	}
	handlSave() {
		this.cropper.getCroppedCanvas().toBlob(blob => {
			const formData = new FormData()
			formData.append('img', blob, new Date().getTime() + "image.png")
            formData.append("w", 0)
            formData.append("h", 0)
            formData.append("x", 0)
            formData.append("y", 0)
			http.post(API.uploadImg(), formData).then(res => {
				res.code === 200 && this.props.u_updateInfo(res.result[0])
				res.code === 200 && Toast.info("修改成功!", .8)
				res.code === 200 && this.props.onFun()
			}).catch(err => {
				Toast.info("修改失败!", .8)
			})
		})
	}
	render() {
		return(
			<div className="modify-icon-view">
				<div className="modify-icon-menu">
					<div className="modify-icon-back" onClick={ this.props.onFun }></div>
					<div className="modify-icon-save" onClick={ this.handlSave }>保存</div>
				</div>
				<Cropper src={this.props.src} 
					dragMode="move" className="company-logo-cropper" 
					ref={cropper => this.cropper = cropper} 
					viewMode={1} 
					autoCropArea={.9}
					zoomable={true} 
					aspectRatio={1/1}
					cropBoxMovable={false}
					cropBoxResizable={false}
					movable={true}
					guides={true}  />
			</div>
		)
	}

}

export default modifyIcon