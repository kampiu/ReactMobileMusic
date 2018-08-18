import React, {
	PureComponent
} from 'react';
import './albumMenu.css'

class albumMenu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			show: this.props.show,
			type: this.props.type,
			data: [{
				title: "语言",
				atr: ["华语", "欧美", "日语", "韩语", "粤语", "小语种"]
			}, {
				title: "风格",
				atr: ["流行", "摇滚", "民谣", "电子", "舞曲", "说唱", "轻音乐", "爵士", "乡村", "古典", "民族", "英伦", "金属", "朋克", "蓝调", "雷鬼", "世界音乐", "拉丁", "另类/独立", "New Age", "古风", "后摇", "Bossa Nova"]
			}, {
				title: "场景",
				atr: ["清晨", "夜晚", "学习", "工作", "午休", "下午茶", "地铁", "驾车", "运动", "旅行", "散步", "酒吧"]
			}, {
				title: "情感",
				atr: ["怀旧", "清新", "浪漫", "性感", "伤感", "治愈", "放松", "孤独", "感动", "兴奋", "快乐", "安静", "思念"]
			}, {
				title: "主题",
				atr: ["影视原声", "ACG", "儿童", "校园", "游戏", "70后", "80后", "90后", "网络歌曲", "KTV", "经典", "翻唱", "吉他", "钢琴", "器乐", "榜单", "00后"]
			}]
		}
	}
	componentWillMount() {

	}
	componentDidMount() {

	}
	change(e) {
		this.setState({
			type: e
		})
	}
	render() {
		return(
			<div className="album-menu-view" id="album-menu-view" style={ this.state.show ? {opacity: "1"} : {opacity: "0"}}>
				<div className="album-menu-head">
					<div>筛选歌单</div>
					<span onClick={ () => { this.props.fun() }}></span>
				</div>
				<div className="album-menu-content">
					<div className="album-menu-all-select">
						<div className={ this.state.type === "全部" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("全部")
							this.change("全部")}}>全部歌单</div>
					</div>
					{
						this.state.data.map((item, index) => {
							return (
								<div className="album-menu-select-view" key={item.title}>
									<div className="album-menu-select-icon">
										<i></i>
										{item.title}
									</div>
									{
										item.atr.map((_item, _index) => {
											return (
												<div key={_item} className={ this.state.type === {_item} ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun(_item) 
													this.change(_item)}}>{_item}</div>
											)
										})
									}
								</div>
							)
						})
					}
					
				</div>
			</div>
		)
	}
}

export default albumMenu