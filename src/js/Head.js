/*let Canvas3D_x = 600;
let Canvas3D_y = 600;
document.body.innerHTML += '<canvas id="canvas3D" width="'+Canvas3D_x+'" height="'+Canvas3D_y+'"></canvas>';
const canvas3D = document.getElementById("canvas3D");




let CanvasMap_x = 400;
let CanvasMap_y = 400;
document.body.innerHTML += '<canvas id="canvasMap" width="'+CanvasMap_x+'" height="'+CanvasMap_y+'"></canvas>';
const canvas2D = document.getElementById("canvasMap");

document.body.innerHTML += '<canvas id="log" width="'+(Canvas3D_x - CanvasMap_x - 30)+'" height="'+CanvasMap_y+'"></canvas>';
*/

function isdef(variable){
  return (typeof variable !== 'undefined');
}

function solve(A,B,C){
  let Delta = Math.pow(B,2)-4*A*C;

  if(Delta > 0){
    let x1 = -B-Math.sqrt(Delta)/2*A;
    let x2 = -B+Math.sqrt(Delta)/2*A;
    /*let I = Vector.addition(Lp,Vector.factor(Lv,S));
    if(Vector.intersign(I,P1,V)<0 && Vector.intersign(I,P2,V)>0){
      return S
    }else{
      return null
    }*/
    if(x1<x2){return x1;}else{return x2;}
  }else{
    return null;
  }



  return x;
}

class Color{
  constructor(r,g,b,a){
    this.r = r;
    this.g = g;
    this.b = b;

    if(isdef(a)){this.a = a;}else{this.a = 255;}
  }

  str(){
    return ('rgba('+this.r+','+this.g+','+this.b+','+(this.a/255)+')');
  }

  alpha(a){
    return(new Color(this.r,this.g,this.b,a));
  }
}

const gold = new Color(255, 181, 33);
const lazuli = new Color(0, 157, 255);
const light = new Color(255, 255, 255);
const space = new Color(0, 0, 0);
