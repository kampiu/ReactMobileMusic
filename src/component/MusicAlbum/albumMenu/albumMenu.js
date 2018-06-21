import React, {
	PureComponent
} from 'react';
import './albumMenu.css'

class albumMenu extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			show:this.props.show,
			type:this.props.type
		}
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	change(e){
		this.setState({
			type:e
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
					<div className="album-menu-select-view">
						<div className="album-menu-select-icon">
							<i></i>
							语言
						</div>
						<div className={ this.state.type === "华语" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("华语") 
							this.change("华语")}}>华语</div>
						<div className={ this.state.type === "欧美" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("欧美") 
							this.change("欧美")}}>欧美</div>
						<div className={ this.state.type === "日语" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("日语") 
							this.change("日语")}}>日语</div>
						<div className={ this.state.type === "韩语" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("韩语") 
							this.change("韩语")}}>韩语</div>
						<div className={ this.state.type === "粤语" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("粤语") 
							this.change("粤语")}}>粤语</div>
						<div className={ this.state.type === "小语种" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("小语种")
							this.change("小语种")}}>小语种</div>
					</div>
					<div className="album-menu-select-view">
						<div className="album-menu-select-icon">
							<i></i>
							风格
						</div>
						<div className={ this.state.type === "流行" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("流行") 
							this.change("流行")}}>流行</div>
						<div className={ this.state.type === "摇滚" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("摇滚") 
							this.change("摇滚")}}>摇滚</div>
						<div className={ this.state.type === "民谣" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("民谣") 
							this.change("民谣")}}>民谣</div>
						<div className={ this.state.type === "电子" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"} onClick={ () => { this.props.typeFun("电子") 
							this.change("电子")}}>电子</div>
						<div className={ this.state.type === "舞曲" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("舞曲") 
							this.change("舞曲")}}>舞曲</div>
						<div className={ this.state.type === "说唱" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("说唱") 
							this.change("说唱")}}>说唱</div>
						<div className={ this.state.type === "轻音乐" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("轻音乐") 
							this.change("轻音乐")}}>轻音乐</div>
						<div className={ this.state.type === "爵士" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("爵士") 
							this.change("爵士")}}>爵士</div>
						<div className={ this.state.type === "乡村" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("乡村") 
							this.change("乡村")}}>乡村</div>
						<div className={ this.state.type === "古典" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("古典") 
							this.change("古典")}}>古典</div>
						<div className={ this.state.type === "民族" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("民族") 
							this.change("民族")}}>民族</div>
						<div className={ this.state.type === "英伦" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("英伦") 
							this.change("英伦")}}>英伦</div>
						<div className={ this.state.type === "金属" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("金属") 
							this.change("金属")}}>金属</div>
						<div className={ this.state.type === "朋克" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("朋克") 
							this.change("朋克")}}>朋克</div>
						<div className={ this.state.type === "蓝调" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("蓝调") 
							this.change("蓝调")}}>蓝调</div>
						<div className={ this.state.type === "雷鬼" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("雷鬼") 
							this.change("雷鬼")}}>雷鬼</div>
						<div className={ this.state.type === "世界音乐" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("世界音乐") 
							this.change("世界音乐")}}>世界音乐</div>
						<div className={ this.state.type === "拉丁" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("拉丁") 
							this.change("拉丁")}}>拉丁</div>
						<div className={ this.state.type === "另类/独立" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("另类/独立") 
							this.change("另类/独立")}}>另类/独立</div>
						<div className={ this.state.type === "New Age" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("New Age") 
							this.change("New Age")}}>New Age</div>
						<div className={ this.state.type === "古风" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("古风") 
							this.change("古风")}}>古风</div>
						<div className={ this.state.type === "后摇" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("后摇") 
							this.change("后摇")}}>后摇</div>
						<div className={ this.state.type === "Bossa Nova" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("Bossa Nova") 
							this.change("Bossa Nova")}}>Bossa Nova</div>
					</div>
					<div className="album-menu-select-view">
						<div className="album-menu-select-icon">
							<i></i>
							场景
						</div>
						<div className={ this.state.type === "清晨" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("清晨") 
							this.change("清晨")}}>清晨</div>
						<div className={ this.state.type === "夜晚" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("夜晚") 
							this.change("夜晚")}}>夜晚</div>
						<div className={ this.state.type === "学习" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("学习") 
							this.change("学习")}}>学习</div>
						<div className={ this.state.type === "工作" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("工作") 
							this.change("工作")}}>工作</div>
						<div className={ this.state.type === "午休" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("午休") 
							this.change("午休")}}>午休</div>
						<div className={ this.state.type === "下午茶" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("下午茶") 
							this.change("下午茶")}}>下午茶</div>
						<div className={ this.state.type === "地铁" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("地铁") 
							this.change("地铁")}}>地铁</div>
						<div className={ this.state.type === "驾车" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("驾车") 
							this.change("驾车")}}>驾车</div>
						<div className={ this.state.type === "运动" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("运动") 
							this.change("运动")}}>运动</div>
						<div className={ this.state.type === "旅行" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("旅行") 
							this.change("旅行")}}>旅行</div>
						<div className={ this.state.type === "散步" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("散步") 
							this.change("散步")}}>散步</div>
						<div className={ this.state.type === "酒吧" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("酒吧") 
							this.change("酒吧")}}>酒吧</div>
					</div>
					<div className="album-menu-select-view">
						<div className="album-menu-select-icon">
							<i></i>
							情感
						</div>
						<div className={ this.state.type === "怀旧" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("怀旧") 
							this.change("怀旧")}}>怀旧</div>
						<div className={ this.state.type === "清新" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("清新") 
							this.change("清新")}}>清新</div>
						<div className={ this.state.type === "浪漫" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("浪漫") 
							this.change("浪漫")}}>浪漫</div>
						<div className={ this.state.type === "性感" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("性感") 
							this.change("性感")}}>性感</div>
						<div className={ this.state.type === "伤感" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("伤感") 
							this.change("伤感")}}>伤感</div>
						<div className={ this.state.type === "治愈" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("治愈") 
							this.change("治愈")}}>治愈</div>
						<div className={ this.state.type === "放松" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("放松") 
							this.change("放松")}}>放松</div>
						<div className={ this.state.type === "孤独" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("孤独") 
							this.change("孤独")}}>孤独</div>
						<div className={ this.state.type === "感动" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("感动") 
							this.change("感动")}}>感动</div>
						<div className={ this.state.type === "兴奋" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("兴奋") 
							this.change("兴奋")}}>兴奋</div>
						<div className={ this.state.type === "快乐" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("快乐") 
							this.change("快乐")}}>快乐</div>
						<div className={ this.state.type === "安静" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("安静") 
							this.change("安静")}}>安静</div>
						<div className={ this.state.type === "思念" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("思念") 
							this.change("思念")}}>思念</div>
					</div>
					<div className="album-menu-select-view">
						<div className="album-menu-select-icon">
							<i></i>
							主题
						</div>
						<div className={ this.state.type === "影视原声" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("影视原声") 
							this.change("影视原声")}}>影视原声</div>
						<div className={ this.state.type === "ACG" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("ACG") 
							this.change("ACG")}}>ACG</div>
						<div className={ this.state.type === "儿童" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("儿童") 
							this.change("儿童")}}>儿童</div>
						<div className={ this.state.type === "校园" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("校园") 
							this.change("校园")}}>校园</div>
						<div className={ this.state.type === "游戏" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("游戏") 
							this.change("游戏")}}>游戏</div>
						<div className={ this.state.type === "70后" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("70后") 
							this.change("70后")}}>70后</div>
						<div className={ this.state.type === "80后" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("80后") 
							this.change("80后")}}>80后</div>
						<div className={ this.state.type === "90后" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("90后") 
							this.change("90后")}}>90后</div>
						<div className={ this.state.type === "网络歌曲" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("网络歌曲") 
							this.change("网络歌曲")}}>网络歌曲</div>
						<div className={ this.state.type === "KTV" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("KTV") 
							this.change("KTV")}}>KTV</div>
						<div className={ this.state.type === "经典" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("经典") 
							this.change("经典")}}>经典</div>
						<div className={ this.state.type === "翻唱" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("翻唱") 
							this.change("翻唱")}}>翻唱</div>
						<div className={ this.state.type === "吉他" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("吉他") 
							this.change("吉他")}}>吉他</div>
						<div className={ this.state.type === "钢琴" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("钢琴") 
							this.change("钢琴")}}>钢琴</div>
						<div className={ this.state.type === "器乐" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("器乐") 
							this.change("器乐")}}>器乐</div>
						<div className={ this.state.type === "榜单" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("榜单") 
							this.change("榜单")}}>榜单</div>
						<div className={ this.state.type === "00后" ? "album-menu-select-item album-menu-active" : "album-menu-select-item"}  onClick={ () => { this.props.typeFun("00后") 
							this.change("00后")}}>00后</div>
					</div>
				</div>
			</div>
		);
	}
}

export default albumMenu