class Vector extends Matrix{
  constructor(x,y,z){
    super(3,1);
    this.set([[x],[y],[z]]);
  }

  static addition(A,B){return super.addition(A,B).to_Vector();}
  static substract(A,B){return Matrix.substract(A,B).to_Vector();}
  static factor(A,k){return Matrix.factor(A,k).to_Vector();}

  static cartesien(A,B){
    return(
      (A.table[0][0]*B.table[0][0])+
      (A.table[1][0]*B.table[1][0])+
      (A.table[2][0]*B.table[2][0]));
  }

  static lenght(A){
    return(Math.sqrt(
      Math.pow(A.table[0][0],2)+Math.pow(A.table[1][0],2)+Math.pow(A.table[2][0],2)
    ));
  }

  static normalize(A){
    let C = Vector.factor(A,1/Vector.lenght(A));
    return C;
  }

  static intersect(L0,L1,P,N){
    let L = Vector.normalize(Vector.substract(L1,L0));
    let d = Vector.cartesien(Vector.substract(P,L0),N)/Vector.cartesien(L,N);
    if(Vector.cartesien(L,N)!==0) {
      return Vector.addition(Vector.factor(L, d), L0);
    }else{
      return null;
    }
  }

  static HMintesect(L0,L1,P,N){

  }

  static intersign(A,Pp,Pv){
    let P= Vector.substract(Pp,A);
    let C= Vector.cartesien(P,Pv);
    return C/Math.abs(C);
  }

  static project(A, camera){
    //let vO = [camera.x,camera.y,camera.z];
    let T = [camera.tx,camera.ty,camera.tz];

    let cam_pos = new Vector(camera.x,camera.y,camera.z);
    let cam_vect = new Vector(Math.sin(camera.ty),0,Math.cos(camera.ty)); //Impossible de regarder vers le haut ?
    let cam_plane = Vector.addition(cam_pos,Vector.factor(cam_vect,-camera.focal));

    let P = Vector.intersect(cam_pos,A,cam_plane,cam_vect);

    let b;
    if(Vector.intersign(A,cam_plane,cam_vect)===1) {
      let P1 = Vector.substract(P,cam_pos);
      let P2 = Vector.factor(Vector.rotate(P1,T),camera.zoom);
      b = [P2.table[0][0], P2.table[2][0], P2.table[1][0]];
    }else{
      b = null;
    }
    return([P,b]);
  }

  static rotate(A,base){
    let c1 = Math.cos(base[0]);
    let c2 = Math.cos(base[1]);
    let c3 = Math.cos(base[2]);

    let s1 = Math.sin(base[0]);
    let s2 = Math.sin(base[1]);
    let s3 = Math.sin(base[2]);

    let M = new Matrix(3,3);
    M.set([
      [      c2*c3       ,      -c2*s3       ,    s2    ],
      [  c1*s3+c3*s1*s2  ,  c1*c3-s1*s2*s3   ,  -c2*s1  ],
      [ s1*s3 - c1*c3*s2 , c3*s1 + c1*s2*s3  ,   c1*c2  ]
    ]);
    /*
    M.set([
      [      c2*c3 ,  s1*s2*c3-c1*s3 , c1*s2*s3-s1*c3  ],
      [  c2*s3  ,  s1*s2*s3+c1*c3   ,  c1*s2*s3-s1*c3  ],
      [ -s2 , s1*c2  ,   c1*c2  ]
    ]);
    */
    let C = M.invert();
    return(Matrix.multiply(C,A));
  }

  print(){
    console.log(this.table[0][0] + ',' + this.table[1][0] + ',' + this.table[2][0]);
  }
}
