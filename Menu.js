import  {Restaurante} from './Restaurante.js';
import  {MainManager}  from './MainManager.js';

async function main() {
    try {
        const r1 = new Restaurante(5, 20, 'carta.json');
        await r1.cargarCarta(); //garantizar que el programa se detenga en es alíneas hasta que la promesa se resuelva.
        //De esta manera no me llegaría un arrya vacío

        const gestorMenu = new MainManager(r1);
        await gestorMenu.iniciar();

    }catch(duende){
        console.error("Error en la aplicación: ", duende);
    }
    
}

main();