function rotar(){

    // tetrominio que llega antes de rotar
    let arrayARotar = tetrominiosArray[random][rotacionActualTetrominio]; 
    
    console.log(posicionActual_en_tablero);

    // tetrominios especiales
        // tetrominio I rotacion 2 y 4 
        let tetrominio_I_r2_y_r_3 = tetrominiosArray[0][1];
        let tetrominio_I_r2_y_r_3_x = tetrominiosArray[0][3];

        // tetrominio L rotacion 2
        let tetrominio_L_r2 = tetrominiosArray[1][1];


        // tetrominio L rotacion 4
        let tetrominio_L_r4 = tetrominiosArray[1][3];

        let te = tetrominiosArray[0][1];




    // constante que me indica si un tetrominio esta pegado a la izquierda
    const bordeIz = forma_del_tetrominio_elegido.some( bloque_del_tetrominio => ( (posicionActual_en_tablero + bloque_del_tetrominio) % BOARD_WIDTH ) === 0);



    // constante que me indica si un tetrominio esta pegado a la derecha
    const bordeDer = forma_del_tetrominio_elegido.some( b => ( (posicionActual_en_tablero + b) % BOARD_WIDTH ) === ( BOARD_WIDTH - 1 ) );


    // constante que me indica si el tetrominio I rotacion 2 o 4 esta a 1 columan de distancia del borde derecho
    const bordeDer2_tetrominio_I = forma_del_tetrominio_elegido.some( b => ( ( (posicionActual_en_tablero+1) + b) % (BOARD_WIDTH) ) === ( BOARD_WIDTH - 1 ) );

    let pasaYRota = true;
    //pasaYRota estara originalmente a true, 
    //  si es true significa que:
    //      -no es ninguno de los tetrominios prohibidos y ademas
    //      -no esta pegado ni a borde derecho ni al borde izquierdo
    //  y puede pasar
    //
    //  si es false significa que el tetrominio esta al borde y ademas es uno de 
    //  los tetrominio que no puede rotar al estar al borde izquierdo o derecho
    


    // TETROMINIO I ROTACIONES QUE NO PUEDEN ROTAR AL BORDE
            // tetrominio I rotacion 2 y 3 y pegado a la izquierda, no puede rotar


            if ( (arrayARotar == tetrominio_I_r2_y_r_3) || (arrayARotar === tetrominio_I_r2_y_r_3_x) ){

           


            if ( (bordeIz)  ){
                pasaYRota = false;
            }

            // tetrominio I rotacion 2 y 3 y pegado a la derecha, no puede rotas    
            if ( (bordeDer) ){
                pasaYRota = false;
            }

            // tetrominio I rotacion 2 y 3 y a una columna de distancia del borde derecho, no puede rotar
            if ( (bordeDer2_tetrominio_I)  ){
                pasaYRota = false;
            }

        }


    let bloque1_prohibido_para_tetro_I = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*2)+1].classList.contains('bloque_bloqueado');
    let bloque2_prohibido_para_tetro_I = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*3)+1].classList.contains('bloque_bloqueado');
    let bloque3_prohibido_para_tetro_I = boardArray[(posicionActual_en_tablero)+(BOARD_WIDTH*4)+1].classList.contains('bloque_bloqueado');
            
            if ( (arrayARotar === tetrominiosArray[0][0]) || (arrayARotar === tetrominiosArray[0][2])){
             
            
                if(bloque1_prohibido_para_tetro_I){
                    pasaYRota = false;
                }

                if(bloque2_prohibido_para_tetro_I){
                    pasaYRota = false;
                }

                

                if(bloque1_prohibido_para_tetro_I && bloque2_prohibido_para_tetro_I){
                    pasaYRota = false;
                }
             
            }
            




    // TETROMINIO L ROTACIONES QUE NO PUEDEN ROTAR AL BORDE
            
            // tetrominio L rotacion 2 y pegado a la derecha, no puede rotar
            if ( (bordeDer) && (arrayARotar === tetrominio_L_r2) ){
                pasaYRota = false;
            }
            
            // tetrominio L rotacion 3 y pegado a la derecha, no puede rotar
            if ( (bordeDer) && (arrayARotar === tetrominio_L_r4) ){
                pasaYRota = false;
            }
            



    console.log(pasaYRota);
    
    if (pasaYRota){
                    undraw();
                    
                    rotacionActualTetrominio++;// aqui eligo la siguiente forma del array de tetrominios

                    // console.log(rotacionActualTetrominio);
                    if(rotacionActualTetrominio === 4){ //si la rotacion llega a 4, vuelve a 0
                        rotacionActualTetrominio = 0;
                    }

                    forma_del_tetrominio_elegido = tetrominiosArray[random][rotacionActualTetrominio];
                    
                    draw();
                }
}
