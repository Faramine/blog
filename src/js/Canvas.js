class Canvas{
  constructor(id,x,y){
    this.width = x;
    this.height = y;
    this.id = id;

    this.origin = [0,0];

    document.body.innerHTML += '<canvas id="'+this.id+'" width="'+this.width+'" height="'+this.height+'"></canvas>';
  }

  set_origin(p){
    if(p===0){
      this.origin=[0,0];
    }else if(p===1){
      this.origin=[this.width/2,this.height/2];
    }else{
      this.origin=[p[0],p[1]];
    }
  }

  getctx(){
    return document.getElementById(this.id).getContext("2d");
  }

  draw_point(x,y,color){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    if(!isdef(color)){color = light}

    ctx.fillStyle = color.str();
    ctx.beginPath();
    ctx.arc(x+ox, y+oy, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  draw_line(Ax,Ay,Bx,By,color){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    if(!isdef(color)){color = light}

    ctx.strokeStyle = color.str();
    ctx.beginPath();
    ctx.moveTo(Ax+ox,Ay+oy);
    ctx.lineTo(Bx+ox,By+oy);
    ctx.stroke();
  }

  draw_polygon(T,color){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    if(!isdef(color)||!color){color = light}

    ctx.fillStyle = color.alpha(120).str();
    ctx.beginPath();
    ctx.moveTo(T[0][0]+ox,T[0][1]+oy);
    for(let i = 1;i<T.length;i++){
      ctx.lineTo(T[i][0]+ox,T[i][1]+oy);
    }
    ctx.fill();
  }

  draw_pixel(x,y,size,color){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    if(!isdef(color)||!color){color = space}


    ctx.fillStyle = color.alpha(120).str();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+size,y);
    ctx.lineTo(x+size,y+size);
    ctx.lineTo(x,y+size);
    ctx.fill();
  }

  draw_cross(x,y,size,color){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    if(!isdef(color)){color = light}

    ctx.strokeStyle = color.str();

    ctx.beginPath();
    ctx.moveTo(x-size+ox,y+oy);
    ctx.lineTo(x+size+ox,y+oy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x+ox,y-size+oy);
    ctx.lineTo(x+ox,y+size+oy);
    ctx.stroke();
  }

  draw_text(x,y,text,color){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    if(!isdef(color)){color = light}

    ctx.fillStyle = color.str();
    ctx.font = "10px Arial";
    ctx.fillText(text,x+10+ox,y-10+oy);
  }

  clear(){
    let ctx = this.getctx();
    ctx.clearRect(0, 0, this.width, this.height);
    this.draw_origin();
  }

  draw_origin(){
    let ctx = this.getctx();
    let ox = this.origin[0];
    let oy = this.origin[1];
    let w = this.width;
    let h = this.height;

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(ox,0);
    ctx.lineTo(ox,h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,oy);
    ctx.lineTo(w,oy);
    ctx.stroke();
  }
}
