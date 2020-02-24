import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
export default class Mapd extends Component {

    render() {
        return (
           this.props.incidents ?
            <Map 
            center={[this.state.lat, this.state.lng]} 
            zoom={this.state.zoom} 
            style={{ width: '100%', height: '900px'}}>
                <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    this.props.incidents.map(incident => {
                        const point = [incident['point']['coordinates'][1],                 incident['point']['coordinates'][0]]
                    
        
        return (
            <Marker position={point} key={incident['incident_number']} >
                    <Popup>
                    <span>ADDRESS: {incident['address']}, {incident['city']} - {incident['zip_code']}</span>
                    <br/>
                    <span>BATTALION: {incident['battalion']}</span><br/>
                    </Popup>
                </Marker>
            )
            })
        }
        </Map>
                :
                'Data is loading...'
        )
    }
 }
 