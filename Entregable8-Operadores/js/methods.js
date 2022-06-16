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
    
    swal({
        title : "¡Éxito en la transacción!",
        text : "El usuario " + nombre + " " + apellido + " se cargó con éxito al Local Storage",
        button : 'Cool, gracias',
        icon : 'https://media4.giphy.com/media/zaqclXyLz3Uoo/giphy.gif?cid=ecf05e47eaoxfc1g4txpsb8pmkftdptecpfg8081ftog46qd&rid=giphy.gif&ct=g'
    });
}

function vaciarBloque() {
    document.getElementById('bloque').innerHTML = "";
}

function incrementarIdCount() {
    id_usuarios_count 
    1;
}

function vaciarElemento(element) {
    element.innerHTML = '';
}

function mostrarDatosUsuario(usuario, tarjeta) {
    // Poner el texto
    tarjeta.innerText = mostrarDatosBasicosDelUsuario(usuario);
    // Crear Botones
    tarjeta.appendChild(crearDivConBotones(usuario, tarjeta));
}

function mostrarSaldoUsuario(usuario, tarjeta) {
    tarjeta.innerText = "Saldo" + "\n" + usuario.saldo;
    // Crear un botón para ver detalles técnicos
    let botonDetallesTecnicos = document.createElement('button');
    botonDetallesTecnicos.innerText = "Ver detalles técnicos";
    botonDetallesTecnicos.classList.add('btn');
    botonDetallesTecnicos.classList.add('btn-dark');
    botonDetallesTecnicos.setAttribute("style", "margin : 10px;");
    botonDetallesTecnicos.addEventListener("click", () => {
        verDetallesTecnicos(usuario, tarjeta);
    });
    // Crear un botón para volver atrás
    let botonVuelta = document.createElement('button');
    botonVuelta.innerText = "Volver";
    botonVuelta.classList.add('btn');
    botonVuelta.classList.add('btn-info');
    botonVuelta.setAttribute("style", "margin : 10px;");
    botonVuelta.addEventListener("click", () => {
        imprimirUsuarios();
    });
    tarjeta.appendChild(botonDetallesTecnicos);
    tarjeta.appendChild(botonVuelta);
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
            console.log(usuario);
            usuario.saldo += monto;
            console.log(usuario);
            guardarUsuariosALocalStorage();
            imprimirUsuarios();
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
    vaciarBloque();
    pagoConTarjetaCampoUno(usuario);
    // let pantalla = pagoConTarjetaCampoUno(usuario);
    // pantalla.boton.addEventListener("click", function() {
    //     let nroTarjeta = pantalla.input.value;
    //     let pantalla2 = pagoConTarjetaCampoDos(usuario, nroTarjeta);
    //     pantalla2.boton.addEventListener("click", function() {
    //         let vencimientoMes = pantalla2.input.mesDeVencimiento.value;
    //         let vencimientoAño = pantalla2.input.anoDeVencimiento.value;
    //         console.log(vencimientoMes);
    //         console.log(vencimientoAño);
    //         let bancoEmisor = pantalla2.element1;
    //         let pantalla3 = pagoConTarjetaCampoTres();
    //         pantalla3.boton.addEventListener("click", function() {
    //             let codigoDeSeguridad = pantalla3.input.value;
    //             // Crear una nueva Tarjeta de Crédito y guardarla en el array correspondiente.
    //             let nuevaTarjeta = new TarjetaDeCredito(nroTarjeta, vencimientoMes, vencimientoAño, codigoDeSeguridad, usuario, bancoEmisor);
    //             tarjetasDeCredito.push(nuevaTarjeta);
    //             // Iniciamos el pago con la tarjeta
    //             iniciarPagoConTarjeta(tarjetaDeCredito);
    //         });
    //     });
    // });
}

function saldoMayor(saldo) {
   return saldo > 0 ? "Felicidades, su saldo es mayor a 0" : "Debe ingresar más dinero en su cuenta";
}

function formatoDniOk(dni) {
    return dni.length < 8 && "Aviso: El Dni parece tener un formato incorrecto"
}

function obtenerFuente(nroTarjeta) {
    let primerosDosDigitos = nroTarjeta.charAt(0);
    let returnArray = {};
    switch (primerosDosDigitos) {
        case('3'):
            returnArray.bancoEmisor = "Visa";
            returnArray.imgPath = "../files/images/visa.png";

        case('4'):
            returnArray.bancoEmisor = "Mastercard";
            returnArray.imgPath = "../files/images/mastercard.png";

        case('5'):
            returnArray.bancoEmisor = "Mastercard";
            returnArray.imgPath = "../files/images/mastercard.png";
        
        case('6'):
            returnArray.bancoEmisor = "American Express";
            returnArray.imgPath = "../files/images/american-express.png";
            
        case('7'):
            returnArray.bancoEmisor = "American Express";
            returnArray.imgPath = "../files/images/american-express.png";
        
        default:
            returnArray.bancoEmisor = "Mastercard";
            returnArray.imgPath = "../files/images/mastercard.png";

    }

    return returnArray
}

function mostrarDatosBasicosDelUsuario(usuario){
    info_usuario = "Usuario" + "\n";
    info_usuario += "\n" + "Nombre : " + usuario.nombre;
    info_usuario += "\n" + "Apellido : " + usuario.apellido;
    info_usuario += "\n" + "Dni : " +  usuario.dni;

    return info_usuario
}

function crearDivConBotones(usuario, tarjeta) {
    let botonSaldo = document.createElement('button');
    let botonTarjeta = document.createElement('button');
    // Añadir atributos a los botones
    botonSaldo.innerText = "Consultar Detalles";
    botonTarjeta.innerText = "Pagar con Tarjeta";
    botonSaldo.classList.add("btn");
    botonSaldo.classList.add("btn-dark");
    botonSaldo.classList.add("margin-button");
    botonTarjeta.classList.add("btn");
    botonTarjeta.classList.add("btn-dark");
    botonTarjeta.classList.add("margin-button");
    
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
        seleccionarTipoDePagoConTarjeta(usuario, tarjeta);
    });

    return divBotones
}

function verDetallesTecnicos(usuario, tarjeta) {
    vaciarTarjeta(tarjeta);
    // Mostrar los detalles técnicos con las funciones con operadores ternarios
    let mensajeConsolidado = document.createElement('p');
    mensajeConsolidado.innerText = (saldoMayor(usuario.saldo) + "\n" + formatoDniOk(usuario.dni));
    tarjeta.appendChild(mensajeConsolidado);
    // Crear un botón para volver atrás
    let botonVuelta = document.createElement('button');
    botonVuelta.innerText = "Volver";
    botonVuelta.classList.add('btn');
    botonVuelta.classList.add('btn-info');
    botonVuelta.setAttribute("style", "margin : 10px;");
    botonVuelta.addEventListener("click", () => {
        mostrarSaldoUsuario(usuario, tarjeta);
    });
    tarjeta.appendChild(botonVuelta);
}

function vaciarTarjeta(tarjeta) {
    tarjeta.innerHTML = "";
}

function seleccionarTipoDePagoConTarjeta(usuario, tarjeta) {
    vaciarTarjeta(tarjeta);
    let botonUno = document.createElement('button');
    let botonDos = document.createElement('button');
    let botonTres = document.createElement('button');
    // Añadir atributos a los botones
    botonUno.innerText = "Ver Tarjetas Propias";
    botonDos.innerText = "Cargar una nueva tarjeta";
    botonTres.innerText = "Volver";
    botonUno.classList.add("btn");
    botonUno.classList.add("btn-dark");
    botonUno.classList.add("margin-button");
    botonDos.classList.add("btn");
    botonDos.classList.add("btn-dark");
    botonDos.classList.add("margin-button");
    botonTres.classList.add("btn");
    botonTres.classList.add("btn-info");
    botonTres.classList.add("margin-button");

    // Crear un div que contenga los botones
    let divBotones = document.createElement('div');
    divBotones.classList.add('flex-row');
    // Añadir los botones al div
    divBotones.appendChild(botonUno);
    divBotones.appendChild(botonDos);


    // Añadir los eventListeners a cada botón
    botonUno.addEventListener("click", function() {
        cargarTarjetas(usuario);
    });
    botonDos.addEventListener("click", function() {
        pagoConTarjeta(usuario);
    });
    botonTres.addEventListener("click", function() {
        mostrarDatosUsuario(usuario, tarjeta);
    });

    tarjeta.appendChild(divBotones);
    tarjeta.append(botonTres);
}

function cargarTarjetas(usuario) {
    vaciarBloque();
    let bloque = document.getElementById('bloque');
    console.log(tarjetasDeCredito);
    tarjetasDeCredito.forEach((tarjeta) => {
        console.log("Estuve aquí");
        console.log(tarjeta);
        if(usuario.dni === tarjeta.usuarioDueno.dni) {
            console.log("Estuve aquí");
            bloque.appendChild(crearTarjeta(tarjeta, true));
        }    
    });
}

function crearTarjeta(tarjetaDeCredito, clickeable) {
    // Crear un div para la representación de la tarjeta de crédito
    let simuladorTarjeta = document.createElement('div');
    simuladorTarjeta.classList.add('simulador-tarjeta');
    // Ponerle el color según el tipo de tarjeta que sea
    pintarTarjetaSegunTipo(tarjetaDeCredito, simuladorTarjeta);

    // También querríamos poner un h1 con el nombre del banco
    let divTitulo = document.createElement('div');
    let titulo = document.createElement('h1');
    titulo.innerText = "Coderhouse Bank Ltd."
    divTitulo.appendChild(titulo);
    divTitulo.classList.add('titulo-tarjeta');
    
    // Creamos un Label con los datos del usuario
    let datosDuenoTarjeta = document.createElement('p');
    let nombreUpper = tarjetaDeCredito.usuarioDueno.nombre.toUpperCase() + " " + tarjetaDeCredito.usuarioDueno.apellido.toUpperCase();
    let datosCompletos = nombreUpper + "\n" + tarjetaDeCredito.nroTarjeta;
    datosDuenoTarjeta.innerText = datosCompletos;

    // También querríamos un label con los datos del vencimiento de la tarjeta
    console.log(tarjetaDeCredito);
    let labelVencimiento = document.createElement('p');
    labelVencimiento.innerText = tarjetaDeCredito.mesVencimiento + " / " + tarjetaDeCredito.anoVencimiento;
    labelVencimiento.classList.add('white');

    // Tiene que estar adentro de un div, con display flex center
    let divVencimiento = document.createElement('div');
    divVencimiento.classList.add('flex-row');
    divVencimiento.appendChild(labelVencimiento);
    
    // Poner los elementos en un div, que va a tener la clase de una de las areas grid que tiene el simulador de tarjeta
    let divCreditCardData = document.createElement('div');
    divCreditCardData.classList.add('credit-card-data');
    divCreditCardData.appendChild(datosDuenoTarjeta);
    divCreditCardData.appendChild(divVencimiento);

    // Por último, querríamos poner adentro de un div una imagen con el emisor de la tarjeta.
    let divImagenProcesador = document.createElement('div');
    divImagenProcesador.classList.add('contenedor-imagen-procesador');
    let imagenProcesador = document.createElement('img');
    imagenProcesador.classList.add('imagen-procesador');
    let fuenteImagen = obtenerFuente(tarjetaDeCredito.nroTarjeta);
    imagenProcesador.setAttribute("src", fuenteImagen.imgPath);
    divImagenProcesador.appendChild(imagenProcesador);

    // Poner el div dentro del div simulador Tarjeta, que tiene el display grid que necesito
    simuladorTarjeta.appendChild(divTitulo);
    simuladorTarjeta.appendChild(divCreditCardData);
    simuladorTarjeta.appendChild(divImagenProcesador);

    // También querríamos ponerle un click a la tarjeta
    if (clickeable) {
        simuladorTarjeta.addEventListener("click", function () {
            iniciarPagoConTarjeta(tarjetaDeCredito);
        });
    }

    return simuladorTarjeta;
}

function tipoDeTarjeta(tarjetaDeCredito) {
    let numerosIniciales = tarjetaDeCredito.nroTarjeta.slice(0, 2);
    numerosIniciales = Number(numerosIniciales);
    console.log(numerosIniciales);
    let retorno;
    
    if (numerosIniciales < 40) {
        retorno = "normal";
    } else if (numerosIniciales < 65) {
        retorno = "gold";
    } else {
        retorno = "platinum";
    }
    
    return retorno;
}

function pintarTarjetaSegunTipo(tarjetaDeCredito, element) {
    let tipo = tipoDeTarjeta(tarjetaDeCredito);
    switch(tipo) {
        case("normal"):
            element.classList.add('tarjeta-normal');
            break;

        case("gold"):
            element.classList.add('tarjeta-gold');
            break;

        case("platinum"):
            element.classList.add('tarjeta-platinum');
        break;

        default:
            element.classList.add('tarjeta-normal');
    }
}

function crearBotonesDeAvanceYRetroceso(textoAvance) {
    // Crear otro div para los botones de avance y retroceso
    let divBotones = document.createElement('div');
    divBotones.classList.add('flex-row');
    // Crear un boton de Cancelar y uno de avanzar
    let botonCancelar = document.createElement('button');
    let botonContinuar = document.createElement('button');
    botonCancelar.innerText = "Cancelar";
    botonContinuar.innerText = textoAvance;
    botonCancelar.classList.add('btn');
    botonCancelar.classList.add('btn-warning');
    botonCancelar.classList.add('margin-button');
    botonContinuar.classList.add('btn');
    botonContinuar.classList.add('btn-success');
    botonCancelar.classList.add('margin-button');
    // Añadir una acción de Cancelar al botón de Cancelar
    botonCancelar.addEventListener("click", function() {
        vaciarBloque();
    });
    // El botón de continuar tiene un Event Listener añadido desde la función pagoConTarjeta,
    // pq cada acción continuar necesita hacer algo diferente

    // Añadir los elementos al divBotones
    divBotones.appendChild(botonCancelar);
    divBotones.appendChild(botonContinuar);

    let objetoRetorno = {
        elem1 : divBotones,
        elem2 : botonContinuar
    }
    return objetoRetorno;
}

function iniciarPagoConTarjeta(tarjetaDeCredito) {
    vaciarBloque();
    // Queremos un label con la indicación
    let labelIndicacion = document.createElement('p');
    labelIndicacion.setAttribute("style", "color : white;");
    labelIndicacion.innerText = "Ingrese el monto a pagar";
    let tarjeta = crearTarjeta(tarjetaDeCredito, false);

    // Queremos también que haya un input copado para ingresar el monto
    let inputMontoAPagar = document.createElement('input');
    inputMontoAPagar.classList.add('input-monto-tarjeta');
    inputMontoAPagar.setAttribute("placeholder", "0.00 $");
    inputMontoAPagar.setAttribute("autofocus", "autofocus");

    // Crear otro div para los botones de avance y retroceso
    let divBotones = crearBotonesDeAvanceYRetroceso("Continuar");

    // Añadimos los elementos al bloque
    let bloque = document.getElementById('bloque');
    bloque.appendChild(labelIndicacion);
    bloque.appendChild(tarjeta);
    bloque.appendChild(inputMontoAPagar);
    bloque.appendChild(divBotones.elem1);

    divBotones.elem2.addEventListener("click", function () {
        let monto = inputMontoAPagar.value;
        confirmarPagoConTarjeta(tarjetaDeCredito, monto);
    });
}

function confirmarPagoConTarjeta(tarjetaDeCredito, monto) {
    vaciarBloque();
    // Tiene que haber tres labels
    //Usted va a pagar
    let labelIndicacionUno = document.createElement('p');
    labelIndicacionUno.innerText = "Usted está a punto de pagar";
    labelIndicacionUno.classList.add('white');
    labelIndicacionUno.classList.add('text-align-center');

    // El monto en verde gigante
    let labelMonto = document.createElement('p');
    labelMonto.innerText = monto + "$";
    labelMonto.classList.add('label-monto-tarjeta');

    // con su tarjeta
    let labelIndicacionDos = document.createElement('p');
    labelIndicacionDos.innerText = "Con su Tarjeta";
    labelIndicacionDos.classList.add('white');
    labelIndicacionDos.classList.add('text-align-center');

    // la tarjeta
    let tarjeta = crearTarjeta(tarjetaDeCredito, false);

    // ¿ Desea confirmar la operación? 
    let labelIndicacionTres = document.createElement('p');
    labelIndicacionTres.innerText = "¿Desea Confirmar la Operación?";
    labelIndicacionTres.classList.add('white');
    labelIndicacionTres.classList.add('text-align-center');

    // Botones de Cancelar y Confirmar
    let divBotones = crearBotonesDeAvanceYRetroceso("Confirmar");

    //Añadimos un Eventlistener que confirme la operación
    divBotones.elem2.addEventListener("click", function() {
        if (validarMonto(monto)) {
            swal({
                title : "Éxito en la transacción!",
                text : "El pago se ingreso con éxito y la copia de los detalles ya te llego a tu mail 🚀",
                button : 'Ok',
                icon : 'https://media3.giphy.com/media/3oKIPa2TdahY8LAAxy/giphy.gif?cid=ecf05e473r41s6qr4g57zwkg262vdls62o7euirnilo80i2b&rid=giphy.gif&ct=g'
            });
        }
        vaciarBloque();
    });
    
    // Añadimos los dos divs al div de pagos con tarjeta
    let bloque = document.getElementById('bloque');
    bloque.appendChild(labelIndicacionUno);
    bloque.appendChild(labelMonto);
    bloque.appendChild(labelIndicacionDos);
    bloque.appendChild(tarjeta);
    bloque.appendChild(labelIndicacionTres);
    bloque.appendChild(divBotones.elem1);

}

function pagoConTarjetaCampoUno(usuario) {     
    // Crear un div para la representación de la tarjeta de crédito
    let simuladorTarjeta = document.createElement('div');
    simuladorTarjeta.classList.add('simulador-tarjeta');
    simuladorTarjeta.classList.add('tarjeta-normal');

    // Creamos un Label con los datos del usuario
    let datosDuenoTarjeta = document.createElement('p');
    let nombreUpper = usuario.nombre.toUpperCase() + " " + usuario.apellido.toUpperCase();
    datosDuenoTarjeta.innerText = nombreUpper;

    // Creamos un Input para ingresar los datos del usuario
    let input = document.createElement('input');
    input.classList.add('cool-input');
    input.setAttribute("placeholder", "XXXX YYYY QQQQ ZZZZ");
    input.setAttribute("autofocus", "autofocus");

    // Poner los elementos en un div, que va a tener la clase de una de las areas grid que tiene el simulador de tarjeta
    let divCreditCardData = document.createElement('div');
    divCreditCardData.classList.add('credit-card-data');
    divCreditCardData.appendChild(datosDuenoTarjeta);
    divCreditCardData.appendChild(input);

    // También querríamos poner un h1 con el nombre del banco
    let divTitulo = document.createElement('div');
    let titulo = document.createElement('h1');
    titulo.innerText = "Coderhouse Bank Ltd."
    divTitulo.appendChild(titulo);
    divTitulo.classList.add('titulo-tarjeta');

    // Poner el div dentro del div simulador Tarjeta, que tiene el display grid que necesito
    simuladorTarjeta.appendChild(divTitulo);
    simuladorTarjeta.appendChild(divCreditCardData);

    // Crear otro div para los botones de avance y retroceso
    let divBotones = crearBotonesDeAvanceYRetroceso("Continuar");
    divBotones.elem2.addEventListener("click", function () {
        let nroTarjeta = input.value;
        pagoConTarjetaCampoDos(usuario, nroTarjeta);
    });
    // Añadimos los dos divs al div de pagos con tarjeta
    let bloque = document.getElementById('bloque');
    bloque.appendChild(simuladorTarjeta);
    bloque.appendChild(divBotones.elem1);

}

function pagoConTarjetaCampoDos(usuario, nroTarjeta) {     
    vaciarBloque();
    // Crear un div para la representación de la tarjeta de crédito
    let simuladorTarjeta = document.createElement('div');
    simuladorTarjeta.classList.add('simulador-tarjeta');
    simuladorTarjeta.classList.add('tarjeta-normal');

    // También querríamos poner un h1 con el nombre del banco
    let divTitulo = document.createElement('div');
    let titulo = document.createElement('h1');
    titulo.innerText = "Coderhouse Bank Ltd."
    divTitulo.appendChild(titulo);
    divTitulo.classList.add('titulo-tarjeta');
    
    // Creamos un Label con los datos del usuario
    let datosDuenoTarjeta = document.createElement('p');
    let nombreUpper = usuario.nombre.toUpperCase() + " " + usuario.apellido.toUpperCase();
    let datosCompletos = nombreUpper + "\n" + nroTarjeta
    datosDuenoTarjeta.innerText = datosCompletos;

    // El Input en realidad tienen que ser dos, separados por una coma
    let inputMes = document.createElement('input');
    inputMes.classList.add('date-input');
    inputMes.setAttribute("placeholder", "MM");
    inputMes.setAttribute("autofocus", "autofocus");
    
    let inputAño = document.createElement('input');
    inputAño.classList.add('date-input');
    inputAño.setAttribute("placeholder", "YY");

    // Los Inputs tienen que estar ambos centrados, en un div 
    let divInputs = document.createElement('div');
    divInputs.classList.add('flex-row');
    divInputs.appendChild(inputMes);
    divInputs.appendChild(inputAño);
    
    // Poner los elementos en un div, que va a tener la clase de una de las areas grid que tiene el simulador de tarjeta
    let divCreditCardData = document.createElement('div');
    divCreditCardData.classList.add('credit-card-data');
    divCreditCardData.appendChild(datosDuenoTarjeta);
    divCreditCardData.appendChild(divInputs);


    // Deberíamos tener una función justamente, que lea el input de la tarjeta y retorne que archivo de texto buscar
    let divImagenProcesador = document.createElement('div');
    divImagenProcesador.classList.add('contenedor-imagen-procesador');
    let imagenProcesador = document.createElement('img');
    imagenProcesador.classList.add('imagen-procesador');
    let fuenteImagen = obtenerFuente(nroTarjeta);
    imagenProcesador.setAttribute("src", fuenteImagen.imgPath);
    divImagenProcesador.appendChild(imagenProcesador);

    // Poner el div dentro del div simulador Tarjeta, que tiene el display grid que necesito
    simuladorTarjeta.appendChild(divTitulo);
    simuladorTarjeta.appendChild(divCreditCardData);
    simuladorTarjeta.appendChild(divImagenProcesador);

    // Crear otro div para los botones de avance y retroceso
    let divBotones = crearBotonesDeAvanceYRetroceso("Continuar");
    divBotones.elem2.addEventListener("click", function () {
        let tarjetaProvisoria = {
            usuario : usuario,
            nroTarjeta : nroTarjeta,
            mesVencimiento : inputMes.value,
            anoVencimiento : inputAño.value
        }
        pagoConTarjetaCampoTres(tarjetaProvisoria);
    });
    // Añadimos los dos divs al div de pagos con tarjeta
    let bloque = document.getElementById('bloque');
    bloque.appendChild(simuladorTarjeta);
    bloque.appendChild(divBotones.elem1);
}

function pagoConTarjetaCampoTres(tarjetaProvisoria) {
    vaciarBloque();
    // Crear un div para la representación de la tarjeta de crédito
    let simuladorTarjeta = document.createElement('div');
    simuladorTarjeta.classList.add('simulador-reverso-tarjeta');

    // Tiene que haber una linea horizontal negra que simule la banda magnética
    // Esa banda magnética la voy a simular con un div negro con algo de margen
    let divNegro = document.createElement('div');
    divNegro.classList.add('simulador-banda-magnetica');

    // Tien que haber un div que tenga el p y el input del texto   
    let divContenedor = document.createElement('div');
    divContenedor.classList.add('grid-seguridad');

    // El div hay que añadirlo dentro de simulador tarjeta, junto con el divNegro
    simuladorTarjeta.appendChild(divNegro);
    simuladorTarjeta.appendChild(divContenedor);

    // Tiene que haber un p para info sobre el codigo de seguridad
    let textoSeguridad = document.createElement('p');
    textoSeguridad.innerText = "Ingrese el código de seguridad de la tarjeta";
    textoSeguridad.classList.add('info');

    // Tiene que haber un input para poner el texto
    let inputSeguridad = document.createElement('input');
    inputSeguridad.classList.add('cool-input');
    inputSeguridad.setAttribute("id", "input-seguridad");
    inputSeguridad.setAttribute("placeholder", "123");
    inputSeguridad.setAttribute("autofocus", "autofocus");

    // Ese input tiene que estar en un div, que sea el área específica dentro del Grid.
    let divInputSeguridad = document.createElement('div');
    divInputSeguridad.classList.add('input-seguridad');
    divInputSeguridad.appendChild(inputSeguridad);

    // Agregar el input y el texto en el divContenedor
    divContenedor.appendChild(textoSeguridad);
    divContenedor.appendChild(divInputSeguridad);
    
    // Crear otro div para los botones de avance y retroceso
    let divBotones = crearBotonesDeAvanceYRetroceso("Continuar");
    divBotones.elem2.addEventListener("click", function() {
        let codigoDeSeguridad = inputSeguridad.value;
        let nuevaTarjeta = new TarjetaDeCredito(tarjetaProvisoria.nroTarjeta,
                           tarjetaProvisoria.mesVencimiento, tarjetaProvisoria.anoVencimiento,
                           codigoDeSeguridad, tarjetaProvisoria.usuario, obtenerFuente(tarjetaProvisoria.nroTarjeta).bancoEmisor);
        tarjetasDeCredito.push(nuevaTarjeta);
        iniciarPagoConTarjeta(nuevaTarjeta);
    });
    // Añadimos los dos divs al div de pagos con tarjeta
    let bloque = document.getElementById('bloque');
    bloque.appendChild(simuladorTarjeta);
    bloque.appendChild(divBotones.elem1);
}