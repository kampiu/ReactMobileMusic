
//const OrderConfirm = resolve => require(['./../view/order/OrderConfirm.vue'], resolve)
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


//const MusicIndex = Loadable({
//	loader: () =>
//		import('./component/MusicIndex/MusicIndex'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicRanking = Loadable({
//	loader: () =>
//		import('./component/MusicRanking/MusicRanking'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicRankingItem = Loadable({
//	loader: () =>
//		import('./component/MusicRankingItem/MusicRankingItem'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicCollection = Loadable({
//	loader: () =>
//		import('./component/MusicCollection/MusicCollection'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicPersonal = Loadable({
//	loader: () =>
//		import('./component/MusicPersonal/MusicPersonal'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicAlbum = Loadable({
//	loader: () =>
//		import('./component/MusicAlbum/MusicAlbum'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicAlbumItem = Loadable({
//	loader: () =>
//		import('./component/MusicAlbumItem/MusicAlbumItem'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicPlayer = Loadable({
//	loader: () =>
//		import('./component/MusicPlayer/MusicPlayer'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicSetting = Loadable({
//	loader: () =>
//		import('./component/MusicSetting/MusicSetting'),
//	loading: Loading,
//	timeout: 10000
//})
//
//const MusicLogin = Loadable({
//	loader: () =>
//		import('./component/MusicLogin/MusicLogin'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicRegister = Loadable({
//	loader: () =>
//		import('./component/MusicRegister/MusicRegister'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicHistory = Loadable({
//	loader: () =>
//		import('./component/MusicHistory/MusicHistory'),
//	loading: Loading,
//	timeout: 10000
//})
//const MusicCdList = Loadable({
//	loader: () =>
//		import('./component/MusicCdList/MusicCdList'),
//	loading: Loading,
//	timeout: 10000
//})

const router = [{
	path: "/",
	name: "home",
	component: MusicIndex
}, {
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
}, {
	path: "/login",
	name: "login",
	component: MusicLogin
}, {
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