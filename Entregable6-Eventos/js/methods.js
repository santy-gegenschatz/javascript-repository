// Métodos globales
// Dar de alta
function altaUsuario() {
    vaciarBloque();
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
    vaciarBloque();
    if (usuarios.length > 0) {
        usuarios.forEach( (usuario) => {
            // Crear una tarjeta redonda y blanca, con texto centrado
            let tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-blanca');
            // En cada tarjeta poner los datos del usuario
            mostrarDatosUsuario(usuario, tarjeta);
            // Añadir dos events listeners a la tarjeta
            tarjeta.addEventListener('mousedown', () => {
                vaciarElemento(tarjeta);
                mostrarSaldoUsuario(usuario, tarjeta);
            });

            tarjeta.addEventListener('mouseup', () => {
                vaciarElemento(tarjeta);
                mostrarDatosUsuario(usuario, tarjeta);
            });
            // Añadirla a el bloque como un child
            let bloque = document.getElementById('bloque');
            bloque.appendChild(tarjeta);
        }); 
    }  else {
        alert("No hay usuarios existentes aún.");
    }
}

// Cargar Saldo
function cargarSaldo() {
    vaciarBloque();
    // Cargar un label y un campo donde se pueda ingresar el dni del usuario a enriquecer
    let label = document.createElement('label');
    label.innerText = 'Ingrese el DNI de el usuario a quien desea enriquecer'
    let input = document.createElement('input');

    // Cargar un botón que al oprimirse ejecute la lógica
    let boton = document.createElement('button');
    boton.classList.add('btn');
    boton.classList.add('btn-success');
    boton.classList.add('margin-button');
    boton.innerText = "Continuar";
    boton.addEventListener("click", () => {
        let dni = input.value;
        if (usuarioExiste(dni)) {
            const usuario = usuarios.find((user) => user.dni == dni);
            // Obtener la info del monto a acreditar
            let monto = prompt("Ingrese un monto:")
            usuario.monto+=monto; 
            vaciarBloque();
        } else {
            alert("El dni ingresado no coincide con un usuario en la base de datos");
        }
    });

    // Añadir todos los elementos creados como nodos hijos del bloque
    let bloque = document.getElementById('bloque');
    bloque.appendChild(label);
    bloque.appendChild(input);
    bloque.appendChild(boton);

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
    let nombre = document.getElementById('Nombre').value;
    let apellido = document.getElementById('Apellido').value;
    let dni = document.getElementById('Dni').value;
    let nuevoUsuario = new Usuario(id_usuarios_count,nombre, apellido, dni, 100);
    usuarios.push(nuevoUsuario);
    vaciarBloque();
}

function vaciarBloque() {
    document.getElementById('bloque').innerHTML = "";
}

function incrementarIdCount() {
    id_usuarios_count +=1;
}

function vaciarElemento(element) {
    element.innerHTML = '';
}

function mostrarDatosUsuario(usuario, element) {
    info_usuario = "Usuario" + "\n";
    info_usuario +=  usuario.nombre;
    info_usuario +=  "\n" + usuario.apellido;
    info_usuario +=  "\n" + usuario.dni;
    element.innerText = info_usuario;
}

function mostrarSaldoUsuario(usuario, element) {
    console.log("Intentando");
    element.innerText = "Saldo" + "\n" + usuario.saldo;
}