window.addEventListener('load', () => {
    let menor = 0;
    let mayor = 0;
    let contador = 0;

    // Pide la cantidad de números a analizar al usuario.
    const cantidad = pedirCantidad();

    // Poner la cantidad en la paǵina.
    document.getElementById('cantidadNumeros').textContent = cantidad;

    // Pide los números uno por uno hasta completar la cantidad solicitada por el usuario.
    while (contador < cantidad) {
        const numero = pedirNumero();

        // Poner el número en la paǵina.
        const pNumero = document.createElement('p');
        pNumero.textContent = numero;
        document.getElementById('numerIngresados').appendChild(pNumero);

        // El primer número ingresado es el mayor y menor.
        if (contador === 0) {
            mayor = numero;
            menor = numero;
        } else {
            // Si el número ingresado es mayor al actual, se guarda como el mayor.
            if (numero > mayor) mayor = numero;

            // Si el número ingresado es menor al actual, se guarda como el mayor.
            if (numero < menor) menor = numero;
        }

        contador++;
    }

    // Muestra el número mayor y menor en la página.
    document.getElementById('numeroMayor').textContent = mayor;
    document.getElementById('numeroMenor').textContent = menor;
})

const pedirCantidad = (invalido = false) => {
    // Aquí no estamos limitados a 1 caracter como en la versión de Assembly, pero se va a validar que sea un número.
    const textoSolicitaCantidad = !invalido ?
        'Ingrese cantidad de numeros a comparar:'
        : 'Por favor, ingrese una cantidad válida de numeros a comparar:';

    const cantidadString = window.prompt(textoSolicitaCantidad);
    const cantidadNumber = Number(cantidadString)

    /* Vuelve a solicitar la cantidad al usuario si:
     * - La cantidad ingresada no es un número válido.
     * - La cantidad ingresada es menor a 0.
     */
    return !Number.isNaN(cantidadNumber) && cantidadNumber > 0 ? cantidadNumber : pedirCantidad(true)
}

const pedirNumero = (invalido = false) => {
    const textoSolicitaNumero = !invalido ? 'Ingrese un numero:' : 'Por favor, ingrese un número válido:';
    const numeroString = window.prompt(textoSolicitaNumero);
    const numeroNumber = Number(numeroString)

    // Vuelve a solicitar el número al usuario si el número ingresado no es un número válido.
    return !Number.isNaN(numeroNumber) ? numeroNumber : pedirNumero(true)
}