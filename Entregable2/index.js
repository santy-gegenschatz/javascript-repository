// Vamos a simular 
alert("Hola! Bienvenido al simulador de procesos matemáticos");
let factorial_num = Number(prompt("Ingrese un número al cual calcularle un factorial"));
factorial(factorial_num);
let esPar_num = Number(prompt("Ingrese un número para saber si es par o no"));
esPar(esPar_num);

function factorial(param1) {
    let factorial = 1;
    for (let i = 1; i <= param1; i++) {
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