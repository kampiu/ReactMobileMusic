import React, {
	PureComponent
} from 'react'
import './MusicCollection.css'
import { connect } from 'react-redux'
import ListHeader from './../listHeader/listHeader'
import ListBody from './../listBody/listBody'

@connect(
	state => ({
		data: state
	}), {
		
	}
)

class MusicCollection extends PureComponent {
	render() {
		return(
			<div className="collection-view">
				<ListHeader data={ this.props.data.albumItem.info } key={"MusicCOLLECTHead"} isCollection={ true } ></ListHeader>
				<ListBody data={ this.props.data.player.songList } index="MusicCOLLECT" key={"collect_user"} isCollection={true}></ListBody>
			</div>
		)
	}
}

export default MusicCollection