class Point{
  constructor(x,y,z){
    this.id = '';
    this.color = '';
    this.pos = new Vector(x,y,z);
  }

  x(){return(this.pos.table[0][0])}
  y(){return(this.pos.table[1][0])}
  z(){return(this.pos.table[2][0])}

  draw_on_Map(canvas,camera) {
    let p = Vector.project(this.pos,camera)[0];
    if(p) {
      canvas.draw_point(this.x(), this.z(),gold);
      canvas.draw_point(p.table[0][0], p.table[2][0],gold.alpha(20));
      /*canvas.draw_text(p.table[0][0], p.table[2][0],
        (p.table[0][0]).toFixed(0) + ',' + (p.table[1][0]).toFixed(0) + ',' + (p.table[2][0]).toFixed(0));*/
    }
  }

  draw_on_3D(canvas,camera){
    let b = Vector.project(this.pos,camera)[1];
    if(b) {
      canvas.draw_point(b[0], b[2],gold);
      /*canvas.draw_text(b[0], b[2],
        (b[0]).toFixed(0) + ',' + (b[1]).toFixed(0) + ',' + (b[2]).toFixed(0));*/
      canvas.draw_text(b[0], b[2],
        (this.x()).toFixed(0) + ',' + (this.y()).toFixed(0) + ',' + (this.z()).toFixed(0),gold.alpha(80));
    }
  }
}
