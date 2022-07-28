var pos;
var account = [
    {card_number: 1001, nip: '0000', name: 'Marco Estrada', gender: 'male', balance: 200},
    {card_number: 1002, nip: '1234', name: 'Juan Pérez', gender: 'male', balance: 100},
    {card_number: 1003, nip: '4321', name: 'Violeta Ruíz', gender: 'female', balance: 300}
]

const validate_credentials = () => {
    var getUser = document.getElementById('user').value;
    var getPass = document.getElementById('d_1').value+document.getElementById('d_2').value+document.getElementById('d_3').value+document.getElementById('d_4').value;

    pos = -1;

    for(let i = 0; i < account.length; i++) {
        if(getUser == account[i].card_number && getPass == account[i].nip) {
            pos = i;
        }
    }

    if(pos == -1) {
        var d_1 = document.getElementById('d_1');
        var d_2 = document.getElementById('d_2');
        var d_3 = document.getElementById('d_3');
        var d_4 = document.getElementById('d_4');
        
        user.value = "";
        d_1.value = "";
        d_2.value = "";
        d_3.value = "";
        d_4.value = "";

        alert('Tarjeta y/o NIP incorrectos');
    }
    else {
        load_menu();
    }
    
}

const load_menu = () => {
    var header = document.getElementById('header');
    var welcome;
    var user = account[pos];
    var main = document.getElementById('main');

    if(user.gender == 'female') {
        welcome = `¡BIENVENIDA ${user.name}!`
    }
    else {
        welcome = `¡BIENVENIDO ${user.name}!`
    }

    header.innerHTML = welcome;
    main.innerHTML = "";

    main.innerHTML = `
    <p>Favor de elegir una de las opciones:</p>
    <div class="main_menu">
        <div class="btn_balance">
            <button onclick = "balance_inquiry()">Consulta de saldo</button>
        </div>

        <div class="btn_withdrawal">
            <button onclick = "cash_withdrawal()">Retiro de efectivo</button>
        </div>

        <div class="btn_deposit">
            <button onclick = "deposit_account()">Depósito a cuenta</button>
        </div>

        <div class="btn_exit">
            <button onclick = "index_page()">Salir</button>
        </div>
    </div>
    `
}

const balance_inquiry = () => {
    var user = account[pos];
    var main = document.getElementById('main');
    
    main.innerHTML = `
    <div class="balance">
        <span>Tu saldo al día es</span>
    </div>

    <div class="balance">
        <span>Terminación tarjeta: ${user.card_number}</span>
        <br>
        <span>Saldo              : $${user.balance}.00</span> 
    </div>

    <div class="balance">
    <button onclick = "load_menu()">Regresar</button>
    </div>
    `
}

const cash_withdrawal = () => {
    var main = document.getElementById('main');
    
    main.innerHTML = `
    <div class="balance">
    <span>Ingresa la cantidad que desea retirar: $</span>
        <input id="withdrawal" type="text" placeholder="0.00">
    </div>
    
    <div id="withdrawal_info">

    </div>
    
    <div class="balance">
        <button onclick = "withdrawal_operation()">Retirar</button>
        <button onclick = "load_menu()">Regresar</button>
        </div>
        `
}

const deposit_account = () => {
    var main = document.getElementById('main');
    
    main.innerHTML = `
    <div class="balance">
        <span>Ingresa la cantidad que desea depositar: $</span>
        <input id="deposit" type="text" placeholder="0.00">
    </div>
    
    <div id="deposit_info">

    </div>

    <div class="balance">
        <button onclick = "deposit_operation()">Depositar</button>
        <button onclick = "load_menu()">Regresar</button>
    </div>
    `
}
    
const withdrawal_operation = () => {
    var balance = parseInt(account[pos].balance);
    var withdrawal = parseInt(document.getElementById('withdrawal').value);
    var new_balance = balance - withdrawal;
    var info = document.getElementById('withdrawal_info');
    var wd = document.getElementById('withdrawal');
    
    if(withdrawal > 0){
        if(new_balance >= 10 && new_balance <= 990) {
            info.innerHTML = `
            <p class="balance">Información de Movimiento</p>
            <p class="balance">Saldo anterior: $${balance}</p>
            <p class="balance">Retiro        : $${withdrawal}</p>
            <p class="balance">Nuevo saldo   : $${new_balance}</p>
            `
            account[pos].balance = new_balance;
        }
        else {
            info.innerHTML = `
            <p class="balance">¡Movimiento cancelado!</p>
            <p class="balance">El retiro solicitado, viola nuestras politicas.</p>        `
        }
    }
    else {
        info.innerHTML = `
            <p class="balance">¡Movimiento cancelado!</p>
            <p class="balance">Cantidad Negativa. Favor de ingresar monto positivo.</p>        `
    }
    
    wd.value = "";
}
    
const deposit_operation = () => {
    var balance = parseInt(account[pos].balance);
    var deposit = parseInt(document.getElementById('deposit').value);
    var new_balance = balance + deposit;
    var info = document.getElementById('deposit_info');
    var dpt = document.getElementById('deposit');

    if(deposit > 0) {
        if(new_balance >= 10 && new_balance <= 990) {
            info.innerHTML = `
            <p class="balance">Información de Movimiento</p>
            <p class="balance">Saldo anterior: $${balance}</p>
            <p class="balance">Deposito      : $${deposit}</p>
            <p class="balance">Nuevo saldo   : $${new_balance}</p>
            `
            account[pos].balance = new_balance;
        }
        else {
            info.innerHTML = `
            <p class="balance">¡Movimiento cancelado!</p>
            <p class="balance">El deposito solicitado, viola nuestras politicas.</p>        `
        }
    }
    else {
        info.innerHTML = `
            <p class="balance">¡Movimiento cancelado!</p>
            <p class="balance">Cantidad Negativa. Favor de ingresar monto positivo.</p>        `
    }
    
    dpt.value = "";
}

const index_page = () => {
    var main = document.getElementById('main');
    var header = document.getElementById('header');

    header.innerHTML = "¡BIENVENIDO!"

    main.innerHTML = `
    <p>Favor de ingresar los últimos 4 dígitos de tu tarjeta:</p>
    <div class="card">
        <form action="">
            <input type="text" value="5174">
            <input type="text" value="3900">
            <input type="text" value="0004">
            <input type="text" placeholder="0000" id="user">
        </form>
    </div>

    <div class="nip">
    <p>NIP: </p>
    <form action="">
        <input type="password" name="" id="d_1">
        <input type="password" name="" id="d_2">
        <input type="password" name="" id="d_3">
        <input type="password" name="" id="d_4">
    </form>
    </div>

    <div class="enter">
        <input type="submit" onclick="validate_credentials()">
    </div>
    `
    pos = -1;
}