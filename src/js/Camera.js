class Camera{
  constructor(x,y,z,tx,ty,tz){
    this.x=x;
    this.y=y;
    this.z=z;

    this.tx=tx;
    this.ty=ty;
    this.tz=tz;

    this.vx=0;
    this.vy=0;
    this.vz=0;

    this.tvx=0;
    this.tvy=0;
    this.tvz=0;

    this.focal = 10;
    this.zoom = 20;
  }

  update(){
    this.vx=this.vx*0.9;
    this.vy=this.vy*0.9;
    this.vz=this.vz*0.9;

    this.x+=this.vx;
    this.y+=this.vy;
    this.z+=this.vz;

    this.tvx=this.tvx*0.9;
    this.tvy=this.tvy*0.9;
    this.tvz=this.tvz*0.9;

    this.tx+=this.tvx;
    this.ty+=this.tvy;
    this.tz+=this.tvz;
  }



  draw_on_Map(canvas) {
    canvas.draw_cross(this.x,this.z,5);
    canvas.draw_line(this.x,this.z,-Math.sin(this.ty)*10+this.x,-Math.cos(this.ty)*10+this.z);
    canvas.draw_text(this.x,this.z,
      (this.x).toFixed(0) + ',' + (this.y).toFixed(0) + ',' + (this.z).toFixed(0) + '|' +
      (this.tx/Math.PI).toFixed(2) + 'π,' + (this.ty/Math.PI).toFixed(2) + 'π,' + (this.tz/Math.PI).toFixed(2) + 'π'
    );

  }
}
