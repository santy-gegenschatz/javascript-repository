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
    let pantalla = cargaDeDatosSimple()
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
    console.log("a");
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
            console.log(monto);   
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
        console.log("Pasé por aquí");
        return potencialUsuario
        
    }
}

// Hacer un pago
function transferencia() {
    // // Cargar los campos para ingresar el primer dni
    // // Necesito una función abstracta que carge siempre los mismos elemenots y reciba por parámetro lo que va en el label y lo que va en
    // // en el event listener del botón. aH, y el texto de
    // let datos = []
    // cargaDeDatosSimple("Ingrese el Dni de quien transfiere",
    //                    "Continuar",
    //                    usuarioExiste, 
    //                    cargaDeDatosSimple,
    //                    datos);
    // Validar que existe
    // Cargar los campos para ingresar el segundo dni
    // Validar que existe
    // Transferir
    // Hay por lo menos cinco casos de falla en el proceso. Cómo los puedo estandarizar?
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
                            console.log(monto);
                            if (validarMonto(monto)) {
                                let usuarioEmisor = encontrarUsuario(dniEmisor);
                                let usuarioReceptor = encontrarUsuario(dniReceptor);
                                usuarioEmisor.transferir(usuarioReceptor, monto);
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

function tomarDatosDni(dni) {
    if (usuarioExiste(dni)) {
        return true
    } else {
        alert("El dni ingresado no coincide con un usuario en la base de datos");
        vaciarBloque();
        cargarSaldo();
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
    monto > 0 ? console.log("Mayor") : console.log("Menor");
    if (monto > 0 ) {
        return true
    } else {
        return false
    }
    
}