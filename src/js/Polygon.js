class Polygon{
  constructor(A,B,C){
    this.A = A;
    this.B = B;
    this.C = C;

    this.color = undefined;
  }

  /*
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
  */

  draw_on_Map(canvas, camera){
    canvas.draw_polygon([
      [this.A.table[0][0],this.A.table[2][0]],
      [this.B.table[0][0],this.B.table[2][0]],
      [this.C.table[0][0],this.C.table[2][0]],
    ],this.color);
  }

  draw_on_3D(canvas,camera){
    let AB = Segment.clip(new Segment(this.A,this.B),camera);
    let BC = Segment.clip(new Segment(this.B,this.C),camera);
    let CA = Segment.clip(new Segment(this.C,this.A),camera);

    let draw = [];
    if(AB){
      let pA = Vector.project(AB.A,camera)[1];
      let pB = Vector.project(AB.B,camera)[1];
      draw.push([pA[0], pA[2]],[pB[0], pB[2]]);
    }
    if(BC){
      let pA = Vector.project(BC.A,camera)[1];
      let pB = Vector.project(BC.B,camera)[1];
      draw.push([pA[0], pA[2]],[pB[0], pB[2]]);
    }
    if(CA){
      let pA = Vector.project(CA.A,camera)[1];
      let pB = Vector.project(CA.B,camera)[1];
      draw.push([pA[0], pA[2]],[pB[0], pB[2]]);
    }
    if(draw.length){
      canvas.draw_polygon(draw,this.color);
    }
  }
}
