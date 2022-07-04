// Constantes globales
let usuarios = []
let transferencias = []
let vendedores = []
let pagos = []
let productos = []
let tarjetasDeCredito = [];
let id_usuarios_count = 0;
let id_transferencias_count = 0;
let id_pagos_count = 0;

//Verificar si ya hay información en el localStorage para decidir que crear
let arrayCheckeos = ['usuarios', 'tarjetasDeCredito', 'transferencias'];
arrayCheckeos.forEach ((elemento) => {
    try {
        // Con esta linea se desncadena el catch si no está creada la info en el LocalStorage
        let length = JSON.parse(localStorage.getItem(elemento).length);
        switch(elemento) {
            case('usuarios'):
            usuariosFormatoTexto = JSON.parse(localStorage.getItem(elemento));
            usuariosFormatoTexto.forEach((user) => {
                console.log(user);
                let usuario = new Usuario(user.unique_id, user.nombre, user.apellido, user.dni, user.saldo);
                console.log(usuario);
                usuarios.push(usuario);
            });
            break;

            case('tarjetasDeCredito'):
            tarjetasDeCredito = JSON.parse(localStorage.getItem(elemento));
            break;

            case('transferencias'):
            transferencias = JSON.parse(localStorage.getItem(elemento));
            break;
            
        }
    } catch (error) {
        console.log(error);
        switch(elemento) {
            case('usuarios'):
                console.log("Estuve aquí");
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
            const transferencia1 = new Transferencia(id_transferencias_count, usuarios[0], 100, usuarios[1], "01/07/2022 : 10:12");
            const transferencia2 = new Transferencia(id_transferencias_count, usuarios[1], 100, usuarios[0], "01/07/2022 : 11:03");
            transferencias.push(transferencia1);
            transferencias.push(transferencia2);
            transferenciasJSON = JSON.stringify(transferencias);
            localStorage.setItem(elemento, transferenciasJSON);
            console.log(transferenciasJSON);
            break;
        }
    }
});

// for (let letra of "hola") {
//     setTimeout(() => {
//         console.log(letra);
//     }, 1000);
// }

// for (let letra of "mundo") {
//     setTimeout(() => {
//         console.log(letra);
//     }, 2000);
// }

// async function prueba(param1) {
//     console.log(1);
//     const img = fetch('https://avatars.dicebear.com/api/human/' + '45' + '.svg');
//     console.log(img);
//     console.log(2);
//     img.then((response) => {
//         console.log(response);
//     });
//     console.log(3);
//     const img2 = await fetch('https://avatars.dicebear.com/api/human/' + '45' + '.svg');
//     console.log(4);
//     console.log(img2);
//     console.log("Error incoming");
//     img2.then((response) => {
//         console.log(response);
//     });
// }

// prueba(2);

// let arrayCheckeos = ['usuarios', 'tarjetasDeCredito', 'transferencias'];
// arrayCheckeos.forEach ((elemento) => {
//     try {
//         // Con esta linea se desncadena el catch si no está creada la info en el LocalStorage
//         let length = JSON.parse(localStorage.getItem(elemento).length);
//         switch(elemento) {
//             case('usuarios'):
//             usuariosFormatoTexto = JSON.parse(localStorage.getItem(elemento));
//             usuariosFormatoTexto.forEach((user) => {
//                 console.log(user);
//                 let usuario = new Usuario(user.unique_id, user.nombre, user.apellido, user.dni, user.saldo);
//                 console.log(usuario);
//                 usuarios.push(usuario);
//             });
//             break;
//             case('tarjetasDeCredito'):
//             tarjetasDeCredito = JSON.parse(localStorage.getItem(elemento));
//             break;
//         }
//     } catch (error) {
//         console.log(error);
//         switch(elemento) {
//             case('usuarios'):
//         } 
//     } 
// });