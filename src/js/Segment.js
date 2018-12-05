class Segment{
  constructor(A,B){
    this.A = A;
    this.B = B;
  }

  set(A,B){
    this.A = A;
    this.B = B;
  }

  static clip(s,camera){
    let cam_pos = new Vector(camera.x,camera.y,camera.z);
    let cam_vect = new Vector(Math.sin(camera.ty),0,Math.cos(camera.ty)); //Impossible de regarder vers le haut ?
    let cam_plane = Vector.addition(cam_pos,Vector.factor(cam_vect,-camera.focal-0.05));
    let Asign = Vector.intersign(s.A,cam_plane,cam_vect);
    let Bsign = Vector.intersign(s.B,cam_plane,cam_vect);

    if(Asign===1 && Bsign===1){
      return s;
    }else if(Asign===-1 && Bsign===1) {
      let Aclip = Vector.intersect(s.A,s.B,cam_plane,cam_vect);
      let r = new Segment(Aclip,s.B);
      return r;
    }else if(Asign===1 && Bsign===-1) {
      let Bclip = Vector.intersect(s.A,s.B,cam_plane,cam_vect);
      let r = new Segment(s.A,Bclip);
      return r;
    }else if(Asign===-1 && Bsign===-1){
      return null;
    }
  }


  draw_on_Map(canvas,camera){
    canvas.draw_line(this.A.table[0][0],this.A.table[2][0],this.B.table[0][0],this.B.table[2][0]);
  }

  draw_on_3D(canvas, camera){
    let clipped = Segment.clip(this,camera);

    if(clipped) {
      let pA = Vector.project(clipped.A,camera)[1];
      let pB = Vector.project(clipped.B,camera)[1];
      canvas.draw_line(pA[0], pA[2], pB[0], pB[2]);
    }
  }
}
