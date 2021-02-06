import React from 'react'
// 引入index.css文件
import '../assets/css/index.css'
//引入路由的插件
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import Header from '../components/headers'
//引入要渲染的二级路由组件
import Recommend from '../views/recommend'
import HotRank from '../views/hotRank'
import Search from '../views/search'
class Index extends React.Component {
    render() {
        return (<div className='index'>
            {/* 头部 */}
            <Header></Header>
            {/* 二级路由导航 */}
            <div className="navbar">
                <div className="flexBox">
                    <NavLink to="/index/recommend" activeClassName="active">推荐音乐</NavLink>
                </div>
                <div className="flexBox">
                    <NavLink to="/index/hotRank" activeClassName="active">热歌榜</NavLink>
                </div>
                <div className="flexBox">
                    <NavLink to="/index/search" activeClassName="active">搜索</NavLink>
                </div>

            </div>

            {/* 二级路由出口 */}
            <Switch>
                <Route path="/index/recommend" component={Recommend}></Route>
                <Route path="/index/hotRank" component={HotRank}></Route>
                <Route path="/index/search" component={Search}></Route>
                <Redirect to="/index/recommend"></Redirect>
            </Switch>
        </div>)
    }
}
export default Index