
import { option } from "./option.js"
const url = 'https://parallelum.com.br/fipe/api/v1'

//valores iniciales
const initialvalues = {
    typeVehicle: '',
    brand: '',
    model: '',
    year:''
}

    const typevehicle = document.getElementById("typeVehicle")
    const brand = document.getElementById('brand')
    const brandLabel = document.getElementById('brand-label')
    const modelo = document.getElementById('model')
    const modeloLabel = document.getElementById('model-label')
    const year = document.getElementById('year')
    const yearLabel = document.getElementById('year-label')
    const button = document.getElementById('button')
    const formVehicle = document.getElementById('formVehicle')
    const mostrarAvaluo = document.getElementById('mostrarAvaluo')
    const divisas = document.getElementById('divisas')
    const seccionInfo = document.getElementById('seccionInfo')
    const mostrarDivisas = document.getElementById('mostrarDivisas')
    const reset = document.getElementById('reset')
    const resetButton = document.getElementById('reset-button')
    let valorImpuesto = ''
    let valorCut = ''

    

    typevehicle.addEventListener('change', async(e)=>{
    const vehicle = e.target.value
    initialvalues.typeVehicle = vehicle
    const vehiclesb = await fetch(`${url}/${initialvalues.typeVehicle}/marcas`)
    .then(data => data.json())
    brand.classList.remove('hidden')
    brandLabel.classList.remove('hidden')
    reset.classList.remove('hidden')
    option(brand, vehiclesb)
  })
  //Escucha de que seleccionen la marca
  brand.addEventListener('change', async(e)=>{
    initialvalues.brand = e.target.value
    const models = await fetch(`${url}/${initialvalues.typeVehicle}/marcas/${initialvalues.brand}/modelos`)
    .then(data => data.json())
    modelo.classList.remove('hidden')
    modeloLabel.classList.remove('hidden')
    option(modelo, models.modelos)
})

modelo.addEventListener('change', async(e)=>{
    initialvalues.model = e.target.value
    const yearData = await fetch(`${url}/${initialvalues.typeVehicle}/marcas/${initialvalues.brand}/modelos/${initialvalues.model}/anos`)
    .then(data => data.json())
    year.classList.remove('hidden')
    yearLabel.classList.remove('hidden')
    option(year, yearData)
    
})


 year.addEventListener('change', async(e)=>{
     initialvalues.year = e.target.value
     button.classList.remove('hidden')

 })
formVehicle.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const total = await fetch(`${url}/${initialvalues.typeVehicle}/marcas/${initialvalues.brand}/modelos/${initialvalues.model}/anos/${initialvalues.year}`)
    .then(data => data.json())
    valorCut = total.Valor.slice(3)
    
    
    if(total.Combustivel === 'Gasolina'){
        valorImpuesto = 5 * (parseFloat(valorCut) / 100)
    }else if(total.Combustivel === 'Diesel'){
        valorImpuesto = 2.5 * (parseFloat(valorCut) / 100)
    }else if(total.Combustivel === 'Diesel'){
        valorImpuesto = 1 * (parseFloat(valorCut) / 100)
    }else{
        valorImpuesto = valorCut
    }

    mostrarAvaluo.classList.remove('hidden')
    seccionInfo.classList.remove('hidden')
    mostrarAvaluo.innerHTML = `<P><stong>Marca:</stong> ${total.Marca}</P>
    <p> <stong> Modelo:</stong> ${total.Modelo}</p>
    <p> <stong> Combustible:</stong> ${total.Combustivel}</p>
    <p> <stong> Valor:</stong> ${total.Valor}</p>
    <p> <stong> Impuestos:</stong> ${valorImpuesto}</p>
    `
    
})

mostrarDivisas.addEventListener('click', async ()=>{
    const DivisasData = await fetch(`https://api.currencyapi.com/v3/latest?apikey=wGxjoch3kodfb1tdwXu5mT3eTUIALlvRSdYtQZzT&currencies=COP%2CBRL&base_currency=BRL`)
    .then(data => data.json())
    divisas.classList.remove('hidden')
    const result = (DivisasData.data.COP.value * parseFloat(valorCut)).toFixed(4)
    const resultimp = (DivisasData.data.COP.value * valorImpuesto).toFixed(4)

    //convertimos las monedas en cop antes de mapearlas
    const copResult =  Intl.NumberFormat( {  currency: 'COP' }).format(result)
    const copResultimp =  Intl.NumberFormat({  currency: 'COP' }).format(resultimp)
    divisas.innerHTML = `<h3 class='center'>Valores en Cop</h3>
    <p><stong>Pesos :</stong> ${copResult} COP</p>
    <p><stong>Impuestos :</stong> ${copResultimp} COP</p>`
})

//Reset all
resetButton.addEventListener('click', ()=>{
    
    initialvalues.typeVehicle = ''
    initialvalues.brand = ''
    initialvalues.brand = ''
    initialvalues.model = ''
    initialvalues.year = ''
    brand.classList.add('hidden')
    brandLabel.classList.add('hidden')
    modelo.classList.add('hidden')
    modeloLabel.classList.add('hidden')
    year.classList.add('hidden')
    yearLabel.classList.add('hidden')
    divisas.classList.add('hidden')
    mostrarAvaluo.classList.add('hidden')
    seccionInfo.classList.add('hidden')
    button.classList.add('hidden')

})