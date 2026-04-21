

export class Mesa {
    constructor (){
        this.consumiciones = [];
        this.libre = true;
    }
    getLibre(){ return this.libre;}
    getConsumiciones (){ return this.consumiciones;}

    anadirConsumicion(consumicion){
        this.consumiciones.push(consumicion);
    };

    dividirConsumiciones(precioMenu){
        const totalCons = this.consumiciones.reduce((t, c) => {
            t[c.tipo].push(c);
            return t;
        }, { primero: [], segundo: [], postre: [], bebida: []});

        const menus = [];
        const numMenus = Math.min(
            totalCons.primero.length,
            totalCons.segundo.length,
            totalCons.postre.length,
            totalCons.bebida.length
        );

        for (let i = 0; i < numMenus.length; i++){
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

        return {
            totalMenus,
            totalInd, 
            totalFinal: totalMenus + totalInd
        }

    }
}

