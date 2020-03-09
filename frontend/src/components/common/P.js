import React, { Component } from "react";
import Sketch from "react-p5";
import P5Wrapper from 'react-p5-wrapper';
import Particles from 'react-particles-js';
 
var Bubbles = [];   
var particles = []                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
class Card {
    constructor(p5) {
        // this.po = p5.Vector(Math.random(width),Math.random(height))
      // this.pos = Math.floor(Math.random(width) * Math.floor(window.innerWidth));
        this.x = Math.floor(Math.random() * Math.floor(window.innerWidth));
        this.y = Math.floor(Math.random() * Math.floor(window.innerHeight));
        this.velx = Math.floor(Math.random() * Math.floor(window.innerWidth));
        this.vely = Math.floor(Math.random() * Math.floor(window.innerHeight));
        this.display = () => {
            p5.stroke(255);
            p5.noFill();
            p5.ellipse(this.x, this.y,5,5);
        };
        this.move = () => {
            this.x = this.x + Math.random() * Math.floor(1);
            this.y = this.y + Math.random() * Math.floor(1);
            // this.edges()
            // if ( this.x < 0  || this.y  > window.innerWidth){
            //   this.x *= -1
            // }
        }
        this.update = () => { 
          this.velx = this.velx + Math.random() * Math.floor(1);
          this.vely = this.vely + Math.random() * Math.floor(1);
          this.edges()
        }
        this.edges = () => {
          if ( this.x < 0  || this.x  > window.innerWidth){
            this.x *= -1
          }
          if ( this.y < 0  || this.y  > window.inner.innerHeight){
            this.y *= -1
          }
        }
    }
};
export default class P extends Component {

    x = 50;
    y = 50;
    setup = (p5, canvasParentRef) => {
      p5.createCanvas(window.innerWidth,window.innerHeight).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
      const particlesLength = Math.floor(window.innerWidth / 10)

      for(let i = 0; i < particlesLength; i++){
            Bubbles[i] = new Card(p5);
            particles.push(new Card(p5))
      }
    };
    draw = p5 => {
      p5.background('rgb(55,100,144)');
      p5.ellipse(this.x, this.y, 2, -2);
      this.x++;
      for(var i = 0; i<20;i++){
        Bubbles[i].display();
        Bubbles[i].move();
  }
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   
    render() {
      return <Sketch setup={this.setup} draw={this.draw} />;
    }
  }

 
