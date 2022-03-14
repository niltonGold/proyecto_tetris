
// CONSTANTES GLOBALES
const BOARD_WIDTH = 10; // Ancho del tablero
const BOARD_HEIGHT = 20; // Alto del tablero
const classBigBoard = document.querySelector('.bigBoard'); // captura el contenedor del tablero grande
const classVentanaGameOver = document.querySelector('.ventana_gameover');
const body = document.querySelector('.body');


// VARIABLE PARA PODER MOSTRAR EL SIGUIENTE TETROMINIO EN EL TABLERO PEQUEÑO
let nextRandom = 0;



// MUSICA GENERAL DEL JUEGO
let tetrisMusic = document.getElementById("tetrisMusic");

function togglePlay() {
    return tetrisMusic.paused ? tetrisMusic.play() : tetrisMusic.pause();
};
tetrisMusic.volume = 0.1;
tetrisMusic.loop = true;




// PINTAR LOS CUADRADOS DEL TABLERO GRANDE
    
            // Funcion que pinta un bloque y otro dentro de este
            function generateBoardBlock(){
                // etiqueta del bloque contenedor y el bloque contenedor interno
                const bloqueContenedor = document.createElement('div');
                const bloqueContenedorInterno = document.createElement('div');
                
                // clases del bloque contenedor y el bloque contenedor interno
                bloqueContenedor.className = 'bloque__contenedor';
                bloqueContenedorInterno.className = 'bloque__contenedor-interno';

                // agregar dentro del bloque contenedor otro contenedor interno
                bloqueContenedor.appendChild(bloqueContenedorInterno);
                return bloqueContenedor;
            }

            // Funcion que pintara todos los bloques del tablero grande
            function drawBoard( nameClass, width, height ){
                const tablero = document.querySelector(`.${nameClass}`);

                for (let i = 0; i < width *height; i++ ){
                    tablero.appendChild( generateBoardBlock() )
                }
            }



// PINTAR LOS CUADRADOS DEL TABLERO PEQUEÑO
        

            // Funcion que pinta un bloque y otro dentro de este
            function generateMiniBoardBlock(){
                // etiqueta del bloque contenedor y el bloque contenedor interno
                const bloqueContenedor = document.createElement('div');
                const bloqueContenedorInterno = document.createElement('div');
                
                // clases del bloque contenedor y el bloque contenedor interno
                bloqueContenedor.className = 'bloque__contenedor_mini';
                bloqueContenedorInterno.className = 'bloque__contenedor-interno_mini';

                // agregar dentro del bloque contenedor otro contenedor interno
                bloqueContenedor.appendChild(bloqueContenedorInterno);
                return bloqueContenedor;
            }

            // Funcion que pintara todos los bloques del tablero pequeño
            function drawMiniBoard( nameClass, width, height ){
                const tablero = document.querySelector(`.${nameClass}`);

                for (let i = 0; i < width *height; i++ ){
                    tablero.appendChild( generateMiniBoardBlock() )
                }
            }


          

// FUNCION QUE CREA UN BLOQUE MAS AL FINAL DEL TABLERO GRANDE DE MANERO IDENTIFICABLE
function generateBoardBlockFinal(){
    const bloqueFinal = document.createElement('div');
    bloqueFinal.classList.add('bloque__contenedor');
    bloqueFinal.classList.add('bloque_bloqueado');
    bloqueFinal.classList.add('final_line');
    return bloqueFinal;
}


// FUNCION PARA PINTAR UNA LINEA AL FINAL DE LA TABLA GRANDA QUE AYUDARA A DETENER LOS TETROMINIOS
function drawBoradFinalLine( nameClass, width ){
    const tablero = document.querySelector(`.${nameClass}`);
    for(let i = 0; i < width; i++){
        tablero.appendChild(generateBoardBlockFinal());
    }
} 






// EJECUCION DE LA FUNCION PARA PINTAR EL TABLERO GRANDE
  drawBoard('bigBoard', 10,20);

// EJECUCION DE LA FUNCION PARA LA LINEA FINAL DEL TABLERO GRANDE
  drawBoradFinalLine('bigBoard',10);

// EJECUCION DE LA FUNCION PARA PINTAR EL TABLERO PEQUEÑO
  drawMiniBoard('score-cuadrados-tetrominios',4,4);


// VARIABLE QUE CONTENTRA UN ARRAY GIGANTE CON TODOS LOS BLOQUES DEL TABLERO
    let boardArray = Array.from(document.querySelectorAll('.bloque__contenedor'));

    
// ROTACIONES DE LOS TETROMINIOS
            //tetrominio_I
            const tetrominio_I = [
                [ BOARD_WIDTH , BOARD_WIDTH+1 , BOARD_WIDTH+2   , BOARD_WIDTH+3   ], // R = 1
                // [ 0 , 1 , 2   , 3   ], // R = 1
                [      1      , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 , BOARD_WIDTH*3+1 ], // R = 2
                [ BOARD_WIDTH , BOARD_WIDTH+1 , BOARD_WIDTH+2   , BOARD_WIDTH+3   ], // R = 3
                [      1      , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 , BOARD_WIDTH*3+1 ], // R = 4
            ];

            //tetrominio_L
            const tetrominio_L = [
                [ BOARD_WIDTH   ,  BOARD_WIDTH+1  , BOARD_WIDTH+2   , BOARD_WIDTH*2   ], // R = 1
                // [ 0   ,  1  , 2   , BOARD_WIDTH   ], // R = 1
                [      0        ,         1       , BOARD_WIDTH+1   , BOARD_WIDTH*2+1 ], // R = 2
                [ BOARD_WIDTH+2 ,  BOARD_WIDTH*2  , BOARD_WIDTH*2+1 , BOARD_WIDTH*2+2 ], // R = 3
                [      0        ,  BOARD_WIDTH    , BOARD_WIDTH*2   , BOARD_WIDTH*2+1 ], // R = 4
            ];
            
            //tetrominio_S
            const tetrominio_S = [
                [ BOARD_WIDTH+1 , BOARD_WIDTH+2 , BOARD_WIDTH*2 , BOARD_WIDTH*2+1 ], // R = 1
                // [ 1 , 2 , BOARD_WIDTH , BOARD_WIDTH+1 ], // R = 1
                [        0      , BOARD_WIDTH   , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 ], // R = 2
                [ BOARD_WIDTH+1 , BOARD_WIDTH+2 , BOARD_WIDTH*2 , BOARD_WIDTH*2+1 ], // R = 3
                [        0      , BOARD_WIDTH   , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 ], // R = 4
            ];
            
            //tetrominio_Z
            const tetrominio_Z = [
                [ BOARD_WIDTH , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 , BOARD_WIDTH*2+2 ], // R = 1
                // [ 0 , 1 , BOARD_WIDTH+1 , BOARD_WIDTH+2 ], // R = 1
                [       2     , BOARD_WIDTH+1 , BOARD_WIDTH+2   , BOARD_WIDTH*2+1 ], // R = 2
                [ BOARD_WIDTH , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 , BOARD_WIDTH*2+2 ], // R = 3
                [       2     , BOARD_WIDTH+1 , BOARD_WIDTH+2   , BOARD_WIDTH*2+1 ], // R = 4
            ];
            
            //tetrominio_J
            const tetrominio_J = [
                [ BOARD_WIDTH , BOARD_WIDTH+1 , BOARD_WIDTH+2   , BOARD_WIDTH*2+2 ], // R = 1
                // [ 0 , 1 , 2   , BOARD_WIDTH+2 ], // R = 1
                [       1     , BOARD_WIDTH+1 , BOARD_WIDTH*2   , BOARD_WIDTH*2+1 ], // R = 2
                [ BOARD_WIDTH , BOARD_WIDTH*2 , BOARD_WIDTH*2+1 , BOARD_WIDTH*2+2 ], // R = 3
                [       1     ,       2       , BOARD_WIDTH+1   , BOARD_WIDTH*2+1 ], // R = 4
            ];
            
            //tetrominio_O
            const tetrominio_O = [
                [ 0 , 1 , BOARD_WIDTH , BOARD_WIDTH+1 ], // R = 1
                [ 0 , 1 , BOARD_WIDTH , BOARD_WIDTH+1 ], // R = 2
                [ 0 , 1 , BOARD_WIDTH , BOARD_WIDTH+1 ], // R = 3
                [ 0 , 1 , BOARD_WIDTH , BOARD_WIDTH+1 ], // R = 4
            ];
            
            //tetrominio_T
            const tetrominio_T = [
                [ BOARD_WIDTH   , BOARD_WIDTH+1 , BOARD_WIDTH+2 , BOARD_WIDTH*2+1 ], // R = 1
                // [ 0   , 1 , 2 , BOARD_WIDTH+1 ], // R = 1
                [       1       , BOARD_WIDTH   , BOARD_WIDTH+1 , BOARD_WIDTH*2+1 ], // R = 2
                [       1       , BOARD_WIDTH   , BOARD_WIDTH+1 , BOARD_WIDTH+2   ], // R = 3
                [       1       , BOARD_WIDTH+1 , BOARD_WIDTH+2 , BOARD_WIDTH*2+1 ], // R = 4
            ];



// ARRAY CONTENEDOR DE LOS TETROMINIOS
const tetrominiosArray = [ tetrominio_I , tetrominio_L , tetrominio_S , tetrominio_Z , tetrominio_J , tetrominio_O , tetrominio_T ];



// POSICION INICIAL EN EL TABLERO DE UN TETROMINIO
let posicionActual_en_tablero = 4;



// SELECCION DE LA ROTACION ACTUAL DEL TETROMINIO, HAY 4 POSIBLES ROTACIONES
let rotacionActualTetrominio = 0;



// ROTACION ALEATORIA DEL TETROMINIO
let random = Math.floor( Math.random() * tetrominiosArray.length );
let forma_del_tetrominio_elegido = tetrominiosArray[random][rotacionActualTetrominio];

// DIBUJAR EL TETROMINIO EN EL TABLERO
function draw(){
    forma_del_tetrominio_elegido.forEach( element => boardArray[posicionActual_en_tablero+element].classList.add('tetrominioBlock') );
}



// BORRAR EL TETROMINIO
function undraw(){
    forma_del_tetrominio_elegido.forEach( b => boardArray[ posicionActual_en_tablero + b ].classList.remove('tetrominioBlock') )
}



// TIEMPO QUE TARDA CADA TETROMINIO EN BAJAR 
time = setInterval(moveDown, 1000);



// CONGELA A LOS TETROMINIOS CUANDO LLEGAN AL BORDE FINAL DEL TABLERO o 
// CONGELA UN TETROMINIO SI HAY OTRO DEBAJO
// ME AYUDA A MOSTRAR EL SIGUIENTE TETROMINIO QUE CAERÁ EN EL TABLERO PEQUEÑO
// EJECUCION DE LA FUNCION PARA CALCULAR EL SCORE
function generateTetrominioBloqueado(){

     
    // si algun bloque de la siguiente fila esta bloqueado
    if ( forma_del_tetrominio_elegido.some( bloque_del_tetrominio => boardArray[posicionActual_en_tablero + bloque_del_tetrominio + BOARD_WIDTH].classList.contains('bloque_bloqueado') ) ) {

        
        isGameOver();
        forma_del_tetrominio_elegido.forEach( bloque_del_tetrominio => boardArray[posicionActual_en_tablero+bloque_del_tetrominio].classList.add('bloque_bloqueado') );
        
        random = nextRandom;
        nextRandom = Math.floor(Math.random()*tetrominiosArray.length);
        forma_del_tetrominio_elegido = tetrominiosArray[random][rotacionActualTetrominio];
        posicionActual_en_tablero = 4;

        const audioLand = new Audio("./music/samples_land.mp3");
        audioLand.play();
        audioLand .volume = 0.2;

        draw();

        
        addScore();
        
    }
} 



// MOVER LOS TETROMINIO AL TOCAR LAS TECLAS DE MOVIMIENTOS (FLECHAS)
function controles(tecla){
        if (tecla.keyCode === 37){
            moveLetf(); // izquierda
            const audioMove = new Audio("./music/samples_move.mp3");
            audioMove.volume = 0.2;
            audioMove.play();

    }else if (tecla.keyCode === 38) {
            rotar(); // arriba
            const audioRotate = new Audio("./music/samples_rotate.mp3");
            audioRotate.volume = 0.2;
            audioRotate.play();

    }else if (tecla.keyCode === 39) {
            moveRight(); //derecha
            const audioMove = new Audio("./music/samples_move.mp3");
            audioMove.volume = 0.2;
            audioMove.play();

    }else if (tecla.keyCode === 40) {
            moveDown(); // abajo
            const audioMove = new Audio("./music/samples_move.mp3");
            audioMove.volume = 0.2;
            audioMove.play();
           
    }
}



// BLOQUEAR  BARRA DE DESPLAZAMIENTO CON LAS TECLAS
let keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

    // evento para todo el body
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);


    // Evento al tocar una tecla
    document.addEventListener('keydown', controles);





// AGREGAR AL BODY UN EVENTO QUE REACCIONARA AL TOCAR UNA TECLA
// document.addEventListener('keyup', controles);


    // FUNCION PARA MOVERSE (IZQUIERDA)
    function moveLetf(){
        undraw();

        // la funcion some devolvera true si alguno de los elementos cumple la condicion, false si ninguno de los elementos cumple la condicion
        // bloque_del_tetrominio es un bloque pintado que forma un tetrominio
        // bordeIzquierdo sera true si estoy pegado al lado izquierdo del tablero
        const bordeIzquierdo = forma_del_tetrominio_elegido.some( bloque_del_tetrominio => ( (posicionActual_en_tablero + bloque_del_tetrominio) % BOARD_WIDTH ) === 0);
        
        
        // si es verdad que estoy en el borde izquierdo entonces:
        if (!bordeIzquierdo) {
            posicionActual_en_tablero -= 1; // si no estoy al borde me muevo a la izquierda por eso le resto uno
        }            


        // si al moverme a la izquierda me topo con una bloque bloqueado entonces al moverme a la izquierda me volvere a la posicion 
        // anterior, por eso le sumo 1
        if (  forma_del_tetrominio_elegido.some( b => boardArray[posicionActual_en_tablero + b].classList.contains('bloque_bloqueado') )  ) {
            posicionActual_en_tablero += 1;
        }
        draw();
    }


    // FUNCION PARA MOVERSE (ROTAR)
  
    function rotar(){

        
        // tetrominio que llega antes de rotar
        let arrayARotar = tetrominiosArray[random][rotacionActualTetrominio]; 
        

         // constante que me indica si un tetrominio esta pegado a la izquierda
        const bordeIz = forma_del_tetrominio_elegido.some( bloque_del_tetrominio => ( (posicionActual_en_tablero + bloque_del_tetrominio) % BOARD_WIDTH ) === 0);


        // constante que me indica si un tetrominio esta pegado a la derecha
         const bordeDer = forma_del_tetrominio_elegido.some( b => ( (posicionActual_en_tablero + b) % BOARD_WIDTH ) === ( BOARD_WIDTH - 1 ) );

        
        //pasaYRota estara originalmente a true, 
        //  si es true significa que:
        //      -no es ninguno de los tetrominios prohibidos y ademas
        //      -no esta pegado ni a borde derecho ni al borde izquierdo
        //  y puede pasar
        //
        //  si es false significa que el tetrominio esta al borde y ademas es uno de 
        //  los tetrominio que no puede rotar al estar al borde izquierdo o derecho
        let pasaYRota = true;




     

        // TETROMINIO I ROTACIONES PROHIBIDAS

            // Tetrominio I Rotaciones al borde
                //constante que me indica si el tetrominio I rotacion 2 o 4 esta a 1 columa de distancia del borde derecho
                const bordeDer2_tetrominio_I = forma_del_tetrominio_elegido.some( b => ( ( (posicionActual_en_tablero+1) + b) % (BOARD_WIDTH) ) === ( BOARD_WIDTH - 1 ) );

                if ( (arrayARotar == tetrominiosArray[0][1]) || (arrayARotar === tetrominiosArray[0][3]) ){
                         
                    // tetrominio I rotacion 2 y 3 y pegado a la izquierda, no puede rotar  
                    if ( (bordeIz)  ){
                        pasaYRota = false;
                    }
    
                    // tetrominio I rotacion 2 y 3 y pegado a la derecha, no puede rotar    
                    if ( (bordeDer) ){
                        pasaYRota = false;
                    }
    
                    // tetrominio I rotacion 2 y 3 y a una columna de distancia del borde derecho, no puede rotar
                    if ( (bordeDer2_tetrominio_I)  ){
                        pasaYRota = false;
                    }
                }

            // Tetrominio I Rotaciones cerca de otros tetrominios

                // Tetrominio I Rotacion 1 y 3
                    let bloque1_prohibido_para_tetrominio_I_R1_R3 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2)+1].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_I_R1_R3 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*3)+1].classList.contains('bloque_bloqueado');
                      
                    if ( (arrayARotar === tetrominiosArray[0][0]) || (arrayARotar === tetrominiosArray[0][2])){
                        
                        if(bloque1_prohibido_para_tetrominio_I_R1_R3){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_I_R1_R3){
                            pasaYRota = false;
                        }

                        if(bloque1_prohibido_para_tetrominio_I_R1_R3 && bloque2_prohibido_para_tetrominio_I_R1_R3){
                            pasaYRota = false;
                        }
                    
                    }

                // Tetrominio I Rotacion 2 y 4
                    let bloque1_prohibido_para_tetrominio_I_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_I_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');
                    let bloque3_prohibido_para_tetrominio_I_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+3)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[0][1]) || (arrayARotar === tetrominiosArray[0][3])){
                        
                        if(bloque1_prohibido_para_tetrominio_I_R2_R4){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_I_R2_R4){
                            pasaYRota = false;
                        }

                        if(bloque3_prohibido_para_tetrominio_I_R2_R4){
                            pasaYRota = false;
                        }
                    
                    }


        // TETROMINIO L ROTACIONES PROHIBIDAS

                // Tetrominio L Rotaciones al borde
                    // Tetrominio L Rotacion 2 y 4
                        if (  (arrayARotar === tetrominiosArray[1][1]) || (arrayARotar === tetrominiosArray[1][3]) ) {
                            if ( bordeDer ) {
                                pasaYRota = false;
                            }
                        }


                // Tetrominio L Rotaciones cerca de otros tetrominios
                    // tetrominio L rotacion 1
                        let bloque1_prohibido_para_tetrominio_L_R1 = boardArray[(posicionActual_en_tablero)].classList.contains('bloque_bloqueado');
                        let bloque2_prohibido_para_tetrominio_L_R1 = boardArray[(posicionActual_en_tablero + 1)].classList.contains('bloque_bloqueado');
                        let bloque3_prohibido_para_tetrominio_L_R1 = boardArray[(posicionActual_en_tablero) + (BOARD_WIDTH*2+1)].classList.contains('bloque_bloqueado');
                        
                        if ( (arrayARotar === tetrominiosArray[1][0]))
                        {
                        
                            if(bloque1_prohibido_para_tetrominio_L_R1){
                                pasaYRota = false;
                            }
    
                            if(bloque2_prohibido_para_tetrominio_L_R1){
                                pasaYRota = false;
                            }
    
                            if(bloque3_prohibido_para_tetrominio_L_R1){
                                pasaYRota = false;
                            }
                        
                        }


                    // tetrominio L rotacion 2
                        let bloque1_prohibido_para_tetrominio_L_R2 = boardArray[(posicionActual_en_tablero+2)].classList.contains('bloque_bloqueado');
                        let bloque2_prohibido_para_tetrominio_L_R2 = boardArray[(posicionActual_en_tablero) + (BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');
                        let bloque3_prohibido_para_tetrominio_L_R2 = boardArray[(posicionActual_en_tablero) + (BOARD_WIDTH*2+2)].classList.contains('bloque_bloqueado');
                        
                        if ( (arrayARotar === tetrominiosArray[1][1]))
                        {
                        
                            if(bloque1_prohibido_para_tetrominio_L_R2){
                                pasaYRota = false;
                            }
    
                            if(bloque2_prohibido_para_tetrominio_L_R2){
                                pasaYRota = false;
                            }
    
                            if(bloque3_prohibido_para_tetrominio_L_R2 ){
                                pasaYRota = false;
                            }
                        
                        }
                    
                    
                    // tetrominio L rotacion 3
                        let bloque1_prohibido_para_tetrominio_L_R3 = boardArray[(posicionActual_en_tablero)].classList.contains('bloque_bloqueado');
                        let bloque2_prohibido_para_tetrominio_L_R3 = boardArray[(posicionActual_en_tablero) + (BOARD_WIDTH)].classList.contains('bloque_bloqueado');
                        
                        if ( (arrayARotar === tetrominiosArray[1][2]))
                        {
                        
                            if(bloque1_prohibido_para_tetrominio_L_R3){
                                pasaYRota = false;
                            }
    
                            if(bloque2_prohibido_para_tetrominio_L_R3){
                                pasaYRota = false;
                            }
                        
                        }
                    
                    
                    
                    // tetrominio L rotacion 4
                        let bloque1_prohibido_para_tetrominio_L_R4 = boardArray[(posicionActual_en_tablero) + (BOARD_WIDTH+1)].classList.contains('bloque_bloqueado');
                        let bloque2_prohibido_para_tetrominio_L_R4 = boardArray[(posicionActual_en_tablero) + (BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');
                        
                        if ( (arrayARotar === tetrominiosArray[1][3]))
                        {
                        
                            if(bloque1_prohibido_para_tetrominio_L_R4){
                                pasaYRota = false;
                            }
    
                            if(bloque2_prohibido_para_tetrominio_L_R4){
                                pasaYRota = false;
                            }
                        
                        }


        // TETROMINIO S ROTACIONES PROHIBIDAS
        
                // Tetrominio S Rotaciones 2 y 4 al borde
                    if (  (arrayARotar === tetrominiosArray[2][1]) || (arrayARotar === tetrominiosArray[2][3]) ) {
                        if ( bordeDer ) {
                            pasaYRota = false;
                        }
                    }

                    
                // Tetrominio S Roaciones cerca de otros tetrominios
                    // Tetrominio S Rotacion 1 y 3
                    let bloque1_prohibido_para_tetrominio_S_R1_R3 = boardArray[(posicionActual_en_tablero)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_S_R1_R3 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH)].classList.contains('bloque_bloqueado');
                    
                    if ( (arrayARotar === tetrominiosArray[2][0]) || (arrayARotar === tetrominiosArray[2][2])){
                        
                        if(bloque1_prohibido_para_tetrominio_S_R1_R3){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_S_R1_R3){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio S Rotacion 2 y 4
                    let bloque1_prohibido_para_tetrominio_S_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_S_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[2][1]) || (arrayARotar === tetrominiosArray[2][3])){
                        
                        if(bloque1_prohibido_para_tetrominio_S_R2_R4){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_S_R2_R4){
                            pasaYRota = false;
                        }

                    }


        // TETROMINIO Z ROTACIONES PROHIBIDAS
        
                // Tetrominio Z Rotaciones 2 y 4 al borde
                if (  (arrayARotar === tetrominiosArray[3][1]) || (arrayARotar === tetrominiosArray[3][3]) ) {
                    if ( bordeIz ) {
                        pasaYRota = false;
                    }
                }
                    

                // Tetrominio Z Rotaciones cerca de otros tetrominios
                    // Tetrominio Z Rotacion 1 y 3
                    let bloque1_prohibido_para_tetrominio_Z_R1_R3 = boardArray[(posicionActual_en_tablero+2)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_Z_R1_R3 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[3][0]) || (arrayARotar === tetrominiosArray[3][2])){
                        
                        if(bloque1_prohibido_para_tetrominio_Z_R1_R3){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_Z_R1_R3){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio Z Rotacion 2 y 4
                    let bloque1_prohibido_para_tetrominio_Z_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_Z_R2_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2+2)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[3][1]) || (arrayARotar === tetrominiosArray[3][3])){
                        
                        if(bloque1_prohibido_para_tetrominio_Z_R2_R4){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_Z_R2_R4){
                            pasaYRota = false;
                        }

                    }



        // TETROMINIO J ROTACIONES PROHIBIDAS
        
                // Tetrominio J Rotaciones 2 y 4 al borde
                    if (  (arrayARotar === tetrominiosArray[4][1])  ) {
                        if ( bordeDer ) {
                            pasaYRota = false;
                        }
                    }

                    if (  (arrayARotar === tetrominiosArray[4][3])  ) {
                        if ( bordeIz ) {
                            pasaYRota = false;
                        }
                    }
                // Tetrominio J Rotaciones cerca de otros tetrominios
                    // Tetrominio J Rotacion 1
                    let bloque1_prohibido_para_tetrominio_J_R1 = boardArray[(posicionActual_en_tablero+1)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_J_R1 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2)].classList.contains('bloque_bloqueado');
                    let bloque3_prohibido_para_tetrominio_J_R1 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2+1)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[4][0])  ){
                        
                        if(bloque1_prohibido_para_tetrominio_J_R1){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_J_R1){
                            pasaYRota = false;
                        }

                        if(bloque3_prohibido_para_tetrominio_J_R1){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio J Rotacion 2
                    let bloque1_prohibido_para_tetrominio_J_R2 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_J_R2 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2+2)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[4][1]) ){
                        
                        if(bloque1_prohibido_para_tetrominio_J_R2){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_J_R2){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio J Rotacion 3
                    let bloque1_prohibido_para_tetrominio_J_R3 = boardArray[(posicionActual_en_tablero+1)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_J_R3 = boardArray[(posicionActual_en_tablero+2)].classList.contains('bloque_bloqueado');
                    let bloque3_prohibido_para_tetrominio_J_R3 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+1)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[4][2]) ){
                        
                        if(bloque1_prohibido_para_tetrominio_J_R3){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_J_R3){
                            pasaYRota = false;
                        }

                        if(bloque3_prohibido_para_tetrominio_J_R3){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio J Rotacion 4
                    let bloque1_prohibido_para_tetrominio_J_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH)].classList.contains('bloque_bloqueado');
                    let bloque2_prohibido_para_tetrominio_J_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');
                    let bloque3_prohibido_para_tetrominio_J_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2+2)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[4][3]) ){
                        
                        if(bloque1_prohibido_para_tetrominio_J_R4){
                            pasaYRota = false;
                        }

                        if(bloque2_prohibido_para_tetrominio_J_R4){
                            pasaYRota = false;
                        }

                        if(bloque3_prohibido_para_tetrominio_J_R4){
                            pasaYRota = false;
                        }

                    }

        // TETROMINIO O ROTACIONES PROHIBIDAS
        
                



        // TETROMINIO T ROTACIONES PROHIBIDAS 
        
                // Tetrominio T Rotaciones al borde
                    if (  (arrayARotar === tetrominiosArray[6][1])  ) {
                        if ( bordeDer ) {
                            pasaYRota = false;
                        }
                    }

                    if (  (arrayARotar === tetrominiosArray[6][3])  ) {
                        if ( bordeIz ) {
                            pasaYRota = false;
                        }
                    }
                // Tetrominio T Rotaciones cerca de otros tetrominios   
                    // Tetrominio T Rotacion 1
                    let bloque1_prohibido_para_tetrominio_T_R1 = boardArray[(posicionActual_en_tablero+1)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[6][0])  ){
                        
                        if(bloque1_prohibido_para_tetrominio_T_R1){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio T Rotacion 2
                    let bloque1_prohibido_para_tetrominio_T_R2 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH+2)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[6][1]) ){
                        
                        if(bloque1_prohibido_para_tetrominio_T_R2){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio T Rotacion 3
                    let bloque1_prohibido_para_tetrominio_T_R3 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2+1)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[6][2]) ){
                        
                        if(bloque1_prohibido_para_tetrominio_T_R3){
                            pasaYRota = false;
                        }

                    }

                    // Tetrominio T Rotacion 4
                    let bloque1_prohibido_para_tetrominio_T_R4 = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH)].classList.contains('bloque_bloqueado');

                    if ( (arrayARotar === tetrominiosArray[6][3]) ){
                        
                        if(bloque1_prohibido_para_tetrominio_T_R4){
                            pasaYRota = false;
                        }

                    }    


        if (pasaYRota){

                    undraw();
                    
                    rotacionActualTetrominio++;// aqui eligo la siguiente forma del array de tetrominios

                    if(rotacionActualTetrominio === 4){ //si la rotacion llega a 4, vuelve a 0
                        rotacionActualTetrominio = 0;
                    }

                    forma_del_tetrominio_elegido = tetrominiosArray[random][rotacionActualTetrominio];
                    
                    draw();

            }
    }
    
    
    // FUNCION PARA MOVERSE (DERECHA)
    function moveRight(){
        undraw();

        // la funcion some devolvera true si alguno de los elementos cumple la condicion, false si ninguno de los elementos cumple la condicion
        // bloque_del_tetrominio es un bloque pintado que forma un tetrominio
        // bordeDerecho sera true si estoy pegado al lado izquierdo del tablero
        const bordeDerecho = forma_del_tetrominio_elegido.some( b => ( (posicionActual_en_tablero + b) % BOARD_WIDTH ) === ( BOARD_WIDTH - 1 ) );
        
        
        // si es verdad que estoy en el borde izquierdo entonces:
        if (!bordeDerecho) {
            posicionActual_en_tablero += 1; // si no estoy al borde me muevo a la derecha por eso le sumo uno
        }            


        // si al moverme a la derecha me topo con una bloque bloqueado entonces al moverme a la derecha me volvere a la posicion 
        // anterior, por eso le resto 1
        if (  forma_del_tetrominio_elegido.some( b => boardArray[posicionActual_en_tablero + b].classList.contains('bloque_bloqueado') )  ) {
            posicionActual_en_tablero -= 1;
        }
        draw();
    }
    
    
    // FUNCION PARA MOVERSE (ABAJO)
    draw();
    function moveDown(){
        
        mostrarSiguienteTetrominioEnMiniboard(); //funcion que mostrara el siguiente tetrominio en el mini board
        undraw();
        
        posicionActual_en_tablero +=BOARD_WIDTH;
        if( forma_del_tetrominio_elegido.some( b => boardArray[posicionActual_en_tablero + b].classList.contains('bloque_bloqueado') ) ){
            posicionActual_en_tablero -= BOARD_WIDTH;
        }
        draw();
        generateTetrominioBloqueado();
        
        
    }



// MOSTRAR EL SIGUIENTE TETROMINIO EN EL PANEL PEQUEÑO
    // seleccionar los cuadrados del miniBoard
        let arrayMiniBoard = Array.from(document.querySelectorAll('.bloque__contenedor_mini'));
        // console.log(arrayMiniBoard);
        // console.log(boardArray);
        

    // posicion actual del miniBoard
        let posicionActual_en_Miniboard = 0;
     
    // tamaño del miniBoard
        const miniBoardWidth = 4;    
        
    // tetrominios sin rotacion
    const tetrominioMiniBoard = [

        [   miniBoardWidth     ,  miniBoardWidth + 1 ,   miniBoardWidth + 2     ,  miniBoardWidth + 3       ], // tetrominio_I

        [   miniBoardWidth     ,  miniBoardWidth + 1 ,   miniBoardWidth + 2     ,  miniBoardWidth * 2       ], // tetrominio_L

        [   miniBoardWidth + 1 ,  miniBoardWidth + 2 ,   miniBoardWidth * 2     ,  miniBoardWidth * 2 + 1   ], // tretominio_S

        [   miniBoardWidth     ,  miniBoardWidth + 1 ,   miniBoardWidth * 2 + 1 ,  miniBoardWidth * 2 + 2   ], // tetrominio_Z

        [   miniBoardWidth     ,  miniBoardWidth + 1 ,   miniBoardWidth + 2     ,  miniBoardWidth * 2 + 2   ], // tetrominio_J

        [   miniBoardWidth+1   ,  miniBoardWidth+2   ,   miniBoardWidth*2+1     ,  miniBoardWidth*2 + 2     ], // tetrominio_O

        [   miniBoardWidth     ,  miniBoardWidth + 1 ,   miniBoardWidth + 2     ,  miniBoardWidth * 2 + 1   ] // tetrominio_T

    ];

    // funcion para mostrar el tetrominio siguiente en el miniBoard
    function mostrarSiguienteTetrominioEnMiniboard(){
        
        // eliminar el tetrominio anterior del miniBoard
        arrayMiniBoard.forEach( e => e.classList.remove('tetrominioBlock'));


        // mostrar el siguiente tetrominio que caerá en el miniBoard
        tetrominioMiniBoard[nextRandom].forEach( e =>  {
            arrayMiniBoard[posicionActual_en_Miniboard + e].classList.add('tetrominioBlock'); 
        })

    }



// SCORE DEL JUEGO
    // variables del score
    let scoreDisplay = document.querySelector('.score_puntuacion-number');
    let score = 0;

    function addScore() {
        for (let i = 0; i < 199; i += BOARD_WIDTH) {


            

            const columna = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];


    


            

                        if (columna.every(index => boardArray[index].classList.contains('bloque_bloqueado'))) {
                            score += 50;
                            scoreDisplay.innerHTML = score;
                






                            columna.forEach(index => {
                                        boardArray[index  ].classList.remove('bloque_bloqueado');
                                        boardArray[index ].classList.remove('tetrominioBlock');

                            });


                           


                            // if ( ( (i+BOARD_WIDTH) < 199 )  && (  columna.every(index => boardArray[index+BOARD_WIDTH].classList.contains('bloque_bloqueado'))  )  ) {

                            //         columna.forEach(index => {
                            //                         boardArray[index + BOARD_WIDTH ].classList.remove('bloque_bloqueado');
                            //                         boardArray[index + BOARD_WIDTH].classList.remove('tetrominioBlock');
            
                            //            });
                            // }


                            // if ( ( (i+(BOARD_WIDTH*2)) < 199 )  && (  columna.every(index => boardArray[index+(BOARD_WIDTH*2)].classList.contains('bloque_bloqueado'))  )  ) {

                            //     columna.forEach(index => {
                            //                     boardArray[index + (BOARD_WIDTH*2) ].classList.remove('bloque_bloqueado');
                            //                     boardArray[index + (BOARD_WIDTH*2)].classList.remove('tetrominioBlock');
        
                            //             });
                            // }


                            // if ( ( (i+(BOARD_WIDTH*3)) < 199 )  && (  columna.every(index => boardArray[index+(BOARD_WIDTH*3)].classList.contains('bloque_bloqueado'))  )  ) {

                            //     columna.forEach(index => {
                            //                     boardArray[index + (BOARD_WIDTH*3) ].classList.remove('bloque_bloqueado');
                            //                     boardArray[index + (BOARD_WIDTH*3)].classList.remove('tetrominioBlock');
        
                            //             });
                            // }





                            undraw();
                

                            const cuadradosRemovidos = boardArray.splice(i, BOARD_WIDTH);

                            boardArray = cuadradosRemovidos.concat(boardArray);
                
                            boardArray.forEach(index => classBigBoard.appendChild(index));

                
                            const audioLine = new Audio("./music/samples_line.mp3");
                            audioLine.play();
                            audioLineLine.volume = 0.2;
                        }
                       

                     
            

        }
    
    }


    // funcion para cuando se pierde la partida
function isGameOver() {
     if (  (posicionActual_en_tablero >= 10) && (posicionActual_en_tablero <= 19) && (posicionActual_en_tablero > BOARD_WIDTH) || (posicionActual_en_tablero < BOARD_WIDTH) ) {
        
        clearInterval(time);

        body.classList.add('opaco');
        

        const gameover = document.createElement('div');
        const textGameover = document.createElement('p')
        const textSuck = document.createElement('p')
        const botonRepetir = document.createElement('button');
        const scoreGameOver = document.createElement('p');

        const tryAgain = document.createElement('p');



        textGameover.textContent = "GAME OVER";
        textSuck.textContent = "YOU SUCK!";
        scoreGameOver.textContent = score;

        
        textSuck.className = 'contenedor__gameover--p2';
        textGameover.className = 'contenedor__gameover--p';
        botonRepetir.className = 'boton__repetir';
        tryAgain.className = 'texto_on-off-boton';



        
        botonRepetir.className = 'botonAudio__style';

        tryAgain.textContent = "Try Again";
        document.removeEventListener('keydown', controles);

        botonRepetir.addEventListener('click', () => {

            time = setInterval(moveDown, 1000);

            gameover.className = "gameover__off";
            window.location.reload();

        })

        gameover.className = "contenedor__gameover gameover__on";
        gameover.appendChild(textGameover);
        gameover.appendChild(textSuck);
        gameover.appendChild(scoreGameOver);
        gameover.appendChild(botonRepetir);


        botonRepetir.appendChild(tryAgain);
        
        classVentanaGameOver.appendChild(gameover);
        const audioGameOver = new Audio("./music/samples_gameover.mp3");
        audioGameOver.play(); //  Audio game over.
        audioGameOver.volume = 0.1;
        tetrisMusic.pause();
        

    }
}