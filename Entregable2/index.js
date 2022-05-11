// Vamos a simular 
alert("Hola! Bienvenido al simulador de procesos matemáticos");
let factorial = Number(prompt("Ingrese un número al cual calcularle un factorial"));
let esPar = Number(prompt("Ingrese un número para saber si es par o no"));
function factorial(param1) {
    factorial = 1;
    for (let i = 0; i < 10; i++) {
        factorial*=i;
    }
    alert("El factorial de " + param1 +" es " + factorial);
}

function esPar(param1) {
    if (param1%2 == 0) {
        alert("Es par");
    } else {
        alert("Es impar");
    }
}