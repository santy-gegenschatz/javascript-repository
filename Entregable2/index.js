// El primer ejercicio es un programa que corra un bucle.
// Vamos a utilizar un bucle for
let numero_ingresado = Number(prompt("Por favor ingrese un número"));
let operacion = prompt(`¿Qué operación quiere realizar?:
                        FACTORIAL
                        SUMA ITERADA`);
operacion = operacion.toUpperCase();
let respuesta;
let mensaje_de_error = "Oops, esa no es una opción válida";
if (operacion == "FACTORIAL") { // Realizamos el factorial
    let factorial = 1;
    for (let i = 1; i <= numero_ingresado; i++) {
        factorial = i * factorial;
        console.log("Calculando: ", factorial);
    }
    respuesta = factorial;
} else if (operacion == "SUMA ITERADA") { // Realizamos la suma iterada
    let suma_iterada = 0;
    for (let i = 0; i <= numero_ingresado; i++) {
        suma_iterada = suma_iterada + i;
        console.log("Calculando: ", suma_iterada);
    }
    respuesta = suma_iterada
} else {
    respuesta = mensaje_de_error;
}
console.log(respuesta);

let condicion = false;
while (condicion == false) {
       console.log("El programa está corriendo");
       let palabra_ingresada = prompt("Ingrese la palabra frenar para detener el programa");
       palabra_ingresada = palabra_ingresada.toUpperCase();
       if (palabra_ingresada === "FRENAR") {
           condicion = true;
       }
}
