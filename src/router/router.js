import MusicIndex from '../component/MusicIndex/MusicIndex'
import MusicRanking from '../component/MusicRanking/MusicRanking'
import MusicRankingItem from '../component/MusicRankingItem/MusicRankingItem'
import MusicCollection from '../component/MusicCollection/MusicCollection'
import MusicPersonal from '../component/MusicPersonal/MusicPersonal'
import MusicAlbum from '../component/MusicAlbum/MusicAlbum'
import MusicAlbumItem from '../component/MusicAlbumItem/MusicAlbumItem'
import MusicPlayer from '../component/MusicPlayer/MusicPlayer'
import MusicSetting from '../component/MusicSetting/MusicSetting'
import MusicLogin from '../component/MusicLogin/MusicLogin'
import MusicRegister from '../component/MusicRegister/MusicRegister'
import MusicHistory from '../component/MusicHistory/MusicHistory'
import MusicCdList from '../component/MusicCdList/MusicCdList'

const router = [{
	path: "/",
	name: "home",
	component: MusicIndex
}, {
	path: "/login",
	name: "login",
	component: MusicLogin
},{
	path: "/ranking",
	name: "ranking",
	component: MusicRanking
}, {
	path: "/rankitem/:index/:id",
	name: "rankingItem",
	component: MusicRankingItem
}, {
	path: "/collection",
	name: "collection",
	component: MusicCollection,
	auth:true
}, {
	path: "/personal",
	name: "personal",
	component: MusicPersonal
}, {
	path: "/albumlist",
	name: "albumlist",
	component: MusicAlbum
}, {
	path: "/album/:id",
	name: "albumItem",
	component: MusicAlbumItem
}, {
	path: "/player",
	name: "player",
	component: MusicPlayer
}, {
	path: "/setting",
	name: "setting",
	component: MusicSetting,
	auth:true
},  {
	path: "/register",
	name: "register",
	component: MusicRegister
}, {
	path: "/history",
	name: "history",
	component: MusicHistory
}, {
	path: "/song",
	name: "song",
	component: MusicCdList
}]

export default router