class Camera{
  constructor(x,y,z,tx,ty,tz,ex,ey,ez){
    this.x=x;
    this.y=y;
    this.z=z;

    this.ex=ex;
    this.ey=ey;
    this.ez=ez;

    this.tx=tx;
    this.ty=ty;
    this.tz=tz;

    this.vx=0;
    this.vz=0;
    this.tvx=0;
    this.tvy=0;
    this.tvz=0;
  }

  update(){
    this.vx=this.vx*0.9;
    this.vz=this.vz*0.9;

    this.x+=this.vx;
    this.z+=this.vz;

    this.tvx=this.tvx*0.9;
    this.tvy=this.tvy*0.9;
    this.tvz=this.tvz*0.9;

    this.tx+=this.tvx;
    this.ty+=this.tvy;
    this.tz+=this.tvz;
  }
  
  draw_on_Map() {
    let ctx = document.getElementById("canvasMap").getContext("2d");
    //ctx.strokeStyle = 'rgba(255,180,0,255)';
    ctx.moveTo(this.x-5,this.z);
    ctx.lineTo(this.x+5,this.z);
    ctx.stroke();
    ctx.moveTo(this.x,this.z-5);
    ctx.lineTo(this.x,this.z+5);
    ctx.stroke();

    ctx.moveTo(this.x,this.z);
    ctx.lineTo(-Math.sin(this.ty)*10+this.x,-Math.cos(this.ty)*10+this.z);
    ctx.stroke();
  }
}
