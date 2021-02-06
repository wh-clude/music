import React from 'react'
//引入配置路由对象的方法
import {withRouter} from 'react-router-dom'
class Home extends React.Component {
    goPlay(){
        console.log('播放');
        this.props.history.push('/play')
    }
    render() {
        return (<div>
            <div className="header">
                <div className="con_center">
                    <h1>
                        <span onClick={this.goPlay.bind(this)} className='title'>优音乐</span>
                    </h1>
                    <div className="download">
                        <span>下载APP</span>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default withRouter(Home)