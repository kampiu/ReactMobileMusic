import { combineReducers } from "redux"
import { albumList } from './reducers/MusicAlbumList'
import { player } from './reducers/MusicPlayer'
import { index } from './reducers/MusicIndex'
import { albumItem } from './reducers/MusicAlbumItem'
import { ranking } from './reducers/MusicRanking'
import { user } from './reducers/MusicUser'
import { collection } from './reducers/MusicCollection'



export const rootReducer = combineReducers({
	index,
    albumList,
    albumItem,
    player,
    ranking,
    user,
    collection
})





