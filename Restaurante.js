const fs = require('fs/promises');
const Mesa = require('./Mesa.js');

export class Restaurante {
    #numMesas;
    #precioMenu;


    constructor(numMesas, precioMenu, archivoCarta){
        this.mesas = Array.from({length:numMesas}, () => new Mesa());
        this.precioMenu = precioMenu;
        this.carta = [];
        this.archivoCarta = archivoCarta;
    }

    async cargarCarta(){
        try{
            const datos = await fs.readFile(this.archivoCarta);
            this.carta = JSON.parse(datos);
        }catch(duende){
            console.error('Error al cargar la carta: ', duende);
        }
    }

    /*mostrarMesas(Mesa){
        
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
    }*/



    
}
module.exports = Restaurante;