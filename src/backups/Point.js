class Point{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static addition(A,B){
    let C= new Point(A.x+B.x,A.y+B.y,A.z+B.z);
    return C;
  }

  static substract(A,B){
    let C= new Point(A.x-B.x,A.y-B.y,A.z-B.z);
    return C;
  }

  static scale(A,k){
    let C= new Point(A.x*k,A.y*k,A.z*k);
    return C;
  }

  static produit(A,B){
    let C=[];
    for(let i=0;i<A.length;i++){
      C.push([]);
      for(let j=0;j<B[0].length;j++){
        let s = 0;
        for(let k=0;k<B[0].length;k++){
          s += A[i][k]*B[k][j];
        }
        C[i].push(s);
      }
    }
    return C;
  }

  static cartesien(A,B){
    return(A.x*B.x+A.y*B.y+A.z+B.z);
  }

  static intersect(Lp,Lv,Pp,Pv){
    let dist = Point.substract(Lp,Pp);
    let C= Point.addition(Point.addition(dist,Pp),Point.scale(-Point.cartesien(dist,Pv)/Point.cartesien(Pv,Lv)),Lv);
    return C;
  }

  project(camera){
    /*let M1 = [
      [1,0,0],
      [0,Math.cos(camera.tx),Math.sin(camera.tx)],
      [0,-Math.sin(camera.tx),Math.cos(camera.tx)]
    ];

    let M2 = [
      [Math.cos(camera.ty),0,-Math.sin(camera.ty)],
      [0,1,0],
      [Math.sin(camera.ty),0,Math.cos(camera.ty)]
    ];

    let M3 = [
      [Math.cos(camera.tz),Math.sin(camera.tz),0],
      [-Math.sin(camera.tz),Math.cos(camera.tz),0],
      [0,0,1]
    ];
    let S = [[this.x-camera.x],[this.y-camera.y],[this.z-camera.z]];
    let D= Point.multiply(Point.multiply(Point.multiply(M1,M2),M3),S);
    console.log('D :',D);*/

    let acx = this.x - camera.x;
    let acy = this.y - camera.y;
    let acz = this.z - camera.z;
    
    let cosx= Math.cos(camera.tx);
    let cosy= Math.cos(camera.ty);
    let cosz= Math.cos(camera.tz);
    
    let sinx= Math.sin(camera.tx);
    let siny= Math.sin(camera.ty);
    let sinz= Math.sin(camera.tz);
    
    let dx = cosy*(sinz*acy+cosz*acx)-siny*acz;
    let dy = sinx*(cosy*acz+siny*(sinz*acy+cosz*acx))+cosx*(cosz*acy-sinz*acx);
    let dz = cosx*(cosy*acz+siny*(sinz*acy+cosz*acx))-sinz*(cosz*acy-sinz*acx);


    let bx;
    let by;

    if(dz>0){

      bx=Infinity;
      by=Infinity;
      //console.log('[ALERTE] Mon Z est HALAL',bx,by);
    }else {
      bx = camera.ez / dz * dx + camera.ex;
      by = camera.ez / dz * dy + camera.ey;
    }

    if(!bx){bx=Infinity;}
    if(!by){by=Infinity;}


    let b = [bx,by];
    return(b);
  }

  get_proj(camera){
    let acx = this.x - camera.x;
    let acy = this.y - camera.y;
    let acz = this.z - camera.z;

    let cosx= Math.cos(camera.tx);
    let cosy= Math.cos(camera.ty);
    let cosz= Math.cos(camera.tz);

    let sinx= Math.sin(camera.tx);
    let siny= Math.sin(camera.ty);
    let sinz= Math.sin(camera.tz);

    return (cosx*(cosy*acz+siny*(sinz*acy+cosz*acx))-sinz*(cosz*acy-sinz*acx));
  }


  draw_on_Map() {
    let ctx = document.getElementById("canvasMap").getContext("2d");
    ctx.fillStyle = 'rgba(255,255,255,255)';
    ctx.beginPath();
    ctx.arc(this.x, this.z, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  draw_on_3D(camera){
    let b = this.project(camera);

    let ctx = document.getElementById("canvas3D").getContext("2d");
    ctx.fillStyle = 'rgba(255,255,255,255)';

    ctx.beginPath();
    ctx.arc(b[0],b[1],2,0,2*Math.PI);
    ctx.fill();
    //console.log('Drew point at 3D[',this.x,',',this.y,',',this.z,']|2D[',b[0],',',b[1],']');
  }
}

class Segment{
  constructor(A,B){
    this.A = A;
    this.B = B;
  }

  set(A,B){
    this.A = A;
    this.B = B;
  }

  static inter_plane(Pa,Pb,camera){
    let x1 = Pa.x;
    let y1 = Pa.y;
    let z1 = Pa.y;
    let w1 = Pa.get_proj(camera);

    let x2 = Pb.x;
    let y2 = Pb.y;
    let z2 = Pb.y;
    let w2 = Pb.get_proj(camera);


    let near = camera.ez;

    let n = (w1 - near) / (w1 - w2);
    let xc = (n * x1) + ((1-n) * x2);
    let yc = (n * y1) + ((1-n) * y2);
    let zc = (n * z1) + ((1-n) * z2);

    let rP = new Point(xc,yc,zc);
    return rP;
  }

  clip(camera){
    let bA = this.A.project(camera);
    let bB = this.B.project(camera);

    if((bA[0] != Infinity)&&(bB[0] != Infinity)){
      return this;
    }else if((bA[0] == Infinity)&&(bB[0] == Infinity)){
      return this;
    }else{
      let rS;
      if(bA[0] == Infinity){
        let nA = Segment.inter_plane(this.A,this.B,camera);
        //console.log(nA);
        rS = new Segment(nA,this.B);
      }
      if(bB[0] == Infinity){
        let nB = Segment.inter_plane(this.B,this.A,camera);
        rS = new Segment(this.A,nB);
      }
      //console.log(rS);
      return rS;

    }
  }


  draw_on_Map(){
    let ctx = document.getElementById("canvasMap").getContext("2d");
    ctx.strokeStyle = '#fff';

    ctx.beginPath();
    ctx.moveTo(this.A.x,this.A.z);
    ctx.lineTo(this.B.x,this.B.z);
    ctx.stroke();
  }

  draw_on_3D(camera){
    let ctx = document.getElementById("canvas3D").getContext("2d");
    ctx.strokeStyle = '#fff';


    let clipped = this.clip(camera);

    let pA = clipped.A.project(camera);
    let pB = clipped.B.project(camera);

    ctx.beginPath();
    ctx.moveTo(pA[0],pA[1]);
    ctx.lineTo(pB[0],pB[1]);
    ctx.stroke();
  }
}

class Polygon{
  constructor(){
    this.points = [];
    this.segments = [];

    let Os = new Segment;
    this.segments.push(Os);
  }

  addpoint(x,y,z){
    let p = new Point(x,y,z);
    this.points.push(p);

    if(this.points.length>1) {
      let s = new Segment(this.points[this.points.length - 2], this.points[this.points.length - 1]);
      this.segments.push(s);
    }

    if(this.points.length>3) {
      this.segments[0].set(this.points[0],this.points[this.points.length-1]);
    }

    //console.log(this.segments);
    //console.log(this.points[this.points.length-1]);
  }

  set(A){
    for(let i = 0;i<A.length;i++){
      this.addpoint(A[i][0],A[i][1],A[i][2]);
    }
  }

  draw_on_Map(){
    /*let ctx = document.getElementById("canvasMap").getContext("2d");
    ctx.strokeStyle = '#fff';
    ctx.beginPath();

    ctx.moveTo(this.points[0].x,this.points[0].z);*/
    for(let i =0;i<this.segments.length;i++){
      this.segments[i].draw_on_Map();

    }
    /*
    ctx.lineTo(this.points[0].x,this.points[0].z);
    ctx.stroke();
    */
  }

  draw_on_3D(camera){
    /*let ctx = document.getElementById("canvas3D").getContext("2d");
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    let p = this.points[0].project(camera);
    ctx.moveTo(p[0],p[1]);*/
    for(let i =0;i<this.segments.length;i++){
      this.segments[i].draw_on_3D(camera);
    }
    /*
    p = this.points[0].project(camera);
    ctx.lineTo(p[0],p[1]);
    ctx.stroke();*/
  }
}
