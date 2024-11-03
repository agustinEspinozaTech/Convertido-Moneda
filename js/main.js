const url = 'https://api.bluelytics.com.ar/v2/latest'
const xhr = new XMLHttpRequest()

const input = document.querySelectorAll('input')
const ingresarMonto = input[0]
const dolarInput = input[1]
const checkBox = input[2]
const divFecha = document.querySelectorAll('div')[1]
const div = document.querySelectorAll('div')[2]


let controlarTiempo

ingresarMonto.addEventListener('input', conversionMoneda)
dolarInput.addEventListener('input', conversionMoneda)

function conversionMoneda() {
    const monto = ingresarMonto.value
    const dolarBlue = dolarInput.value
    const resultado = monto / dolarBlue
    const resultadoDecimales = parseFloat(resultado.toFixed(2))

    div.textContent = `Valor convertido USD ${resultadoDecimales}`
}


checkBox.addEventListener('change', function () {
    if (checkBox.checked) {

        controlarTiempo = setInterval(function () {
            xhr.open("GET", url, true);

            xhr.send()

            // formato de la fecha
            const fecha = new Date()
            const dia = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate()
            const mes = fecha.getMonth() + 1
            const año = fecha.getFullYear()
            const horas = fecha.getHours()
            const minutos = fecha.getMinutes()
            const segundos = fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds()

            const fechaHora = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`

            divFecha.textContent = fechaHora

        }, 2000)
    } else {
        divFecha.textContent = ''
        clearInterval(controlarTiempo)
    }
})

xhr.open("get", url, true)
xhr.onload = function () {
    if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText)
        const dolarBlue = data.blue.value_sell
        dolarInput.value = dolarBlue
        conversionMoneda()
        console.log(dolarBlue);

    } else {
        console.error("Error en la solicitud. Código de estado:", xhr.status)
    }
}

//zona de envio
xhr.send()
console.log(xhr);
