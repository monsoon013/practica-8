import rl from 'node:readline/promises';
import  {stdin as input, stdout as output} from 'node:process';
import { parse } from 'node:path';

export class MainManager {
    constructor(restaurante) {
        this.restaurante = restaurante;
        this.rl = rl.createInterface({input, output});
    }

    
    mostrarMesas(){
        console.log("### ESTADO DE LAS MESAS ###");
        const info = this.restaurante.verEstadoMesas();

        info.forEach(m => {
           // console.log(`DEBUG: Mesa ${m.numero} tiene libre = ${m.libre} (tipo: ${typeof m.libre})`);
            const estado = m.libre ? "LIbre" : "Ocupada";
            console.log(`Mesa ${m.numero} está  ${estado}.`);
            
        });
        console.log("### FIN DE LA LISTA ###");
    };

    async buscarVacia(){
        const found = this.restaurante.mesas.find(m => m.libre === true);
        if(found){
            found.libre = false;
            const numMesa = this.restaurante.mesas.indexOf(found) + 1;
            console.log(`\nMesa ${numMesa} asignada. ¡Bienvenidx!`);

            await this.menuMesa(found);
        }else {
            console.log("Están todas las mesas ocupadas. Lo sentimos :(")
        }
    };

    async seleccionarMesa(){
        const ocup = this.restaurante.mesas.map((m, i) => ({numero: i+1, libre: m.libre}));
        ocup.filter(m => !m.libre);

        if (ocup.length === 0){
            console.log("\nNo hay mesas ocupadas");
            return;
        }

        console.log("\nMesas ocupadas:");
        ocup.forEach(m => console.log(`- MESA ${m.numero}`));

        const select = await this.rl.question("¿Qué mesa quieres seleccionar? \n");
        const num = parseInt(select);

        const mesaElegida = this.restaurante.mesas[num - 1];

        if(mesaElegida && !mesaElegida.libre){
            await this.menuMesa(mesaElegida);
        }else {
            console.log("Número de mesa no válido o la mesa está libre.");
        }
    };
    
    async iniciar(){
        let salir = false;
        while(!salir){
            console.log("\n### MENÚ PRINCIPAL ###");
            console.log("1. Mostrar mesas" +
                        "\n2. Buscar mesa vacía" +
                        "\n3. Seleccionar mesa" +
                        "\n4. Salir" );
            try{
                     const op = (await this.rl.question("¿Qué deseas hacer? \n")).trim(); //trim: eliminar espacios al principio y al final
                     switch(op){
                            case '1': {
                                this.mostrarMesas();
                                break;
                            }
                            case '2': {
                                await this.buscarVacia();
                                break;
                            }
                            case '3': {
                                await this.seleccionarMesa();
                                break;
                            }
                            case  '4': {
                                salir = true;
                                console.log("¡Hasta luego!");
                                break;  
                            }
                            default: {
                                console.log("Opción no válida. Por favor, elige una opción del menú.");
                            }
                    }
                }catch (duende){
                    console.log("Error: " + duende.message);
                }
            }
        this.rl.close();
    }

    async menuMesa(mesa){
        let salirMesa = false;
        const numeroMesa = this.restaurante.mesas.indexOf(mesa) + 1;

        while(!salirMesa){
            console.log("Bievenidx a la mesa " + numeroMesa );
                const count = (await this.rl.question("¿Qué quieres hacer? \n")).trim();
                switch(count){
                    case '1': {
                        console.log('### PEDIR CONSUMICIÓN ###');
                        console.table(this.restaurante.carta.map(c=>({
                            id: c.id,
                            nombre: c.nombre,
                            tipo: c.tipo,
                            precio:`${ c.precio}€`
                        })))
                        const pedir = (await this.rl.question("¿Qué deseas? \n")).trim().toLowerCase();
                        const plato = this.restaurante.carta.find(c => 
                            c.nombre.toLowerCase().includes(pedir)
                        );
                        if (plato){
                            mesa.anadirConsumicion(plato);
                            console.log("Consumición añadida a la mesa " + numeroMesa);
                        }else {
                            console.log("No se ha encontrado el plato. Por favor, intenta de nuevo.");
                        }
                        break;
                    } case '2': {
                        console.log('### CONSUMICIONES TOTALES ###');
                        const resultado = mesa.dividirConsumiciones(this.restaurante.precioMenu);

                        console.log("--- FACTURA ---");
                        console.log(`Total Menús: ${resultado.totalMenus.toFixed(2)}€` +
                                    `\nTotal Individuales: ${resultado.totalInd.toFixed(2)}€` +
                                    `\n*** PRECIO TOTAL A PAGAR -  ${resultado.totalFinal.toFixed(2)}€ ***`);
                        
                    } case '3':{
                        salirMesa = true;
                        console.log('Hasta pronto...');
                        break;
                    } default : console.log("ERROR: No existe esa opción.");
                }
        }
    };

}
