// Clases del sistema a simular
class Usuario {

    constructor(unique_id, nombre, apellido, dni, saldo) {
        this.unique_id = unique_id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.saldo = saldo;
        incrementarIdCount();
    }

    transferir(usuario, monto) {
        if (this.saldo >= monto) { // Cuando pongo validar saldo por acá me dice que no lo puede encontrar
            this.saldo -= monto;
            usuario.saldo += monto;
            const pago = new Pago(id_pagos_count + 1, monto);
            pagos.push(pago);
        } else {
            throw "No hay suficiente saldo para realizar la acción"
        }
    }
    

    validarSaldo(monto) {
        return this.saldo >= monto;
    }

    imprimir(algo) {
        console.log(algo);
    }


}

class Pago {
    constructor(unique_id, monto) {
        this.unique_id = unique_id;
        this.monto = monto;
    }
}

class TarjetaDeCredito {
    constructor(nroTarjeta, mesVencimiento, anoVencimiento, codSeguridad, usuarioDueno, bancoEmisor) {
        this.nroTarjeta = nroTarjeta;
        this.mesVencimiento = mesVencimiento;
        this.anoVencimiento = anoVencimiento;
        this.codSeguridad = codSeguridad;
        this.usuarioDueno = usuarioDueno;
        this.bancoEmisor = bancoEmisor;
    }
}

// Clases Visuales Auxiliares

class Pantalla {
    // ¿ Cómo construyo algo distinto? Un constructor con otras 4 variables por ejemplo
    constructor(element1, input, boton) {
        this.element1 = element1;
        this.input = input;
        this.boton = boton;
    }
}

class PantallaDeConfirmacion {
    constructor(title, label, botonCancelar, botonAceptar) {
        this.title = title;
        this.label = label;
        this.botonCancelar = botonCancelar;
        this.botonAceptar = botonAceptar;
    }
}

function incrementarIdCount() {
    id_usuarios_count +=1;
}
