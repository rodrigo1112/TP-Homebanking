function createUser() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "") {
        return;
    }   

    const user = {
        firstName,
        lastName,
        email,
        CA: 1000, 
        CC: 0,    
        CAUSD: 0, 
        CUSD: 0,  
        transactions: []
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    displayUsers();
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
}

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}

function handleTransaction(type, index) {
    const amount = parseFloat(prompt(`Ingrese el monto a ${type === "withdraw" ? "retirar" : "depositar"}:`));
    if (isNaN(amount) || amount <= 0) {
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    const account = prompt("Ingrese la cuenta (CA, CUSD, CC, CAUSD):").toUpperCase();
    if (!user.hasOwnProperty(account)) {
        return;
    }

    if (type === "deposit") {
        user[account] += amount;
    } else if (type === "withdraw") {
        if (account === "CA" && user[account] - amount < -1000) {
            return;
        }
        if (account === "CUSD" && user[account] - amount < 0) {
            return;
        }
        user[account] -= amount;
    } else if (type === "transfer") {
        const targetAccount = prompt("Ingrese la cuenta de destino (CA, CUSD, CC, CAUSD):").toUpperCase();
        if (!user.hasOwnProperty(targetAccount)) {
            return;
        }
        if (user[account] - amount < 0) {
            return;
        }
        user[account] -= amount;
        user[targetAccount] += amount;
    }
    
    user.transactions.push(`Transacción: ${getTransactionType(type)} de ${amount} desde ${getAccountName(account)} a ${getAccountName(targetAccount)}. Nuevo Saldo: ${user[account]}`);
    
    
    user.transactions.push(`Transaccion: ${type === "deposit" ? "Depósito" : "Retiro"} de ${amount} en ${getAccountName(account)}. Nuevo Saldo: ${user[account]}`);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}

function getAccountName(account) {
    const accountNames = {
        CA: "Caja de Ahorro (PESOS)",
        CC: "Cuenta Corriente (PESOS)",
        CAUSD: "Caja de Ahorro (USD)",
        CUSD: "Cuenta Corriente (USD)"
    };
    return accountNames[account] || "Cuenta Desconocida";
}

function displayUsers() {
    const userList = document.getElementById("userList");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userList.innerHTML = "";

    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = `${user.firstName} ${user.lastName} - Email: ${user.email}`;

        if (user.transactions && user.transactions.length > 0) {
            const ul = document.createElement("ul");
            user.transactions.forEach(transaction => {
                const transactionLi = document.createElement("li");
                transactionLi.textContent = transaction;
                ul.appendChild(transactionLi);
            });
            li.appendChild(ul);
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => deleteUser(index));
        const depositButton = document.createElement("button");
        depositButton.textContent = "Depositar";
        depositButton.addEventListener("click", () => handleTransaction("deposit", index));
        const withdrawButton = document.createElement("button");
        withdrawButton.textContent = "Retirar";
        withdrawButton.addEventListener("click", () => handleTransaction("withdraw", index));
        li.appendChild(deleteButton);
        li.appendChild(depositButton);
        li.appendChild(withdrawButton);
        userList.appendChild(li);
        const transferButton = document.createElement("button");
transferButton.textContent = "Transferir";
transferButton.addEventListener("click", () => handleTransaction("transfer", index));
li.appendChild(transferButton);

    });
}

displayUsers();