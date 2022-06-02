// Métodos globales
// Dar de alta
function altaUsuario() {
    // Hacer que aparezcan tres campos de texto
    let bloque = document.getElementById('bloque');
    let campos = ['Nombre', 'Apellido', 'Dni'];
    campos.forEach((campo) => {
        let campoDeTexto = document.createElement('input');
        campoDeTexto.setAttribute('id', campo);
        let label = document.createElement('label');
        label.innerText = campo;
        bloque.appendChild(label);
        bloque.appendChild(campoDeTexto);
    });
    // Hacer que aparezca un botón
    let boton = document.createElement('button');
    boton.innerText = 'Crear usuario';
    boton.classList.add('boton-lindo');
    boton.addEventListener("click", () => {
        enviarFormulario();
    });
    bloque.append(boton);
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

// Funciones secundarias
function enviarFormulario() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let dni = document.getElementById('dni').value;
    console.log(nombre, apellido, dni);
}