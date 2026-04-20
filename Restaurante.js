import { carta }  from './carta.json';

export class Restaurante {
    #numMesas;
    #precioMenu;


    constructor(numMesas, precioMenu, carta){
        this.numMesas = numMesas;
        this.precioMenu = precioMenu;
        this.carta = carta;
    }

    mostrarMesas(Mesa){
        
    }
    menuPrinc (){
        let count = 0;
        while(count < 4){
            console.log("Bienvenidx!");
            try{
                count = prompt("\n¿Qué quieres hacer?");
                switch(count){
                    case 1: {
                        console.log('### MOSTRAR MESAS ###');

                    }

                }

            }

        }
    }



    
}