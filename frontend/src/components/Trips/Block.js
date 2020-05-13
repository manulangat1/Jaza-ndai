import React from 'react'
import { Link } from 'react-router-dom'
import Web3 from 'web3'
class Block extends React.Component {
    async loadWeb3(){
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if(window.web3){
          window.web3 = new Web3(window.web3.currentProvider)
        } 
        else{
          window.alert("Non eth browser detected")
        }
      }
    async componentDidMount(){
        await this.loadWeb3()
        // await this.loadBlockchainData()
        // console.log(this.state.socialNetwork)
      }
    render(){
        const date = new Date()
        const tods = date.getFullYear()
        return(
            <section>
                <p><span className="f">@&;@{tods}</span></p>
                <p><Link to="/help">Help</Link> |  <Link to="/about">About us</Link>  |  <Link to="/contact">Contact Us</Link></p>
                <p><i class="fab fa-facebook"></i>  | <i class="fab fa-twitter-square"></i> </p>
            </section>
        )
    }
}
export default Block