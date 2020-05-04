import React from 'react'
import axios from 'axios'
class Call extends React.Component{
    componentDidMount() {
        axios.get(`/api/call/`)
          .then(res => {
            console.log(res.data.token)
            Twilio.Device.setup(res.data.token);
          })
          .catch(err => console.log(err))
      }

    render(){
        return(
            <section>

            </section>
        )
    }
}
export default Call