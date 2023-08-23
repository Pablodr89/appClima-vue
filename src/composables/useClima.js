import { ref, computed } from 'vue'
import axios from 'axios'
export default function useClima() {

    let clima = ref({})
    let error = ref('')
    let cargando = ref(false)

    let obtenerClima = async({ciudad, pais}) => {
        //Importar la apikey
        let key = import.meta.env.VITE_API_KEY
        clima.value = {}
        cargando.value = true
        error.value = ''
        //Obtener latitud y longitud
        try {
            let url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${key}`
            let { data } = await axios(url)

            let { lat, lon } = data[0]

            let urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

            let { data: result } = await axios(urlClima)
            clima.value = result
        } catch {
            error.value = 'Ciudad no encontrada'
        } finally {
            cargando.value = false
        }
    }

    //Obtener clima
    let mostrarClima = computed(() => {
        return Object.values(clima.value).length > 0
    })

    //Convertir grados farenheit a celsius
    let convertirGrados = (temp) => parseInt(temp - 273.15)

    return {
        obtenerClima,
        clima,
        mostrarClima,
        convertirGrados,
        cargando, 
        error
    }
}