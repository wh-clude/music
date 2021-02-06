import React from 'react'
import '../assets/css/search.css'
import { Link } from 'react-router-dom'
import { getHotSearch, getSearch, getAdvice } from '../util/axios/index'
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            val: '',
            hotList: [],
            searchList: [],
            adviceList: []
        };
        this.inp = React.createRef()
    }
    // 封装一个搜索建议的接口
    searchAdvice(keywords) {
        getAdvice(keywords)
            .then(res => {
                console.log(res, '11111111111111');
                if (res.data.code === 200) {
                    this.setState({
                        // adviceList:
                    })
                }
            })
    }
    //封装一个键盘抬起事件
    keyUp(e) {
        // console.log(e.target.value);

        if (e.target.value === '' || e.keyCode === 32) {
            this.setState({
                val: '',
                searchList: []
            })
            return
        } else {
            this.setState({
                val: e.target.value
            })
            //调取搜索接口
            this.goSearch(e.target.value)
        }
        if (e.keyCode === 13) {
            this.goSearch(e.target.value)
        }
    }
    //清空事件
    del() {
        this.setState({
            val: '',
            searchList: []
        })
        this.inp.current.value = ''
    }
    //封装一个热搜列表的接口事件
    getHotList() {
        getHotSearch()
            .then(res => {
                // console.log(res, '热搜列表');
                if (res.data.code === 200) {
                    this.setState({
                        hotList: res.data.result.hots
                    })
                }
            })
    }
    componentDidMount() {
        this.getHotList();
    }
    //封装一个搜索事件
    goSearch(keywords) {
        //点击将值赋给input框
        this.inp.current.value = keywords
        getSearch({ keywords })
            .then(res => {
                // console.log(res, '搜索结果');
                if (res.data.code === 200) {
                    this.setState({
                        val: keywords,
                        searchList: res.data.result.songs
                    })
                }
            })

    }
    render() {
        const { val, hotList, searchList } = this.state
        // val = this.inp.current ? this.inp.current.value : val
        // console.log(val);
        return (<div className='search'>
            <div className='con'>
                <div className='inputcover'>
                    <i></i>
                    <input type="text" ref={this.inp} onKeyUp={this.keyUp.bind(this)} placeholder="搜索歌曲、歌手、专辑" />
                    {val ? <span className="reset" onClick={this.del.bind(this)}>×</span> : ''}
                </div>
            </div>
            {searchList.length > 0 ?
                <div className='searchList'>
                    <ul>
                        {
                            searchList.map((item, index) => {
                                return <Link to={"/play?id=" + item.id} key={item.id}>
                                    <li >
                                        {/* <div className='left'>
                                            <span className={index < 3 ? 'active' : ''}>{index < 9 ? "0" + (index + 1) : index + 1}</span>
                                        </div> */}
                                        <div className="center">
                                            <div>{item.name}</div>
                                            <div> <i className="SQ"></i> {item.name}</div>
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
                :
                <div className="hotList">
                    <h3>热门搜索</h3>
                    <ul>
                        {
                            hotList.map(item => {
                                return <li onClick={this.goSearch.bind(this, item.first)} className='hotName' key={item.first}>{item.first}</li>
                            })
                        }
                    </ul>
                </div>
            }

        </div>)
    }
}
export default Search