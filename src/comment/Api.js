//const _baseUrl = 'https://api.billson.club/api'
const _baseUrl = 'http://localhost:3002/api'
//const _baseUrl = 'http://192.168.0.159:3002/api'


export default {
	userPlayList(id){
		return _baseUrl + '/user/playlist?uid=' + id 
	},
	userRecord(id){
		return _baseUrl + '/user/record?uid=' + id 
	},
	userDetail(id){
		return _baseUrl + '/user/detail?uid=' + id 
	},
	getAlbum(cat,order,offset,total,limit){
		return _baseUrl + '/top/playlist?cat=' + cat + '&order=' + order + '&offset=' + offset + '&total=' + total + '&limit=' + limit
	},
	getNewCd(offset,limit,type){
		return _baseUrl + '/top/album?offset=' + offset + '&limit=' + limit + '&type=' + type
	},
	getMusicSort(idx){
		return _baseUrl + '/top/list?idx=' + idx
	},
	getnewMv(){
		return _baseUrl + "/mv/first"
	},
	getAlbumList(id){
		return _baseUrl + "/playlist/detail?id=" + id
	},
	getAlbumListComment(id,offset,limit){
		return _baseUrl + "/comment/playlist?id=" + id + "&offset=" + offset + "&limit=" + limit
	},
	searchByWords(type,keywords,limit,offset){
		return _baseUrl + "/search?type=" + type + "&keywords=" + keywords + "&limit=" + limit + "&offset=" + offset
	},
	getMusicUrl(id){
		return _baseUrl + "/music/url?id=" + id
	},
	getArtists(offset,limit){
		return _baseUrl + "/top/artists?offset=" + offset + "&limit=" + limit
	},
	getBananer(){
		return _baseUrl + "/banner"
	},
	getLyric(id){
		return _baseUrl + '/lyric?id=' + id
	},
	getSongDetail(id){
		return _baseUrl + '/song/detail?ids=' + id
	},
	getRadioStation(){
		return _baseUrl + '/dj/recommend'
	},
//	getSearch(keywords){
//		return _baseUrl + '/search/suggest?keywords=' + keywords
//	},
	getRanking(){
		return _baseUrl + '/ranking'
	},
	getSuggest(words){
		return _baseUrl + '/search/suggest?keywords=' + words
	},
	getSearch(words){
		return _baseUrl + '/search?keywords=' + words
	},
	getHome(){
		return _baseUrl + '/music/home'
	},
	addSong(){
		return _baseUrl + '/user/collect/add'
	},
	removeSong(){
		return _baseUrl + '/user/collect/remove'
	},
	//webside
	login() {		
		return _baseUrl + '/user/login'
	},
	getPhoneCode(){
		return _baseUrl + '/user/code'
	},
	getRegister(){
		return _baseUrl + '/user/register'
	},
	getUserInfo(){
		return _baseUrl + '/user/getinfo'
	},
	getUserList(){
		return _baseUrl + '/user/collect'
	},
	modifyInfo(){
		return _baseUrl + '/user/modify/info'
	},
//	uploadImg(){
//		return _baseUrl + '/modify/upload'
//	}
	
}