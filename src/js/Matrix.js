class Matrix{
  constructor(x,y){
    this.table = [];
    for(let i=0;i<x;i++){
      this.table.push([]);
      for(let j=0;j<y;j++){
        this.table[i].push(0);
      }
    }
  }

  set(T){
    if((T.length!==this.table.length)&&(T[0].length!==this.table[0].length)){
      return 0;
    }

    for(let i=0;i<this.table.length;i++){
      for(let j=0;j<this.table[0].length;j++){
        this.table[i][j]=T[i][j];
      }
    }
  }

  copy(M){
    this.set(M.table);
  }

  to_Vector(){
    if((this.table.length !== 3)||(this.table[0].length !== 1)){
      return 0;
    }else {
      return new Vector(this.table[0][0],this.table[1][0],this.table[2][0]);
    }
  }

  set_identity(){
    if((this.table.length!==this.table[0].length)){
      return 0;
    }
    for(let i=0;i<this.table.length;i++){
      this.table[i][i]=1;
    }
    return 1;
  }

  static addition(A,B){
    if((A.table.length !== B.table.length) || (A.table[0].length !== B.table[0].length )){
      return 0;
    }

    let C = new Matrix(A.table.length,A.table[0].length);
    for(let i=0;i<A.table.length;i++) {
      for (let j = 0; j < B.table[0].length; j++) {
        C.table[i][j] = A.table[i][j] + B.table[i][j];
      }
    }
    return C;
  }

  static substract(A,B){
    if((A.table.length !== B.table.length) || (A.table[0].length !== B.table[0].length )){
      return 0;
    }

    let C = new Matrix(A.table.length,A.table[0].length);
    //console.log(C);
    for(let i=0;i<A.table.length;i++) {
      for (let j = 0; j < B.table[0].length; j++) {
        C.table[i][j] = A.table[i][j] - B.table[i][j];
      }
    }
    return C;
  }

  static factor(A,k){
    let C = new Matrix(A.table.length,A.table[0].length);
    for(let i=0;i<A.table.length;i++) {
      for (let j = 0; j < A.table[0].length; j++) {
        C.table[i][j] = A.table[i][j] * k;
      }
    }
    return C;
  }

  static multiply(A,B){
    let C = new Matrix(A.table.length, B.table[0].length);

    for(let i=0;i<A.table.length;i++){
      for(let j=0;j<B.table[0].length;j++){
        let s = 0;
        for(let k=0;k<B.table.length;k++){
          s += A.table[i][k]*B.table[k][j];
        }

        if(Math.abs(s) < Math.pow(10,-15)){
          s = 0;
        }

        C.table[i][j] = s;
      }
    }

    return C;
  }

  static invert(M_){
    let n = M_.table.length;
    let M = new Matrix(n,n);
    M.copy(M_);
    let I = new Matrix(n,n);
    I.set_identity();

    let aux;
    //On nullifie tous les éléments autres que ceux de la diagonale
    for(let k=0; k<n;k++) {
      for (let i = 0; i < n; i++) {
        if (i !== k) {
          aux = M.table[i][k] / M.table[k][k];
          //disp(aux);
          for (let j = 0; j < n; j++) {
            M.table[i][j] = M.table[i][j] - aux * M.table[k][j];
            I.table[i][j] = I.table[i][j] - aux * I.table[k][j];
          }
        }
      }
    }
    //On divise les lignes par les éléments de la diagonale
    for(let i=0; i<n;i++) {
      for (let j = 0; j < n; j++){
        I.table[i][j] = I.table[i][j] / M.table[i][i];
      }
      M.table[i][i]=1;
    }
    return I;
  }

  invert(){
    return(Matrix.invert(this));
  }
}
