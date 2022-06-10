// Métodos globales
// Dar de alta
let visibilidadPagoTarjeta = false;
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
        campoDeTexto.classList.add('centered-text');
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
    let pantalla = cargarEntradaDeDatos("Ingrese el dni del usuario a eliminar", "Eliminar");
    pantalla.boton.addEventListener("click", () => {
        let dni = pantalla.input.value;
        if (usuarioExiste(dni)) {
            let usuarioAEliminar = encontrarUsuario(dni);
            let indice = usuarios.indexOf(usuarioAEliminar);
            // Aca quisiera cargar pantalla de confirmación
            let text = "Esta seguro que desea eliminar el usuario " + usuarioAEliminar.nombre + " " + usuarioAEliminar.apellido + " ?";
            let pantalla = cargarPantallaDeConfirmacion(text, eliminarUsuario);
            let boton = pantalla.botonAceptar;
            boton.addEventListener("click", function() {
                console.log("Estuve aquí");
                usuarios.splice(indice, 1);
                guardarUsuariosALocalStorage();
            });
        }
    });
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
    input.classList.add('centered-text');

    // Cargar un botón que al oprimirse ejecute la lógica
    let boton = document.createElement('button');
    boton.classList.add('btn');
    boton.classList.add('btn-success');
    boton.classList.add('margin-button');
    boton.innerText = "Continuar";
    boton.addEventListener("click", () => {
        let dni = input.value;
        let potencialUsuario = usuarioExiste(dni);
        if (potencialUsuario != false) {
            // Porque esto me da undefined. No está siguiendo los pasos que le indico la compu.
            let monto = tomarDatosMonto2();   
            tomarDatosMonto(potencialUsuario);
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
    let potencialUsuario = usuarios.find((user) => user.dni === dni);
    if (typeof(potencialUsuario) === 'undefined') {
        return false
    } else {
        return potencialUsuario
        
    }
}

// Hacer un pago
function transferencia() {
    let pantalla = cargarEntradaDeDatos("Ingrese el dni de quien transfiere","Continuar");
    pantalla.boton.addEventListener("click", () => {
        let dniEmisor = pantalla.input.value;
        if (usuarioExiste(dniEmisor)) {
            let pantalla2 = cargarEntradaDeDatos("Ingrese el dni de quien recibe", "Continuar");
            pantalla2.boton.addEventListener("click", () => {
                let dniReceptor = pantalla2.input.value;
                if (usuarioExiste(dniReceptor)) {
                    if (dniEmisor != dniReceptor) {
                        let pantalla3 = cargarEntradaDeDatos("Ingrese el monto a transferir", "Continuar");
                        pantalla3.boton.addEventListener("click", () => {
                            let monto = Number(pantalla3.input.value);
                            if (validarMonto(monto)) {
                                let usuarioEmisor = encontrarUsuario(dniEmisor);
                                let usuarioReceptor = encontrarUsuario(dniReceptor);
                                console.log(usuarioEmisor);
                                usuarioEmisor.transferir(usuarioReceptor, monto);
                                guardarUsuariosALocalStorage();
                            } else {
                                alertar("El monto tiene que ser mayor que 0", transferencia);
                            }
                        });
                    } else {
                        alertar("No se puede transferir a si mismo", transferencia);
                    }
                } else {
                    alertar("El dni ingresado no concuerda con un usuario existente", transferencia);        
                }
            });
        } else {
            alertar("El dni ingresado no concuerda con un usuario existente", transferencia);
        }
    });
}

// Funciones secundarias
function enviarFormulario() {
    let nombre = document.getElementById('Nombre').value;
    let apellido = document.getElementById('Apellido').value;
    let dni = document.getElementById('Dni').value;
    let nuevoUsuario = new Usuario(id_usuarios_count,nombre, apellido, dni, 100);
    usuarios.push(nuevoUsuario);
    usuariosJSON = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', usuariosJSON);
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

function mostrarDatosUsuario(usuario, tarjeta) {
    info_usuario = "Usuario" + "\n";
    info_usuario +=  usuario.nombre;
    info_usuario +=  "\n" + usuario.apellido;
    info_usuario +=  "\n" + usuario.dni;
    tarjeta.innerText = info_usuario;
    // Crear Botones
    let botonSaldo = document.createElement('button');
    let botonTarjeta = document.createElement('button');
    // Añadir atributos a los botones
    botonSaldo.innerText = "Consultar Saldo";
    botonTarjeta.innerText = "Pagar con Tarjeta";
    botonSaldo.classList.add("btn");
    botonSaldo.classList.add("btn-info");
    botonTarjeta.classList.add("btn");
    botonTarjeta.classList.add("btn-info");
    
    // Crear un div que contenga los botones
    let divBotones = document.createElement('div');
    divBotones.classList.add('flex-row');
    // Añadir los botones al div
    divBotones.appendChild(botonSaldo);
    divBotones.appendChild(botonTarjeta);
    // Añadir los eventListeners a cada botón
    botonSaldo.addEventListener("click", function() {
        mostrarSaldoUsuario(usuario, tarjeta);
    });
    botonTarjeta.addEventListener("click", function() {
        pagoConTarjeta(usuario);
    });
    // Añadir el div a la tarjeta
    tarjeta.appendChild(divBotones);
}

function mostrarSaldoUsuario(usuario, tarjeta) {
    tarjeta.innerText = "Saldo" + "\n" + usuario.saldo;
    // Crear un botón para volver atrás
    let botonVuelta = document.createElement('button');
    botonVuelta.innerText = "Volver";
    botonVuelta.classList.add('btn-info');
    botonVuelta.addEventListener("click", () => {
        imprimirUsuarios();
    });
}

function tomarDatosDni(dni) {
    if (usuarioExiste(dni)) {
        return true
    } else {
        alert("El dni ingresado no coincide con un usuario en la base de datos");
        vaciarBloque();
        
        aldo();
        return false
    }
}

function tomarDatosMonto(usuario) { 
    vaciarBloque();
    // Cargar un label y un campo donde se pueda ingresar el dni del usuario a enriquecer
    let label = document.createElement('label');
    label.innerText = 'Ingrese el monto que desea añadir'
    let input2 = document.createElement('input');
    input2.classList.add('centered-text');

    // Cargar un botón que al oprimirse ejecute la lógica
    let boton = document.createElement('button');
    boton.classList.add('btn');
    boton.classList.add('btn-success');
    boton.classList.add('margin-button');
    boton.innerText = "Cargar";
    boton.addEventListener("click", () => {
        let monto = Number(input2.value);
        if (monto >=0) {
            vaciarBloque();
            usuario.saldo+=monto;
            guardarUsuariosALocalStorage();
        } else {
            alert("Ingrese un monto positivo");
            vaciarBloque();
            tomarDatosMonto(usuario);
        }
    });

    // Añadir todos los elementos creados como nodos hijos del bloque
    let bloque = document.getElementById('bloque');
    bloque.appendChild(label);
    bloque.appendChild(input2);
    bloque.appendChild(boton);
}

function tomarDatosMonto2() { 
    vaciarBloque();
    // Cargar un label y un campo donde se pueda ingresar el dni del usuario a enriquecer
    let label = document.createElement('label');
    label.innerText = 'Ingrese el monto que desea añadir'
    let input2 = document.createElement('input');
    input2.classList.add('centered-text');

    // Cargar un botón que al oprimirse ejecute la lógica
    let boton = document.createElement('button');
    boton.classList.add('btn');
    boton.classList.add('btn-success');
    boton.classList.add('margin-button');
    boton.innerText = "Cargar";
    boton.addEventListener("click", () => {
        let monto = Number(input2.value);
        if (monto >=0) {
            vaciarBloque();
            return monto;
        } else {
            alert("Ingrese un monto positivo");
            vaciarBloque();
        }
    });

    // Añadir todos los elementos creados como nodos hijos del bloque
    let bloque = document.getElementById('bloque');
    bloque.appendChild(label);
    bloque.appendChild(input2);
    bloque.appendChild(boton);
}


function cargarEntradaDeDatos(labelText,buttonText) {
    vaciarBloque();
    // Cargar un label y un campo donde se pueda ingresar info
    let label = document.createElement('label');
    label.innerText = labelText;
    let input = document.createElement('input');
    input.classList.add('centered-text');

    // Cargar un botón que al oprimirse ejecute la lógica
    let boton = document.createElement('button');
    boton.classList.add('btn');
    boton.classList.add('btn-success');
    boton.classList.add('margin-button');
    boton.innerText = buttonText;

    // Añadir todos los elementos creados como nodos hijos del bloque
    let bloque = document.getElementById('bloque');
    bloque.appendChild(label);
    bloque.appendChild(input);
    bloque.appendChild(boton);
    return new Pantalla(label, input, boton);
}

function encontrarUsuario(dni) {
    return usuarios.find((user) => user.dni === dni);
}

function alertar(error, callback) {
    vaciarBloque();
    // Crear 
    let label = document.createElement('label');
    let boton = document.createElement('button');
    let title = document.createElement('h1');
    title.classList.add("white");
    let bloque = document.getElementById('bloque');
    bloque.setAttribute("style", "background-color: red;");
    title.innerText = "Oh, No :("
    label.innerText = error;
    boton.innerText = "Intentar Nuevamente";
    boton.classList.add('btn-warning');
    boton.addEventListener("click", () => {
        bloque.setAttribute("style", "background-color: black;");
        callback();
    });
    bloque.appendChild(title);
    bloque.appendChild(label);
    bloque.appendChild(boton);
}

function validarMonto(monto) {
    if (monto > 0) {
        return true
    } else {
        return false
    }
}

function guardarUsuariosALocalStorage() {
    usuariosJSON = JSON.stringify(usuarios);
    localStorage.setItem('usuarios', usuariosJSON);
}

function cargarPantallaDeConfirmacion(labelText, callback) {
    vaciarBloque();
    let label = document.createElement('label');
    let botonCancelar = document.createElement('button');
    let botonAceptar = document.createElement('button');
    let title = document.createElement('h1');
    title.classList.add("white");
    let bloque = document.getElementById('bloque');
    title.innerText = "Último paso"
    label.innerText = labelText;
    botonCancelar.innerText = "Cancelar";
    botonAceptar.innerText = "Confirmar";
    botonCancelar.addEventListener("click", () => {
        vaciarBloque();
        callback();
    });
    bloque.appendChild(title);
    bloque.appendChild(label);
    bloque.appendChild(botonAceptar);
    bloque.appendChild(botonCancelar);
    return new PantallaDeConfirmacion(title, label, botonCancelar, botonAceptar);
}

function pagoConTarjeta(usuario) {
    // Vaciar el body
    cambiarVisibilidad();
    // Crear un div para la representación de la tarjeta de crédito
    let simuladorTarjeta = document.createElement('div');
    simuladorTarjeta.classList.add('simulador-tarjeta');
    // Creamos un Label con los datos del usuario
    let datosDuenoTarjeta = document.createElement('p');
    let nombreUpper = usuario.nombre.toUpperCase() + " " + usuario.apellido.toUpperCase();
    datosDuenoTarjeta.innerText = nombreUpper;
    // Creamos un Input para ingresar los datos del usuario
    let input = document.createElement('input');
    input.classList.add('cool-input');
    // Crear otro para los botones de avance
    let divBotones = document.createElement('div');
    divBotones.classList.add('flex-row');
    // Crear un boton de Cancelar y uno de avanzar
    let botonCancelar = document.createElement('button');
    let botonContinuar = document.createElement('button');
    botonCancelar.innerText = "Cancelar";
    botonContinuar.innerText = "Continuar";


}

function cambiarVisibilidad() {
    if (visibilidadPagoTarjeta) {
        console.log("Escondiendo");
        document.getElementById('bloque').style.visibility == "hidden";
        document.getElementById('pago-tarjeta').style.visibility == "visible";
        visibilidadPagoTarjeta = false;
    } else {
        document.getElementById('bloque').style.visibility == "visible";
        document.getElementById('pago-tarjeta').style.visibility == "hidden";
        visibilidadPagoTarjeta = true;
    }
}