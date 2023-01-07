const pixel = 17;
const time = 100;
const tablero = document.querySelector(".div1")
const snake = document.querySelector(".snake") 
const manzana = document.querySelector(".manzana")
const contador = document.querySelector(".contador")  
let posV = 238, posH = 34 , mPosV = 238, mPosH = 340;
let arriba, abajo, derecha, izquierda; 
let HorizontalActivo = false,VerticalActivo = false;
let vivo = true;
let dirH = [], dirV = [];

manzana.setAttribute("style","transform: translate( " + mPosH+ "px, " + mPosV + "px)");

let tsnake = [] ; let cont = 0;
tsnake.push(document.createElement("div"));

setInterval(() => {
    if (mPosH == posH && mPosV == posV) {
        tsnake.push(document.createElement("div"));
        tsnake[cont].classList.add('tsnake');
        tsnake[cont].setAttribute("style","transform: translate(" + mPosH+ "px, " + mPosV + "px);")
        tablero.appendChild((tsnake[cont]));
        cont++; 
        mPosV =  (Math.floor(Math.random() * 29) + 1) * pixel;
        mPosH = (Math.floor(Math.random() * 29) + 1) * pixel;    
        manzana.setAttribute("style","transform: translate(" + mPosH+ "px, " + mPosV + "px)");
        contador.textContent = cont;
    }
})
function mover(H,V) {
    dirH.unshift(posH);
    dirV.unshift(posV);
    dirH = dirH.slice(0,tsnake.length-1);
    dirV = dirV.slice(0,tsnake.length-1);
    for (let i = 0; i < tsnake.length; i++) {
        tsnake[i].setAttribute("style","transform:translate(" + dirH[i] + "px, " + dirV[i] + "px);");
    }
    posH += H;
    posV += V;
    snake.setAttribute("style", "transform: translate(" + posH + "px, " + posV + "px)");
}
function choque(key) {
    let colision = false;
    for (let i = 1; i < tsnake.length-1; i++) {
        switch (key) {
            case "ArrowUp" : {
                if (dirH[i] == posH && (dirV[i] + pixel) >= posV && (dirV[i] - pixel) < posV){
                    colision = true;
                    i = tsnake.length;
                }
                break;
            }
            case "ArrowRight" : {
                if ((dirH[i] - pixel) <= posH && (dirH[i] + pixel) > posH && dirV[i] == posV){
                    colision = true;
                    i = tsnake.length;
                }
                break;
            }
            case "ArrowDown" : {
                if (dirH[i] == posH && (dirV[i] - pixel) <= posV && (dirV[i] + pixel) > posV){
                    colision = true;
                    i = tsnake.length;
                }
                break;
            }
            case "ArrowLeft" : {
                if ((dirH[i] + pixel) >= posH && (dirH[i] + pixel) < posH && dirV[i] == posV){
                    colision = true;
                    i = tsnake.length;
                }
                break;
            }
        }
        
    }
    return colision;
}
window.addEventListener("keydown",(e)=>{
    if (vivo) {
        arriba = false, abajo = false, derecha = false, izquierda = false;
        if (e.key == "ArrowUp") {
            if (!VerticalActivo) {
                arriba = true;
                if (posV > 0) { 
                    mover(0,-pixel);
                }
                HorizontalActivo = false; VerticalActivo = true;
                let tiempo = setInterval(() => {
                    if (abajo == true || izquierda == true || derecha == true) {
                        clearInterval(timer);
                        clearInterval(tiempo);
                    }
                })
                let timer = setInterval(() => {
                    if (abajo == true || izquierda == true || derecha == true) {
                       clearInterval(timer);
                    } else {
                        if (posV > 0 && !choque(e.key)) {
                            mover(0,-pixel);
                        } else {
                            clearInterval(timer);
                            vivo = false;
                        }
                    }
                },time)
            }
        }
        if (e.key == "ArrowRight") {
            if (!HorizontalActivo) {
                derecha = true;
                if (posH < 493) {
                    mover(pixel,0);
                }
                HorizontalActivo = true; VerticalActivo = false;
                let tiempo = setInterval(() => {
                    if (arriba == true || izquierda == true || abajo == true) {
                        clearInterval(timer);
                        clearInterval(tiempo);
                    }
                })
                let timer = setInterval(() => {
                    if (arriba == true || izquierda == true || abajo == true) {
                       clearInterval(timer);
                    } else {
                        if (posH < 493 && !choque(e.key)) {
                            mover(pixel,0);
                        } else {
                            clearInterval(timer);
                            vivo = false;
                        }
                    }
                },time)
            }
        }
        if (e.key == "ArrowDown") {
            if(!VerticalActivo) {
                abajo = true;
                if (posV < 493) {
                    mover(0,pixel);
                }
                HorizontalActivo = false; VerticalActivo = true;
                let tiempo = setInterval(() => {
                    if (arriba == true || izquierda == true || derecha == true) {
                        clearInterval(timer);
                        clearInterval(tiempo);
                    }
                })
                let timer = setInterval(() => {

                    if (arriba == true || izquierda == true || derecha == true) {
                       clearInterval(timer);
                    } else {
                        if (posV < 493 && !choque(e.key)) {
                            mover(0,pixel);
                        } else {
                            clearInterval(timer);
                            vivo = false;
                        }
                    }    
                },time)
            } 
        }
        if (e.key == "ArrowLeft") {
            if (!HorizontalActivo) {
                izquierda = true;
                if (posH > 0) {
                    mover(-pixel,0);
                }
                HorizontalActivo = true; VerticalActivo = false;
                let tiempo = setInterval(() => {
                    if (arriba == true || abajo == true || derecha == true) {
                        clearInterval(timer);
                        clearInterval(tiempo);
                    }
                })
                let timer = setInterval(() => {
                    if (arriba == true || abajo == true || derecha == true) {
                       clearInterval(timer);
                    } else {
                        if (posH > 0 && !choque(e.key)) {
                            mover(-pixel,0);
                        } else {
                            clearInterval(timer);
                            vivo = false;
                        }
                    }

                },time)
            }
        }
    } else {
        if (e.key === " ") {
            location.reload();
        }
    }
    if (e.key === "r") {
        location.reload();
    }
});
