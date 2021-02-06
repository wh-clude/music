import React from 'react'
// 引入接口
import { personalized, getNewSong } from '../util/axios/index'
import { Link } from 'react-router-dom'
import '../assets/css/recommend.css'
//引入静态资源图片
// import Img1 from '../assets/images/1.jpg'
// import Img2 from '../assets/images/2.jpg'
// import Img3 from '../assets/images/3.jpg'
// import Img4 from '../assets/images/4.jpg'
// import Img5 from '../assets/images/5.jpg'
// import Img6 from '../assets/images/6.jpg'
class Recommend extends React.Component {
    constructor() {
        super()
        this.state = {
            recList: [],
            newSongList: []
        }
    }
    //组件挂载完成
    componentDidMount() {
        this.getPerson()
        this.getNewSongList()
    }
    //封装一个获取歌单的方法
    getPerson() {
        personalized({ limit: 6 })
            .then(res => {
                // console.log(res, '歌单列表');
                if (res.data.code === 200) {
                    this.setState({
                        recList: res.data.result
                    })
                }
            })
    }
    getNewSongList() {
        getNewSong()
            .then(res => {
                // console.log(res, 'newsong');
                if (res.data.code === 200) {
                    this.setState({
                        newSongList: res.data.result
                    })
                }
            })
    }
    goList(id) {
        // console.log(this, '编程时');
        this.props.history.push('/list/' + id)
    }
    render() {
        const { recList, newSongList } = this.state
        return (<div className='recommend'>
            <h2><span>推荐歌单</span></h2>
            <ul className='recInfo'>
                {/* 编程式导航跳转 */}
                {
                    recList.map(item => {
                        return (
                            <li className='recList' onClick={this.goList.bind(this, item.id)} key={item.id}>
                                <img src={item.picUrl} alt="" />
                                <p>{item.name}</p>
                            </li>
                        );
                    })
                }
            </ul>
            <h2><span>最新音乐</span></h2>
            <div className='newList'>
                <ul>
                    {
                        newSongList.map((item, index) => {
                            return <Link to={"/play?id=" + item.id} key={item.id}>
                                <li >
                                    <div className="center">
                                        <div>{item.name}
                                            {item.song.alias.length > 0 ? <span>({item.song.alias[0]})</span> : ''}
                                        </div>
                                        <div> <i className="SQ"></i>
                                        {item.song.artists[0].name} - {item.name}</div>
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
        </div>)
    }
}
export default Recommend