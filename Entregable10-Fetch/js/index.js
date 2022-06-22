// Constantes globales
let usuarios = []
let transferencias = []
let vendedores = []
let pagos = []
let productos = []
let tarjetasDeCredito = [];
let id_usuarios_count = 0;
let id_pagos_count = 0;

//Verificar si ya hay información en el localStorage para decidir que crear
let arrayCheckeos = ['usuarios', 'tarjetasDeCredito', 'transferencias'];
arrayCheckeos.forEach ((elemento) => {
    try {
        let length = JSON.parse(localStorage.getItem(elemento).length);
        switch(elemento) {
            case('usuarios'):
            usuariosFake = JSON.parse(localStorage.getItem(elemento));
            usuariosFake.forEach((user) => {
                let usuario = new Usuario//(// Completar);
                usuario.push(usuario);
            });
            break;
            case('tarjetasDeCredito'):
            tarjetasDeCredito = JSON.parse(localStorage.getItem(elemento));
            break;
        }
    } catch {
        switch(elemento) {
            case('usuarios'):
                // Agregar dos usuarios para poder hacer testings
                const usuario1 = new Usuario (id_usuarios_count, "Santy", "Gegenschatz", "1", 100);
                const usuario2 = new Usuario (id_usuarios_count, "John", "Doe", "2", 100);
                usuarios.push(usuario1);
                usuarios.push(usuario2);

                // Agregar el array de usuarios al localStorage
                usuariosJSON = JSON.stringify(usuarios);
                localStorage.setItem(elemento, usuariosJSON);
                break;
            
            case('tarjetasDeCredito'):
                const tarjeta1 = new TarjetaDeCredito("4867843544864", "02", "2028", "684", usuarios[0], "Coderbank");
                const tarjeta2 = new TarjetaDeCredito("6984384684654", "04", "2025", "114", usuarios[0], "Coderbank");
                const tarjeta3 = new TarjetaDeCredito("3612846964687", "11", "2023", "342", usuarios[1], "Coderbank");
                tarjetasDeCredito.push(tarjeta1);
                tarjetasDeCredito.push(tarjeta2);
                tarjetasDeCredito.push(tarjeta3);
                tarjetasJSON = JSON.stringify(tarjetasDeCredito);
                localStorage.setItem(elemento, tarjetasJSON);
            break;

            case('transferencias'):
            
            break;
        }
    }
});

let usuario1 = usuarios[0];
let usuario2 = usuarios[1];
usuario1.transferir(usuario2, 10);
usuario1.validarSaldo(100);

let usuarioNuevo = new Usuario("10", "askdjf", "")

