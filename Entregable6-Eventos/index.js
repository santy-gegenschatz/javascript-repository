//Manipulación del Dom
// Agragamos botones con las opciones 
let textosBotones = ['Agregar Usuario', 'Imprimir Usuario', 'Cargar Saldo', 'Transferir entre Usuarios', 'Eliminar Usuario'];
for (let index = 0; index < textosBotones.length; index++) {
    const boton = document.createElement("button");
    let textoBoton = textosBotones[index];
    boton.innerText = textoBoton;
    document.getElementById('menu').append(boton);
    // Agregamos los Event Listeners a los botones
    switch(textoBoton) {
        case('Agregar Usuario'):
            boton.addEventListener("click", function() {
                altaUsuario();
            });
            break;

        case('Imprimir Usuario'):
            boton.addEventListener("click", function() {
                imprimirUsuarios();
            });
            break;

        case('Cargar Saldo'):
            boton.addEventListener("click", function() {
                cargarSaldo();
            });
            break;

        case('Transferir entre Usuarios'):
            boton.addEventListener("click", function() {
                transferencia();
            });
            break;

        case('Eliminar Usuario'):
            boton.addEventListener("click", function() {
                eliminarUsuario();
            });
            break;

        default:
            console.log("Otro caso");
    }
}



// Constantes globales
let usuarios = []
let pagos = []
let vendedores = []
let productos = []
let id_usuarios_count = 0;
let id_pagos_count = 0;

// Clases del sistema a simular
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
            alert("No hay suficiente saldo para realizar la acción");
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
            eliminarUsuario();
            break;
        default:
            console.log("Ninguna de las opciones seleccionas es válida, gil.")
            
    }
}

// Dar de alta
function altaUsuario() {
    // Hacer que aparezcan tres campos de texto
    let bloque = document.getElementById('bloque');
    let campos = ['nombre', 'apellido', 'dni'];
    campos.forEach((campo) => {
        let campoDeTexto = document.createElement('input');
        campoDeTexto.setAttribute('id', campo);
        let label = document.createElement('label');
        label.innerText = campo;
        bloque.append(label);
        bloque.append(campoDeTexto);
    });
    // Hacer que aparezca un botón
    let boton = document.createElement('button');
    boton.innerText = 'Crear usuario';
    boton.classList.add('boton-lindo');
    boton.addEventListener("click", () => {
        enviarFormulario();
    });
    bloque.append(boton);
    // Cuando se presiona el botón buscar los datos de los campos y crear el usuario

    // let usuario = new Usuario(id_usuarios_count + 1, nombre, apellido, dni, 0);
    // usuarios.push(usuario);
}

function enviarFormulario() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let dni = document.getElementById('dni').value;
    console.log(nombre, apellido, dni);
}

// Dar de baja
function eliminarUsuario() {
    let dni = prompt("Ingrese el dni del usuario a eliminar");
    if (usuarioExiste(dni)) {
        let usuario = usuarios.find((user) => user.dni === dni);
        usuarios.pop(usuario);
        alert("Eliminado con éxito.")
    } else {
        alert("El dni ingresado no concuerda con el de ningún usuario en el sistema.")
    }

}

// Imprimir usuarios existentes
function imprimirUsuarios() {
    if (usuarios.length > 0) {
        let alert_string = "Usuario" + "\n";
        for (let i = 0; i < usuarios.length; i++) {
            let user_i = usuarios[i];
            alert_string +=  user_i.nombre;
            alert_string +=  "\n" + user_i.apellido;
            alert_string +=  "\n" + user_i.dni;
            alert_string += "\n" + "----" + "\n";
        }
        alert(alert_string); 
    }  else {
        alert("No hay usuarios existentes aún.");
    }
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
}

// Buscar un usuario
function usuarioExiste(dni) {
    if (typeof(usuarios.find((user) => user.dni === dni)) === 'undefined') {
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
}
// 


// Agregar dos usuarios para poder hacer testings
const usuario1 = new Usuario (1, "Santy", "Gegenschatz", "1", "100");
const usuario2 = new Usuario (2, "John", "Doe", "2", "100");
usuarios.push(usuario1);
usuarios.push(usuario2);

// Arrancar la aplicación
// alert(usuarioExiste(5));
// administrar();

