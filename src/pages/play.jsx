import React from 'react'
//引入原生nodeAPI方法
import queryString from 'querystring'
import axios from 'axios'
import jq from 'jquery'
import '../assets/css/play.css'
import { getSongUrl, getLyric, getMusicDetail } from '../util/axios/index'
import { Link } from 'react-router-dom'
class Play extends React.Component {
    constructor() {
        super()
        this.state = {
            songUrl: '',
            lyric: '',
            bgImg: '',
            songName: '',
            singer: '',
            playTime: '00:00',
            flag: false
        }
        this.audio = React.createRef()
        this.lyricBox = React.createRef()
        this.playIcon = React.createRef()
        this.rotate = React.createRef()
    }
    componentDidMount() {
        // console.log(this.props);
        let query = this.props.location.search.slice(1)
        // let arr = query.split('&')
        // let obj = {}
        // arr.forEach(item => {
        //     let arrTemp = item.split('=')
        //     obj[arrTemp[0]] = arrTemp[1]
        // })
        let obj = queryString.parse(query)
        // console.log(obj);
        this.setState({
            query: obj,
        })
        this.rotate.current.className = "contain rotateBox"
        // console.log(query);
        axios.all([getMusicDetail({ ids: obj.id }), getSongUrl({ id: obj.id }), getLyric({ id: obj.id })])
            .then(axios.spread((detail, songUrl, lyric) => {
                // console.log(detail, 'detaildetail');
                if (detail.data.code === 200) {
                    this.setState({
                        bgImg: detail.data.songs[0].al.picUrl,
                        songName: detail.data.songs[0].name,
                        singer: detail.data.songs[0].ar[0].name,
                    })
                }
                // console.log(songUrl, 'songUrlsongUrl');
                if (songUrl.data.code === 200) {
                    this.setState({
                        songUrl: songUrl.data.data[0].url
                    })
                }
                // console.log(lyric, 'lyriclyric');
                if (lyric.data.code === 200) {
                    let lyricInfo = lyric.data.lrc.lyric
                    let reg = /\[(.*?)](.*)/g
                    // console.log(lyricInfo);
                    let obj = {}
                    lyricInfo.replace(reg, (a, b, c) => {
                        // console.log(a,'aaa');
                        // console.log(b,'bbb');
                        // console.log(c,'ccc');
                        b = b.slice(0, 5);
                        obj[b] = c
                    })
                    // console.log(obj, '对象');
                    this.setState({
                        lyric: obj
                    }, () => {
                        // console.log(this.audio.current, '11111');
                        let audio = this.audio.current
                        audio.ontimeupdate = () => {
                            // console.log(audio.currentTime, '播放时间');
                            let nowTime = this.formateTime(audio.currentTime)
                            if (nowTime in this.state.lyric) {
                                this.setState({
                                    playTime: nowTime
                                }, () => {
                                    this.moveLyric();
                                })
                            }
                        }
                    })
                }
            }))
    }
    //封装一个播放事件
    toPlay() {
        this.setState({
            flag: !this.state.flag
        }, () => {
            if (this.state.flag) {
                this.playIcon.current.style.display = 'block'
                this.audio.current.pause();
                this.rotate.current.className = "contain"
            } else {
                this.playIcon.current.style.display = 'none'
                this.audio.current.play();
                this.rotate.current.className = "contain rotateBox"
            }
        })
    }
    //封装时间转化函数
    formateTime(timer) {
        let minutes = (Math.floor(timer / 60) + '').padStart(2, '0')
        let seconds = (Math.floor(timer % 60) + '').padStart(2, '0')
        // console.log(minutes, seconds);
        return `${minutes}:${seconds}`
    }
    //封装一个歌词滚动的事件
    moveLyric() {
        let active = document.getElementsByClassName('active')[0]
        // console.log(active);
        let index = jq('.lyric').children().index(active)
        let offset = 32
        if (active.offsetTop > offset) {
            jq('.lyric p').css('transform', `translateY(-${index * offset}px)`)
        }
        // console.log(index, '索引');
    }
    render() {
        const { songUrl, lyric, bgImg, songName, singer, playTime } = this.state
        return (<div className="play">
            <div className="m-logo">
                <Link to="/index">优音乐</Link> 
            </div>
            <div className="play_top">
            </div>
            <div ref={this.rotate} className="contain" onClick={this.toPlay.bind(this)}>
                <img src={bgImg} alt="" />
                <span ref={this.playIcon} className='icon'></span>
            </div>
            <div className="play_txt">
                <div className="play_txt_name">
                    <span>{songName}</span> - <span>{singer}</span>
                </div>
            </div>

            <div ref={this.lyricBox} className="lyric">
                {/*Object.entries() 将对象转化为数组 */}
                {
                    Object.entries(lyric).map((item, index) => {
                        if (playTime === item[0]) {
                            return <p className="active" key={index}>{item[1]}</p>
                        } else {
                            return <p key={index}>{item[1]}</p>
                        }
                    })
                }
            </div>
            <div className="audio">
                <div>打开设置</div>
                <audio ref={this.audio} src={songUrl} controls autoPlay >
                </audio>
            </div>

        </div>)
    }
}
export default Play