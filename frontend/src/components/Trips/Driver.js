import React from 'react'
import { tripDetails,loadDriver,completeView } from '../../actions/trips'
import axios from 'axios'
class Driver  extends  React.Component{
    state = {
        driver:this.props.driver,
    }
    componentDidMount(){
    }
    // console.log(this.state.driver)
    render(){
        return(
            <section>
            <h1>hey there</h1>
            {/* {
                this.state.driver.map(d => {
                    <div key={d.id}>
                        <p>hey</p>
                    </div>
                })
            } */}
            {/* {
                Object.values(this.props.driver).map(val => {
                <p>{username}</p>
                })
            } */}
            </section>
        )
    }
}
export default Driver