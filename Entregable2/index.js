// Vamos a simular 
alert("Hola! Bienvenido al simulador de procesos matemáticos");
factorial(factorial_num);
esPar(esPar_num);

// Definición de una función con un loop for
function factorial() {
    let factorial_num = Number(prompt("Ingrese un número al cual calcularle un factorial"));
    let factorial = 1;
    for (let i = 1; i <= factorial_num; i++) {
        factorial*=i;
    }
    alert("El factorial de " + factorial_num + " es " + factorial);
}

// Definición de una función con un condicional
function esPar() {
    let esPar_num = Number(prompt("Ingrese un número para saber si es par o no"));
    if (esPar_num%2 == 0) {
        alert("Es par");
    } else {
        alert("Es impar");
    }
}