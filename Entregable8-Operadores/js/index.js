// Constantes globales
let usuarios = []
let transferencias = []
let vendedores = []
let productos = []
let tarjetasDeCredito = [];
let id_usuarios_count = 0;
let id_pagos_count = 0;

//Verificar si ya hay información en el localStorage para decidir que crear
let arrayCheckeos = ['usuarios', 'tarjetasDeCredito', 'transferencias'];

arrayCheckeos.forEach ((elemento) => {
    if (JSON.parse(localStorage.getItem(elemento).length === 0)) {
        switch(elemento) {
            
        }   
    } else {

    }
});
if (JSON.parse(localStorage.getItem('usuarios').length === 0)) {
    // Agregar dos usuarios para poder hacer testings
    const usuario1 = new Usuario (id_usuarios_count, "Santy", "Gegenschatz", "1", 100);
    const usuario2 = new Usuario (id_usuarios_count, "John", "Doe", "2", 100);
    usuarios.push(usuario1);
    usuarios.push(usuario2);

    // Agregar el array de usuarios al localStorage
    usuariosJSON = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', usuariosJSON);
} else {
    // Cargar los datos desde el localStorage al array de usuarios
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    console.log(usuarios);
}

let usuario1 = usuarios[0];
let usuario2 = usuarios[1];
usuario1.transferir(usuario2, 10);

