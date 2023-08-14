// Array para almacenar usuarios y sus cuentas
const usuarios = [];

// Función para crear una nueva cuenta
function crearCuenta(tipo, saldo) {
  return {
    tipo,
    saldo
  };
}

// Función para crear un nuevo usuario
function crearUsuario(nombre, apellido, email) {
  const usuario = {
    nombre,
    apellido,
    email,
    cuentas: []
  };

  usuario.cuentas.push(crearCuenta('Caja de ahorro en pesos', 1000)); // Agregar cuenta con saldo inicial de $1000

  usuarios.push(usuario); // Agregar usuario al array

  return usuario;
}

// Función para depositar dinero en una cuenta
function depositar(usuario, cuentaIndex, monto) {
  usuario.cuentas[cuentaIndex].saldo += monto;
}

// Función para retirar dinero de una cuenta
function retirar(usuario, cuentaIndex, monto) {
  const cuenta = usuario.cuentas[cuentaIndex];
  if (cuenta.tipo === 'Caja de ahorro en pesos' && cuenta.saldo - monto < 0) {
    return false; // No se permite saldo negativo en caja de ahorro
  }

  if (cuenta.tipo === 'Cuenta corriente en pesos' && cuenta.saldo - monto < -1000) {
    return false; // No se permite saldo negativo mayor a -1000 en cuenta corriente
  }

  cuenta.saldo -= monto;
  return true;
}

// Función para realizar una transferencia entre cuentas
function transferir(origenUsuario, origenCuentaIndex, destinoUsuario, destinoCuentaIndex, monto) {
  const origenCuenta = origenUsuario.cuentas[origenCuentaIndex];
  const destinoCuenta = destinoUsuario.cuentas[destinoCuentaIndex];

  if (origenCuenta.saldo - monto < 0) {
    return false;
  }

  origenCuenta.saldo -= monto;
  destinoCuenta.saldo += monto;
  return true;
}

// Función para eliminar un usuario
function eliminarUsuario(usuarioIndex) {
  usuarios.splice(usuarioIndex, 1);
}

// Función para agregar un usuario a la lista de cuentas en el HTML
function agregarUsuarioALista(usuario) {
  const listaCuentas = document.getElementById('listaCuentas');
  const nuevoUsuarioItem = document.createElement('li');
  nuevoUsuarioItem.textContent = `${usuario.nombre} ${usuario.apellido} - ${usuario.email}`;
  listaCuentas.appendChild(nuevoUsuarioItem);
}

// Función para actualizar la interfaz de usuario con las cuentas de un usuario
function mostrarCuentas(usuario) {
  const listaUsuarios = document.getElementById('listaUsuarios');
  const nuevoUsuarioItem = document.createElement('li');
  nuevoUsuarioItem.textContent = `${usuario.nombre} ${usuario.apellido} - ${usuario.email}`;

  const depositarBtn = document.createElement('button');
  depositarBtn.textContent = 'Depositar';
  depositarBtn.addEventListener('click', () => {
    const monto = parseFloat(prompt('Ingrese el monto a depositar:'));
    if (!isNaN(monto)) {
      const cuentaIndex = 0; // Cambia esto para seleccionar la cuenta deseada
      depositar(usuario, cuentaIndex, monto);
      actualizarSaldoCuenta(usuario, cuentaIndex);
    }
  });

  const retirarBtn = document.createElement('button');
  retirarBtn.textContent = 'Retirar';
  retirarBtn.addEventListener('click', () => {
    const monto = parseFloat(prompt('Ingrese el monto a retirar:'));
    if (!isNaN(monto)) {
      const cuentaIndex = 0; // Cambia esto para seleccionar la cuenta deseada
      if (retirar(usuario, cuentaIndex, monto)) {
        actualizarSaldoCuenta(usuario, cuentaIndex);
      } else {
        alert('No se puede retirar el monto especificado.');
      }
    }
  });

  const transferirBtn = document.createElement('button');
  transferirBtn.textContent = 'Transferir';
  transferirBtn.addEventListener('click', () => {
    const monto = parseFloat(prompt('Ingrese el monto a transferir:'));
    if (!isNaN(monto)) {
      const origenCuentaIndex = 0; // Cambia esto para seleccionar la cuenta de origen
      const destinoCuentaIndex = 1; // Cambia esto para seleccionar la cuenta de destino
      transferir(usuario, origenCuentaIndex, usuario, destinoCuentaIndex, monto);
      actualizarSaldoCuenta(usuario, origenCuentaIndex);
      actualizarSaldoCuenta(usuario, destinoCuentaIndex);
    }
  });

  // Agregar los botones a la lista de acciones del usuario
  nuevoUsuarioItem.appendChild(depositarBtn);
  nuevoUsuarioItem.appendChild(retirarBtn);
  nuevoUsuarioItem.appendChild(transferirBtn);

  listaUsuarios.appendChild(nuevoUsuarioItem);
}

// Función para actualizar el saldo de una cuenta en la interf

// Ejemplo de uso
const usuario1 = crearUsuario('Juan', 'Perez', 'juan@example.com');
const usuario2 = crearUsuario('Maria', 'Lopez', 'maria@example.com');

// Agregar usuarios a la lista de cuentas en el HTML
agregarUsuarioALista(usuario1);
agregarUsuarioALista(usuario2);


