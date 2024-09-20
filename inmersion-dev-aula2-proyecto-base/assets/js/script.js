let listaNombresGasto = [];
let listaValorGasto = [];
let listaDescripcionGasto = [];
let posicionModificando = -1;  // Para rastrear si estamos en modo de modificación

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    if (posicionModificando === -1) {
        // Modo agregar
        listaNombresGasto.push(nombreGasto);
        listaValorGasto.push(valorGasto);
        listaDescripcionGasto.push(descripcionGasto);
    } else {
        // Modo modificar
        listaNombresGasto[posicionModificando] = nombreGasto;
        listaValorGasto[posicionModificando] = valorGasto;
        listaDescripcionGasto[posicionModificando] = descripcionGasto;
        posicionModificando = -1; // Resetear la posición
    }

    actualizarListaGasto();
}

function actualizarListaGasto() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGasto.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValorGasto[posicion]);
        const descripcionGasto = listaDescripcionGasto[posicion];
       
        htmlLista += `<li>${elemento} (${descripcionGasto}) - USD ${valorGasto.toFixed(2)}
        <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        <button onclick="modificarGasto(${posicion});">Modificar</button>
        </li>`;

        // Calculamos el total de gasto
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

        // Comprobar si el total supera los $150
        if (totalGastos > 150) {
    alert("¡Advertencia! Estás superando los $150 en gastos.");
}

    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    listaNombresGasto.splice(posicion, 1);
    listaValorGasto.splice(posicion, 1);
    listaDescripcionGasto.splice(posicion, 1);

    actualizarListaGasto();
}

function modificarGasto(posicion) {
    // Cargar los datos del gasto a los campos de entrada
    document.getElementById('nombreGasto').value = listaNombresGasto[posicion];
    document.getElementById('valorGasto').value = listaValorGasto[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionGasto[posicion];

    // Guardar la posición que se está modificando
    posicionModificando = posicion;
}
