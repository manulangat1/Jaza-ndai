import React, { Component } from "react";
import Sketch from "react-p5";
import P5Wrapper from 'react-p5-wrapper';
import Particles from 'react-particles-js';
 
var Bubbles = [];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
class Card {
    constructor(p5) {
        this.x = Math.floor(Math.random() * Math.floor(window.innerWidth));
        this.y = Math.floor(Math.random() * Math.floor(window.innerHeight));
        this.display = () => {
            p5.stroke(255);
            p5.noFill();
            p5.ellipse(this.x, this.y,50,50);
        };
        this.move = () => {
            this.x = this.x + Math.random() * Math.floor(1);
            this.y = this.y + Math.random() * Math.floor(1);
        }
        // this.vel = createVector()
    }
};
export default class P extends Component {
    
    x = 50;
    y = 50;
    setup = (p5, canvasParentRef) => {
      p5.createCanvas(window.innerWidth,window.innerHeight).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
      for(var i = 0; i<9;i++){
            Bubbles[i] = new Card(p5);
      }
    };
    draw = p5 => {
      p5.background('rgb(55,100,144)');
      p5.ellipse(this.x, this.y, 150, 2);
      this.x++;
      for(var i = 0; i<9;i++){
        Bubbles[i].move();
        Bubbles[i].display();
  }
    };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
   
    render() {
      return <Sketch setup={this.setup} draw={this.draw} />;
    }
  }

 
