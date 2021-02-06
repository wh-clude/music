import React from 'react'
import { getSongDetail } from '../util/axios/index'
import '../assets/css/list.css'
import { Link } from 'react-router-dom'
class List extends React.Component {
    constructor() {
        super()
        this.state = {
            songDetail: [],
            bgImg: '',
            name: '',
            singerImg: '',
            nickname: ''
        }
        this.background = React.createRef()
    }
    componentDidMount() {
        this.getSongDetailList()
    }
    //封装一个相关歌单的列表
    getSongDetailList() {
        getSongDetail({ id: this.props.match.params.id })
            .then(res => {
                console.log(res, '相关推荐');
                if (res.data.code === 200) {
                    this.setState({
                        songDetail: res.data.playlist.tracks,
                        bgImg: res.data.playlist.coverImgUrl,
                        name: res.data.playlist.name,
                        singerImg: res.data.playlist.creator.avatarUrl,
                        nickname: res.data.playlist.creator.nickname
                    })
                    this.background.current.style.background = `url(${this.state.bgImg}) 50%/100% 100% no-repeat `

                }
            })
    }
    render() {
        const { songDetail, bgImg, name, singerImg, nickname } = this.state
        return (<div className="list">
            <div className="listTop" ref={this.background} >
            </div>
            <div className="listHeader">
                <div className="left">
                    <img src={bgImg} alt="" />
                </div>
                <div className="right">
                    <h2>{name}</h2>
                    <div className="singInfo">
                        <img src={singerImg} alt="" />
                        <span href="">{nickname}</span>
                    </div>
                </div>
            </div>
            <div className='songList'>
                <h3>歌曲列表</h3>
                <div>
                    <ul>
                        {
                            songDetail.map((item, index) => {
                                return <Link to={"/play?id=" + item.id} key={item.id}>
                                    <li >
                                        <div className='left'>
                                            <span className={index < 3 ? 'active' : ''}>{index < 9 ? "0" + (index + 1) : index + 1}</span>
                                        </div>
                                        <div className="center">
                                            <div>{item.name}</div>
                                            <div> <i className="SQ"></i> {item.ar[0].name}-{item.name}</div>
                                        </div>
                                        <div className="right">
                                            <span className="playPic"></span>
                                        </div>
                                    </li>
                                </Link>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>)
    }
}
export default List