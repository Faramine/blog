class Scene{
  constructor(){
    this.objects = [];
  }

  setView3D(canvas){
    this.canvas3D = canvas;
  }
  setView2D(canvas){
    this.canvas2D = canvas;
  }
  setCamera(x,y,z,tx,ty,tz){
    this.camera = new Camera(x,y,z,tx,ty,tz);
  }

  key_event(key){
    //console.log(key);
    if(key == "ArrowUp"){
      this.camera.vx+=-Math.sin(this.camera.ty)*1;
      this.camera.vz+=-Math.cos(this.camera.ty)*1;
    }
    if(key == "ArrowDown"){
      this.camera.vx+=-Math.sin(this.camera.ty)*(-1);
      this.camera.vz+=-Math.cos(this.camera.ty)*(-1);
    }
    if(key == "ArrowRight"){
      this.camera.tvy+=0.05;
    }
    if(key == "ArrowLeft"){
      this.camera.tvy-=0.05;
    }
  }

  update(){
    this.canvas3D.clear();
    this.canvas2D.clear();

    this.camera.update();

    for(let i=0;i<this.objects.length;i++){
      this.objects[i].draw_on_Map(this.canvas2D,this.camera);
      this.objects[i].draw_on_3D(this.canvas3D,this.camera);
    }
    //this.camera.rotate();
    this.camera.draw_on_Map(this.canvas2D);
  }

  raytrace(){
    this.canvas3D.clear();
    this.canvas2D.clear();

    this.camera.update();

    let res = 200;
    let psize = this.canvas3D.width/res;
    let focal = 40;
    let vstep = focal/res;

    let Pcam = new Vector(this.camera.x,this.camera.y,this.camera.z);
    let Rcam = [this.camera.tx,this.camera.ty,this.camera.tz];

    let Pplan;
    let ray;
    let min;
    let closest;
    let t;
    let color;


    for(let x=0;x<res;x++){
      for(let y=0;y<res;y++){
        Pplan = new Vector(
          -focal/2+vstep*x,
          -focal/2+vstep*y,
          -this.camera.focal);
        ray = Vector.rotate(Pplan,Rcam);

        this.canvas2D.draw_line(Pcam.table[0][0],Pcam.table[2][0],Pcam.table[0][0]+ray.table[0][0],Pcam.table[2][0]+ray.table[2][0]);

        min = 1000000;

        closest = null;
        for(let i=0;i<this.objects.length;i++){
          t = this.objects[i].intersect(Pcam,ray);
          if(t && t<min){min=t;closest = this.objects[i];}
        }
        color = null;
        //if(x===10 || y===10){color=gold;}
        if(closest){color = closest.color;}
        this.canvas3D.draw_pixel(psize*x,psize*y,psize,color);
      }
    }

    this.camera.draw_on_Map(this.canvas2D);



  }

  add_point(x,y,z){
    let p = new Point(x,y,z);
    this.objects.push(p);
  }

  add_segment(A,B){
    let p = new Segment(A.pos,B.pos);
    this.objects.push(p);
  }

  add_polygon(A,B,C,color){
    let pol = new Polygon(A,B,C);
    if(isdef(color)){pol.color = color}
    this.objects.push(pol);
  }

  add_cone(Cone){
    this.objects.push(Cone);
  }
}
