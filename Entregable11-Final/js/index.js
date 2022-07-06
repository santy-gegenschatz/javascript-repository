// Constantes globales
let usuarios = [];
let tarjetasDeCredito = [];
let transferencias = [];
let pagosConTarjeta = [];
let idUsuariosCount = 0;
let idTransferenciasCount = 0;
let idPagosConTarjetaCount = 0;

//Verificar si ya hay información en el localStorage para decidir que crear
let arrayCheckeos = ['usuarios', 'tarjetasDeCredito', 'pagosConTarjeta', 'transferencias'];
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

            case('pagosConTarjeta'):
                pagosConTarjeta = JSON.parse(localStorage.getItem(elemento));
            break;

            case('transferencias'):
                transferenciasFormatoTexto = JSON.parse(localStorage.getItem(elemento));
                transferenciasFormatoTexto.forEach((transferenciaTexto) => {
                let nuevaFechaHora = new Date(transferenciaTexto.fechaHora);
                let transferencia = new Transferencia(transferenciaTexto.id, transferenciaTexto.usuario_origen, transferenciaTexto.monto, transferenciaTexto.usuario_destino, nuevaFechaHora);
                transferencias.push(transferencia);
            });
            break; 
        }
    } catch (error) {
        switch(elemento) {
            case('usuarios'):
                // Agregar dos usuarios para poder hacer testings
                const usuario1 = new Usuario (idUsuariosCount, "Santy", "Gegenschatz", "1", 100);
                const usuario2 = new Usuario (idUsuariosCount, "John", "Doe", "2", 100);
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

            case('pagosConTarjeta'):
                const pagoConTarjeta1 = new PagoConTarjeta(idPagosConTarjetaCount, tarjetasDeCredito[0], 1999, new Date(2022, 06, 01, 09, 11));
                const pagoConTarjeta2 = new PagoConTarjeta(idPagosConTarjetaCount, tarjetasDeCredito[1], 500, new Date(2022, 06, 01, 17, 38));
                const pagoConTarjeta3 = new PagoConTarjeta(idPagosConTarjetaCount, tarjetasDeCredito[2], 9999, new Date(2022, 06, 02, 10, 20));
                pagosConTarjeta.push(pagoConTarjeta1);
                pagosConTarjeta.push(pagoConTarjeta2);
                pagosConTarjeta.push(pagoConTarjeta3);
                pagosConTarjetaJSON = JSON.stringify(pagosConTarjeta);
                localStorage.setItem(elemento, pagosConTarjeta);
            break;

            case('transferencias'):
            const transferencia1 = new Transferencia(idTransferenciasCount, usuarios[0], 100, usuarios[1], new Date(2022, 6, 2, 13, 34));
            const transferencia2 = new Transferencia(idTransferenciasCount, usuarios[1], 100, usuarios[0], new Date(2022, 6, 3, 10, 17));
            console.log(typeof transferencia1.fechaHora);
            transferencias.push(transferencia1);
            transferencias.push(transferencia2);
            transferenciasJSON = JSON.stringify(transferencias);
            localStorage.setItem(elemento, transferenciasJSON);
            break;
        }
    }
});
