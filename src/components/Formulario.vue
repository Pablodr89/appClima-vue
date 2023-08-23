<script setup>
    import { ref, reactive } from 'vue'
    import Alerta from './Alerta.vue'

    let busqueda = reactive ({
        ciudad: '',
        pais: ''
    })

    let paises = [
        { codigo: 'US', nombre: 'Estados Unidos' },
        { codigo: 'MX', nombre: 'México' },
        { codigo: 'AR', nombre: 'Argentina' },
        { codigo: 'CO', nombre: 'Colombia' },
        { codigo: 'CR', nombre: 'Costa Rica' },
        { codigo: 'ES', nombre: 'España' },
        { codigo: 'PE', nombre: 'Perú' }
    ]

    let error = ref('')

    let emit = defineEmits(['obtener-clima'])

    let consultarClima = () => {
        if(Object.values(busqueda).includes('')) {
            error.value = 'Todos los campos son obligatorios'
            setTimeout(() => {
                error.value = ''
            },3000)
            return
        }

        emit('obtenerClima', busqueda)
    }
</script>

<template>
    <form class="formulario" @submit.prevent="consultarClima">
        <Alerta v-if="error">{{ error }}</Alerta>

        <div class="campo">
            <label for="ciudad">Ciudad</label>
            <input type="text" id="ciudad" placeholder="Ciudad" v-model="busqueda.ciudad">
        </div>
        <div class="campo">
            <label for="pais">Pais</label>
            <select id="pais" v-model="busqueda.pais">
                <option value="">-- Seleciona --</option>
                <option v-for="pais in paises" :value="pais.codigo">{{ pais.nombre }}</option>
            </select>
        </div>
        <input type="submit" value="Consultar clima">
    </form>
</template>