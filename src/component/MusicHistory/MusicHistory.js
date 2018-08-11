import React, {
	PureComponent
} from 'react'
import TitleBar from './../titleBar/titleBar'
import './MusicHistory.css'
import { connect } from 'react-redux'
import HistoryItem from './HistoryItem'

@connect(
	state => ({
		msg: state
	}), {
		
	}
)

class MusicHistory extends PureComponent {
	render() {
		let len = localStorage.getItem("music_history") ? JSON.parse(localStorage.getItem("music_history")).length : 0
		let list = localStorage.getItem("music_history") ? JSON.parse(localStorage.getItem("music_history")) : []
		return(
			<div className="history-view">
				<TitleBar back={true} title={"历史"}></TitleBar>
				<div className="collection-list">
					<div className="collection-list-title">收听历史 共{"(" + len + ")"}首</div>
					{
						list.map((item,index) => {
							return (
								<HistoryItem data={ item } index={ index }  key={ item.id + 'historyitem' }></HistoryItem>
							)
						})
					}
				</div>
			</div>
		)
	}
}


export default MusicHistory
