import React from 'react'
import { Link } from 'react-router-dom'
class Footer extends React.Component {
    render(){
        return(
            <footer>
                <p>jdjd</p>
                <Link to="/help">Help</Link>
            </footer>
        )
    }
}
// const mapStateToProps = state => ({
//     trips:state.trips.trips
// })
export default Footer