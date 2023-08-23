<script setup>
    import useClima from '../composables/useClima'

    let { convertirGrados } = useClima()
    defineProps({
        clima: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="resultado">
        <h2>Clima de: {{ clima.name }}</h2>
        <p class="actual">{{ convertirGrados(clima.main.temp) }} <span>&deg;C</span></p>
        <div class="temperaturas">
            <p>Min: {{ convertirGrados(clima.main.temp_min) }} <span>&deg;C</span></p>
            <p>Max: {{ convertirGrados(clima.main.temp_max) }} <span>&deg;C</span></p>
        </div>
    </div>
</template>