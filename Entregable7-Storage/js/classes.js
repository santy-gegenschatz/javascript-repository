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

    validarSaldo(monto) {
        return this.saldo >= monto;
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

class Pantalla {
    constructor(label, input, boton) {
        this.label = label;
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