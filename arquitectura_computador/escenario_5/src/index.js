window.addEventListener('load', () => {
    let menor = 0;
    let mayor = 0;
    let contador = 0;

    // Pide la cantidad de números a analizar al usuario.
    const cantidad = pedirCantidad();
    menor = cantidad;

    // Poner la cantidad en la paǵina.
    document.getElementById('cantidadNumeros').textContent = cantidad;

    // Pide los números uno por uno hasta completar la cantidad solicitada por el usuario.
    while (contador < cantidad) {
        const numero = pedirNumero();

        // Poner el número en la paǵina.
        const pNumero = document.createElement('p');
        pNumero.textContent = numero;
        document.getElementById('numerIngresados').appendChild(pNumero);

        // Si el número ingresado es mayor al actual, se guarda como el mayor.
        if (numero > mayor) mayor = numero;

        // Si el número ingresado es menor al actual, se guarda como el mayor.
        if (numero < menor) menor = numero;

        contador++;
    }

    // Muestra el número mayor y menor en la página.
    document.getElementById('numeroMayor').textContent = mayor;
    document.getElementById('numeroMenor').textContent = menor;
})

const pedirCantidad = (invalido = false) => {
    // Aunque no estamos limitados a 1 caracter, se conserva el límite para tener el mismo comportamiento que hicimos en Assembly.
    const textoSolicitaCantidad = !invalido ?
        'Ingrese cantidad de numeros a comparar (1-9):'
        : 'Por favor, ingrese la cantidad de numeros a comparar según lo indicado (1-9):';

    const cantidadString = window.prompt(textoSolicitaCantidad);
    const cantidadNumber = Number(cantidadString)

    /* Vuelve a solicitar la cantidad al usuario si:
     * - La cantidad ingresada no es un número válido.
     * - La cantidad ingresada es menor a 0.
     * - La cantidad ingresada es mayor a 9.
     */
    return !Number.isNaN(cantidadNumber) && cantidadNumber > 0 && cantidadNumber < 10 ? cantidadNumber : pedirCantidad(true)
}

const pedirNumero = (invalido = false) => {
    const textoSolicitaNumero = !invalido ? 'Ingrese un numero:' : 'Ingrese un número válido:';
    const numeroString = window.prompt(textoSolicitaNumero);
    const numeroNumber = Number(numeroString)

    // Vuelve a solicitar el número al usuario si el número ingresado no es un número válido.
    return !Number.isNaN(numeroNumber) ? numeroNumber : pedirNumero(true)
}