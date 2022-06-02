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