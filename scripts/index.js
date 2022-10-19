
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


    typevehicle.addEventListener('change', async(e)=>{
    const vehicle = e.target.value
    initialvalues.typeVehicle = vehicle
    const vehiclesb = await fetch(`${url}/${initialvalues.typeVehicle}/marcas`)
    .then(data => data.json())
    brand.classList.remove('hidden')
    brandLabel.classList.remove('hidden')
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
    const total = await fetch(`${url}/${initialvalues.typeVehicle}/marcas/${initialvalues.brand}/modelos/${initialvalues.model}/anos/${initialvalues.year}`).then(data => data.json())
    mostrarAvaluo.classList.remove('hidden')
    mostrarAvaluo.innerHTML = `<P>Marca: ${total.Marca}</P>
    <p>Modelo: ${total.Modelo}</p>
    <p>Combustible: ${total.Combustivel}</p>
        <p>Valor: ${total.Valor}</p>
        <p>Impuestos:${total.Marca}</p>
        <button>Converti a pesos</button>
        <div class="hidden">
        <p>Pesos COP:</p>
        <p>Impuestos COP:</p>
        </div>
    `
})


/* const changeVehicle = async() =>{
    const vehicle = typevehicle.value
    initialvalues.typeVehicle = vehicle
    console.log(vehicle);
    const vehiclesb =await fetch(`${url}/${vehicle.type}/marcas`)
    .then(data => data.json())
    createbrandlist(vehiclesb)
} */
