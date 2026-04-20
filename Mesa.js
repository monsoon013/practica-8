import { carta } from './carta.json';

export class Mesa {
    #consumiciones;
    #libre;

    constructor (){
        this.consumiciones = [];
        this.libre = true;
    }

    getLibre(){ return this.#libre;}
    getConsumiciones (){ return this.#consumiciones;}

    dividirConsumiciones(precioMenu){
        const totalCons = this.#consumiciones.reduce((t, c) => {
            t[c.tipo].push(c);
            return c;
        }, { primero: [], segundo: [], postre: [], bebida: []});

        const menus = [];
        const numMenus = Math.min(
            totalCons.primero.length,
            totalCons.segundo.length,
            totalCons.postre.length,
            totalCons.bebida.length
        );

        for (let i = 0; i <= numMenus.length; i++){
            menus.push({
                cons:[
                    totalCons.primero.shift(), //shift: saca la posicion 0 y cambia por el siguiente
                    totalCons.segundo.shift(),
                    totalCons.postre.shift(), 
                    totalCons.bebida.shift()
                ],
                precio: precioMenu
            })
        };

        const restantes = Object.values(totalCons).flat(); //Todos los arrays en uno solo
        const totalMenus = menus.length * precioMenu;
        const totalInd = restantes.reduce((sum, c) => sum + c.precio, 0);

        console.log("Total Menús: " + totalMenus +
                    "\nTotal Individuales: " + totalInd + 
                    "\n*** PRECIO TOTAL A PAGAR -  " + totalInd + totalMenus + " ***" 
        );

    }

    menu(mesa, precioMenuDia){
        let count = 0;

        while(count < 3){
            console.log("Bievenidx a la mesa " + mesa );
            try {
                count = prompt("¿Qué quieres hacer? \n");
                switch(count){
                    case 1: {
                        console.log('### PEDIR CONSUMICIÓN ###');
                        carta.map(c => {
                        return "-----------------------------" +
                                "\nConsumición: " + c.nombre +
                                "\nTipo: "  + c.tipo +
                                "\nPrecio: " + c.precio +
                                "\n---------------------------"
                        });
                        let cons = prompt("¿Qué deseas? \n");
                        carta.filter(c => {
                            if ((cons.slice(0, 1).toUpperCase() + cons.slice(1).toLowerCase()) === c.nombre){
                                this.#consumiciones.push(c);
                            }
                        })
                        break;
                    } case 2: {
                        console.log('### CONSUMICIONES TOTALES ###');
                        dividirConsumiciones(precioMenuDia);
                        
                    } case 3 :{
                        console.log('Hasta pronto...');
                        break;
                    } default : console.log("ERROR: No existe esa opción.");
                }
            }catch (duende) {
                console.log("ERROR: " + duende.stack);// revisar

            }

        }
    };


                       
}