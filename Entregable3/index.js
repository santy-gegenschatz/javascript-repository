let usuarios = []
let pagos = []
let vendedores = []
let productos = []
let id_usuarios_count = 0;
let id_pagos_count = 0;

class Usuario {
    constructor(unique_id, nombre, apellido, dni, saldo) {
        this.unique_id = unique_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.saldo = saldo;
    }

    transferir(usuario, monto) {
        if (validarSaldo()) {
            this.saldo -= monto;
            usuario.saldo += monto;
            const pago = new Pago(id_pagos_count + 1, monto);
            pagos.push(pago);
        } else {
            alert("Eres pobre y no puedas realizar esta acción");
        }
    }

    validarSaldo(monto) {
        return this.saldo >= monto;
    }
}

class Pago {
    constructor(unique_id, monto) {
        this.unique_id = unique_id;
        this.monto = monto;
    }
}

class Vendedor {
    constructor(unique_id, nombre, apellido, saldo) {
        this.unique_id = unique_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.saldo = saldo;
    }
}

class Producto {
    constructor(unique_id, nombre, precio, stock) {
        this.unique_id = unique_id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

// Métodos
// Administrar que hacer
function administrar() {
    let orden = prompt(`Seleccione una opción:
                        1. Crear Usuario
                        2. Ver Usuarios existentes
                        3. Cargar Saldo
                        4. Transferir entre Usuarios
                        5. Eliminar Usuario`);
    switch (orden) {
        case ("1") :
            console.log("Eligió el caso 1");
            altaUsuario();
            break;
        case ("2") :
            console.log("Eligió el caso 2");
            imprimirUsuarios();
            break;
        case ("3") :
            console.log("Eligió el caso 3");
            cargarSaldo();
            break;
        case ("4") :
            console.log("Eligió el caso 4");
            transferencia();
            break;
        case ("5") :
            console.log("Eligió el caso 5");
            transferencia();
            break;
        default:
            console.log("Ninguna de las opciones seleccionas es válida, gil.")
            
    }
}
// Dar de alta
function altaUsuario() {
    let nombre = prompt("Ingrese el nombre");
    let apellido = prompt("Ingrese el apellido");
    let dni = prompt("Ingrese el dni");

    let usuario = new Usuario(id_usuarios_count + 1, nombre, apellido, dni, 0);
    usuarios.push(usuario);
    console.log(usuario);
    administrar();
}

// Dar de baja
function eliminarUsuario() {

}

// Imprimir usuarios existentes
function imprimirUsuarios() {
    if (usuarios.length > 0) {
        for (let i = 0; i < usuarios.length; i++) {
            let user_i = usuarios[i];
            alert_string = "Usuario" + "\n" + user_i.nombre;
            alert_string +=  "\n" + user_i.apellido;
            alert_string +=  "\n" + user_i.dni;
            alert_string += "\n" + "----"
        }
        alert(alert_string); 
    }  else {
        alert("No hay usuarios existentes aún.");
    }
    administrar();
}

// Cargar Saldo
function cargarSaldo() {
    let dni = prompt("Ingrese el dni del usuario a enriquecer")
    if (usuarioExiste(dni)) {
        const usuario = usuarios.find((user) => user.dni = dni);
        // Obtener la info del monto a acreditar
        let monto = prompt("Ingrese un monto:")
        usuario.monto+=monto; 
    } else {
        alert("El dni ingresado no coincide con un usuario en la base de datos");
    }
    // Volver al menú
    administrar();
}

// Buscar un usuario
function usuarioExiste(dni) {
    if (typeof(usuarios.find((user) => user.dni = dni)) === 'undefined') {
        return false
    } else {
        return true
    }
}

// Hacer un pago
function transferencia() {
    let dni_origen = prompt("Ingrese el dni de quien transfiere");
    if (usuarioExiste(dni_origen)) {
        let dni_destino = prompt("Ingrese el dni de quien recibe");
        if (usuarioExiste(dni_destino)) {
            usuario_origen = usuarios.find((u) => u.dni == dni_origen);
            usuario_destino = usuarios.find((u) => u.dni == dni_destino);
            let monto = prompt("Ingrese un monto a transferir");
            usuario_origen.transferencia(usuario_destino, monto);
        } else {
            alert("Ingrese un Dni válido")
        }
    } else {
        alert("Ingrese un Dni válido")
    }
    administrar();
}
// 

// Arrancar la aplicación
administrar();