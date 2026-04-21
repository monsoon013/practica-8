import fs from 'node:fs/promises';
import {Mesa} from './Mesa.js';

export class Restaurante {
    #numMesas;
    #precioMenu;


    constructor(numMesas, precioMenu, archivoCarta){
        this.mesas = Array.from({length:numMesas}, () => new Mesa());
        this.precioMenu = precioMenu;
        this.carta = [];
        this.archivoCarta = archivoCarta
    }

    async cargarCarta(){
        try{
            const datos = await fs.readFile('./carta.json', 'utf-8');
            this.carta = JSON.parse(datos);
        }catch(duende){
            console.error('Error al cargar la carta: ', duende);
        }
    }

    verEstadoMesas(){
        return this.mesas.map((mesa, index) => ({
            numero: index + 1,
            libre: mesa.getLibre(),
            consumiciones: mesa.getConsumiciones()
        }));
        
    }



    
}
