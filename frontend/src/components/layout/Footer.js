import React from 'react'
import { Link } from 'react-router-dom'
class Footer extends React.Component {
    render(){
        const date = new Date()
        const tods = date.getFullYear()
        return(
            <footer>
                <p><span className="f">@&;@{tods}</span></p>
                <p><Link to="/help">Help</Link> |  <Link to="/about">About us</Link>  |  <Link to="/contact">Contact Us</Link></p>
                <p><i class="fab fa-facebook"></i>  | <i class="fab fa-twitter-square"></i> </p>
            </footer>
        )
    }
}
export default Footer