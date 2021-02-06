import React from 'react'
import { Link } from 'react-router-dom'
import { hotList } from '../util/axios/index'
import '../assets/css/hotRank.css'
class Recommend extends React.Component {
    constructor() {
        super()
        this.state = {
            hotList: [],
            bgImg: ''
        }
    }
    componentDidMount() {
        this.getHotList()
    }
    //封装一个获取热门榜单的接口
    getHotList() {
        hotList()
            .then(res => {
                // console.log(res, '热门榜单');
                if (res.data.code === 200) {
                    this.setState({
                        bgImg: res.data.playlist.coverImgUrl,
                        hotList: res.data.playlist.tracks.filter((item, i) => i < 20)
                    })
                }
            })
    }

    render() {
        const { hotList, bgImg } = this.state
        return (<div className='hotRank'>
            <div className='hotTop'>
                {bgImg ? <img src={bgImg} alt="" /> : ''}
            </div>
            <ul>
                {/* {
                    hotList.map((item, index) => {
                        return <li key={item.id}>{index + 1}、{item.songName}</li>
                    })
                } */}
                {
                    hotList.map((item, index) => {
                        return <Link to={"/play?id=" + item.id} key={item.id}>
                            <li >
                                <div className='left'>
                                    <span className={index < 3 ? 'active' : ''}>{index < 9 ? "0" + (index + 1) : index + 1}</span>
                                </div>
                                <div className="center">
                                    <div>
                                        {item.name}
                                        {item.alia.length > 0 ? <span> ({item.alia[0]})</span> : ''}
                                    </div>
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
        </div>)
    }
}
export default Recommend