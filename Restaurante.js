import { carta }  from './carta.json';

export class Restaurante {
    #numMesas;
    #precioMenu;


    constructor(numMesas, precioMenu, carta){
        this.numMesas = numMesas;
        this.precioMenu = precioMenu;
        this.carta = carta;
    }



    
}