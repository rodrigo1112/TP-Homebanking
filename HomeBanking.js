const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const TipoCuenta = {
  CAJA_DE_AHORRO: 'Caja de ahorro en pesos',
  CUENTA_CORRIENTE: 'Cuenta corriente en pesos'
};

function generarID() {
  return Math.floor(10000 + Math.random() * 90000); // Genera un número aleatorio de 5 dígitos
}

function crearCuenta(tipo, saldo = 0) {
  return {
    tipo,
    saldo,
    id: generarID(),
    movimientos: []
  };
}

function crearUsuario(nombre, apellido, email) {
  const usuario = {
    nombre: nombre,
    apellido: apellido,
    email: email,
    cuentas: []
  };

  const nuevaCuenta = crearCuenta(TipoCuenta.CAJA_DE_AHORRO, 1000);
  usuario.cuentas.push(nuevaCuenta);

  usuarios.push(usuario);

  return usuario;
}

// Resto de las funciones (depositar, retirar, transferir, comprarDolares, venderDolares, etc.)

const usuarios = [];

function mostrarMenu() {
  console.log('--- Menú ---');
  console.log('1. Transferencias');
  console.log('2. Ingresar dinero (depósito)');
  console.log('3. Retiro de dinero (extracción)');
  console.log('4. Compra de dólares');
  console.log('5. Venta de dólares');
  console.log('6. Ver cuentas creadas');
  console.log('7. Ver historial de movimientos');
  console.log('8. Crear cuenta');
  console.log('0. Salir');
}

function verCuentasCreadas() {
  usuarios.forEach((usuario, index) => {
    console.log(`Usuario ${index + 1}: ${usuario.nombre} ${usuario.apellido}`);
    usuario.cuentas.forEach((cuenta, cuentaIndex) => {
      console.log(`  Cuenta ${cuentaIndex + 1}: Tipo: ${cuenta.tipo}, Saldo: $${cuenta.saldo}, ID: ${cuenta.id}`);
    });
  });
}

function verHistorialMovimientos() {
  usuarios.forEach((usuario, index) => {
    console.log(`Historial de movimientos para ${usuario.nombre} ${usuario.apellido}:`);
    usuario.cuentas.forEach((cuenta, cuentaIndex) => {
      console.log(`  Cuenta ${cuentaIndex + 1} (${cuenta.tipo}, ID: ${cuenta.id}):`);
      cuenta.movimientos.forEach((movimiento, movimientoIndex) => {
        console.log(`    ${movimiento}`);
      });
    });
  });
}

async function crearNuevaCuenta() {
  const nombre = await preguntaAsync('Ingrese el nombre del nuevo usuario: ');
  const apellido = await preguntaAsync('Ingrese el apellido del nuevo usuario: ');
  const email = await preguntaAsync('Ingrese el email del nuevo usuario: ');

  const nuevoUsuario = crearUsuario(nombre, apellido, email);
  console.log(`Se ha creado una nueva cuenta para ${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`);
}

function preguntaAsync(pregunta) {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta);
    });
  });
}

async function ejecutarBanco() {
  mostrarMenu();
  await solicitarOpcion();
}

async function solicitarOpcion() {
  const input = await preguntaAsync('Ingrese el número de opción: ');
  const opcion = parseInt(input);

  switch (opcion) {
    case 1:
      // Realizar transferencias
      // ...
      await solicitarOpcion();
      break;
    case 2:
      // Realizar depósito
      // ...
      await solicitarOpcion();
      break;
    case 3:
      // Realizar retiro
      // ...
      await solicitarOpcion();
      break;
    case 4:
      // Realizar compra de dólares
      // ...
      await solicitarOpcion();
      break;
    case 5:
      // Realizar venta de dólares
      // ...
      await solicitarOpcion();
      break;
    case 6:
      // Ver cuentas creadas
      verCuentasCreadas();
      await solicitarOpcion();
      break;
    case 7:
      // Ver historial de movimientos
      verHistorialMovimientos();
      await solicitarOpcion();
      break;
    case 8:
      // Crear cuenta
      await crearNuevaCuenta();
      await solicitarOpcion();
      break;
    case 0:
      console.log('Saliendo del banco. ¡Hasta luego!');
      rl.close();
      break;
    default:
      console.log('Opción inválida. Por favor, ingrese una opción válida.');
      await solicitarOpcion();
      break;
  }
}

ejecutarBanco();


