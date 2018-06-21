import React, {
	PureComponent,
	http
} from 'react'
import TitleBar from './../titleBar/titleBar'
import ReactCoreImageUpload from 'react-core-image-upload'
import { Toast } from 'antd-mobile'
import './MusicModifyUpload.css'
import API from '../../comment/Api'
import { connect } from 'react-redux'
import { u_updateImg } from './../../redux/reducers/MusicUser'

let canvas, context,
	img,
	imgs,
	imgX = -100,
	imgY = -100,
	imgScale = 1;

@connect(
	state => ({
		data: state
	}), {
		u_updateImg
	}
)

class MusicModifyUpload extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			img:false,
			url: null,
			cutting: false
		}
		this.change = this.change.bind(this)
		this.touchstart = this.touchstart.bind(this)
		this.getSave = this.getSave.bind(this)
		this.back = this.back.bind(this)
		this.wheels = this.wheels.bind(this)
	}
	change(e) {
		console.log(e)
		if(e.target.files[0] && e.target.files[0].type.indexOf("image") === -1){
			return Toast.info("图片格式仅支持PNG,JPG,JPEG",2)
		}
//		if(){}
		this.setState({
			cutting: true
		})
		let reader = new FileReader();
		reader.onload = (res) => {
			canvas = document.getElementById('canvas');
			context = canvas.getContext('2d');
			imgs = document.getElementById("cutting-img-hide")
			img = new Image()
			img.setAttribute("src", res.target.result)
			img.onload = () => {
				let sx = ((img.width / img.height < 1) ? img.width : img.height)
				if(sx < 300) { //赋值最少的高宽 相比 300
					imgScale = 300 / sx
					imgX = (img.width * imgScale > 300) ? -Math.abs((img.width - 300) * imgScale / 2) : 0
					imgY = (img.height * imgScale > 300) ? -Math.abs((img.height - 300) * imgScale / 2) : 0
				} else { // 最小的高宽 大于 300
					imgScale = 300 / sx
					imgX = (img.width * imgScale > 300) ? -Math.abs((img.width - 300) * imgScale / 2) / 2 : 0
					imgY = (img.height * imgScale > 300) ? -Math.abs((img.height - 300) * imgScale / 2) / 2 : 0
				}
				this.drawImage();
				canvas.addEventListener("touchstart", this.touchstart)
				canvas.addEventListener("mousewheel", this.wheels)
				
				this.setState({
					img: true,
					url: res.target.result
				})
			}
		}
		if(e.target.files[0]){
			reader.readAsDataURL(e.target.files[0])
		}
	}
	drawImage() {
		imgs.style.left = imgX + document.getElementById("canvas").offsetLeft + "px"
		imgs.style.top = imgY + document.getElementById("canvas").offsetTop + "px"
		imgs.style.width = img.width * imgScale + "px"
		imgs.style.height = img.height * imgScale + "px"
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(img, 0, 0, img.width, img.height, imgX, imgY, img.width * imgScale, img.height * imgScale);
	}
	getSave() {
		Toast.loading('Loading...', 10)
		let data = new FormData()
		data.append("img", document.getElementById("file").files[0])
		data.append("x", Math.abs(imgX))
		data.append("y", Math.abs(imgY))
		data.append("w", parseInt(img.width * imgScale))
		data.append("h", parseInt(img.height * imgScale))
		http.post(API.uploadImg(), data).then((res) => {
			console.log(res)
			Toast.hide()
			if(res.data.code === 200) {
				Toast.hide()
				this.props.u_updateImg(res.data.result.m_picurl)
				this.setState({
					cutting: false
				})
			} else {
				Toast.info(res.data.msg,1.2)
			}
		}).catch((res) => {
			Toast.info("上传错误!", 0.8)
		})
	}
	back() {
		this.setState({
			cutting: false
		})
	}
	wheels(event) {
		let pos = this.windowToCanvas(canvas, event.clientX, event.clientY)
		let cj = 111 / 100,
			k = 100 / 111
		if(event.wheelDelta > 0) {
			imgScale *= cj;
			imgX = imgX * cj - pos.x;
			imgY = imgY * cj - pos.y;
		} else {
			imgScale /= cj;
			imgX = imgX * k + pos.x * k;
			imgY = imgY * k + pos.y * k;
		}
		this.drawImage()
	}
	render() {
		return(
			<div className="img-upload-view">
				<TitleBar back={true} title="修改头像"></TitleBar>
				<div className="img-upload-box" style={{backgroundImage:"url(" + this.props.data.user.userPic + ")"}}></div>
				<div className="upload-img-btn">
					上传图片
					<input onChange={this.change} id="file" name="file" type="file" />
				</div>
				{
					this.state.cutting ? (
						<div style={this.state.cutting ? {display:"flex"} : {display:"none"}} className="img-cutting-view">
							<div className="img-upload-bar">
								<span onClick={this.back}>取消</span>
								<span onClick={this.getSave}>保存</span>
							</div>
							<img id="cutting-img-hide" className="cutting-img" src={this.state.url} alt=""  />
							<canvas id="canvas" width="300" height="300"></canvas>
							<div className="cutting-mask"></div>
						</div>
					) : null
				}
				
			</div>
		);
	}
	windowToCanvas(canvas, x, y) {
		let bbox = canvas.getBoundingClientRect();
		return {
			x: x - bbox.left - (bbox.width - canvas.width) / 2,
			y: y - bbox.top - (bbox.height - canvas.height) / 2
		};
	}
	touchstart(event) {
		let that = this
		if(event.targetTouches.length === 1) {
			let pos = that.windowToCanvas(canvas, event.targetTouches[0].clientX, event.targetTouches[0].clientY)
			canvas.ontouchmove = function(event) {
				canvas.style.cursor = "move";
				let pos1 = that.windowToCanvas(canvas, event.targetTouches[0].clientX + 6, event.targetTouches[0].clientY + 6)
				let x = pos1.x - pos.x;
				let y = pos1.y - pos.y;
				pos = pos1;
				imgX += x;
				imgY += y;
				that.drawImage();
			}
			canvas.ontouchend = function() {
				if((img.height * imgScale) + imgY < 300) {
					imgY = -((img.height * imgScale) - 300)
				}
				if((img.width * imgScale) + imgX < 300) {
					imgX = -((img.width * imgScale) - 300)
				}
				if(imgX > 0) {
					imgX = 0
				}
				if(imgY > 0) {
					imgY = 0
				}
				if(img.width * imgScale < 300) {
					imgScale = 300 / img.width
				}
				if(img.height * imgScale < 300) {
					imgScale = 300 / img.height
				}
				that.drawImage();
				canvas.ontouchend = null;
			}
		} else if(event.targetTouches.length === 2) {
			let s_ox = event.targetTouches[0].clientX,
				s_oy = event.targetTouches[0].clientY
			let s_tx = event.targetTouches[1].clientX,
				s_ty = event.targetTouches[1].clientY
			let res = Math.sqrt(Math.pow(Math.abs(s_ox - s_tx), 2) + Math.pow(Math.abs(s_oy - s_ty), 2))
			let arr = [res]
			canvas.ontouchmove = function(event) {
				let ox = event.targetTouches[0].clientX,
					oy = event.targetTouches[0].clientY
				let tx = event.targetTouches[1].clientX,
					ty = event.targetTouches[1].clientY
				let result = Math.sqrt(Math.pow(Math.abs(ox - tx), 2) + Math.pow(Math.abs(oy - ty), 2))

				let _x = (Math.abs(ox) + Math.abs(tx)) / 2,
					_y = (Math.abs(oy) - Math.abs(ty)) / 2
				let pos = that.windowToCanvas(canvas, _x, _y);
				let cj = 111 / 100,
					k = 100 / 111
				if(result > arr[arr.length - 1]) {
					imgScale *= cj
					imgX = (300 - (img.width * imgScale)) * Math.abs(pos.x) / 300
					imgY = (300 - (img.height * imgScale)) * Math.abs(pos.y) / 300
				} else {
					imgScale *= k
					imgX = (300 - (img.width * imgScale)) * Math.abs(pos.x) / 300
					imgY = (300 - (img.height * imgScale)) * Math.abs(pos.y) / 300
				}
				that.drawImage();
				arr.push(result)
			}
			canvas.ontouchend = function() {
				if((img.height * imgScale) + imgY < 300) {
					imgY = -((img.height * imgScale) - 300)
				}
				if((img.width * imgScale) + imgX < 300) {
					imgX = -((img.width * imgScale) - 300)
				}
				if(imgX > 0) {
					imgX = 0
				}
				if(imgY > 0) {
					imgY = 0
				}
				if(img.width * imgScale < 300) {
					imgScale = 300 / img.width
				}
				if(img.height * imgScale < 300) {
					imgScale = 300 / img.height
				}
				that.drawImage();
				canvas.ontouchend = null;
			}

		}
	}

}

export default MusicModifyUpload