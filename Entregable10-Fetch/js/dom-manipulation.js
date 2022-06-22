//Manipulación del Dom
// Agregamos botones con las opciones 
let textosBotones = ['Agregar Usuario', 'Imprimir Usuarios', 'Cargar Saldo', 'Transferir entre Usuarios', 'Eliminar Usuario'];
for (let index = 0; index < textosBotones.length; index++) {
    const boton = document.createElement("button");
    let textoBoton = textosBotones[index];
    boton.innerText = textoBoton;
    boton.classList.add('btn');
    boton.classList.add('btn-primary');
    boton.classList.add('margin-button');
    document.getElementById('navbar').append(boton);
    // Agregamos los Event Listeners a los botones
    switch(textoBoton) {
        case('Agregar Usuario'):
            boton.addEventListener("click", function() {
                altaUsuario();
            });
            break;

        case('Imprimir Usuarios'):
            boton.addEventListener("click", function() {
                console.log(1);
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
