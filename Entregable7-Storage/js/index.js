// Constantes globales
let usuarios = []
let pagos = []
let vendedores = []
let productos = []
let id_usuarios_count = 0;
let id_pagos_count = 0;

// Agregar dos usuarios para poder hacer testings
const usuario1 = new Usuario (id_usuarios_count, "Santy", "Gegenschatz", "1", 100);
const usuario2 = new Usuario (id_usuarios_count, "John", "Doe", "2", 100);
usuarios.push(usuario1);
usuarios.push(usuario2);

usuariosJSON = JSON.stringify(usuarios);
localStorage.setItem('usuarios', usuariosJSON);

usuarios = JSON.parse(localStorage.getItem('usuarios'));
console.log(usuarios);