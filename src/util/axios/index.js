//引入封装好的axios
import http from './axios'

//封装推荐歌单的接口
export function personalized(params) {
    return http.get('/personalized', { params })
}
//封装歌单详情的接口
export function getSongDetail(params) {
    return http.get('/playlist/detail', { params })
}
//封装最新音乐的接口
export function getNewSong(params) {
    return http.get('/personalized/newsong', { params })
}
//封装热门榜单的接口
export function hotList() {
    return http.get('/playlist/detail?id=3778678')
}
//封装音乐的url的接口
export function getSongUrl(params) {
    return http.get('/song/url', { params })
}
//封装音乐歌词的接口
export function getLyric(params) {
    return http.get('/lyric', { params })
}
//封装音乐歌词详情的接口
export function getMusicDetail(params) {
    return http.get('/song/detail', { params })
}
//封装热搜列表的接口
export function getHotSearch() {
    return http.get('/search/hot')
}
//封装搜索列表的接口
export function getSearch(params) {
    return http.get('/search', { params })
}
//封装搜索关键字建议的接口
export function getAdvice(params) {
    return http.get('/search/suggest',{params})
}