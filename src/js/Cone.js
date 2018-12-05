class Cone{
  constructor(P1,R1,P2,R2){
    this.P1 = P1;
    this.P2 = P2;

    this.R1 = R1;
    this.R2 = R2;

    this.color = gold;
  }

  intersect(Lp,Lv){
    let P1 = this.P1;
    let P2 = this.P2;

    let R1 = this.R1;
    let R2 = this.R2;

    let P12 = Vector.substract(P2,P1);

    //https://mrl.nyu.edu/~dzorin/rend05/lecture2.pdf
    let P0 = Vector.addition(P1,Vector.factor(P12,R1/(R1-R2))); // sommet du cône
    let V = Vector.normalize(P12);                              // normale du cône
    let a = (R1-R2)/Vector.lenght(P12);                         // demi-angle du cône

    P0 = P1;
    V = new Vector(0,-1,0);
    a = Math.PI/8;

    let cos2a = Math.pow(Math.cos(a),2);
    let sin2a = Math.pow(Math.sin(a),2);

    let Lpp = Vector.substract(Lp,P0);                         // distance (sommet)-(origine de la droite)
    /*let A = Vectorcos2a*(Vector.power(Vector.substract(V,Vector.factor(Lv,Vector.cartesien(V,Lv))),2)) - sin2a;
    */

    let A = Math.pow(Vector.cartesien(Lv,V),2)-cos2a;
    let B = 2*(Vector.cartesien(Lv,V)*Vector.cartesien(Lpp,V)-Vector.cartesien(Lv,Vector.factor(Lpp,cos2a)));
    let C = Math.pow(Vector.cartesien(Lpp,V),2)-Vector.cartesien(Lpp,Vector.factor(Lpp,cos2a));

    return(solve(A,B,C));
  }
}
