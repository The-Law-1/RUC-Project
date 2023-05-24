<template>
    <div class="text-3xl">
        Air Quality
    </div>


    <div class="mt-12 text-2xl">
        Your air quality score:
        <div>
            <!-- Score -->
        </div>
        <hr/>
    </div>
    <div class="grid grid-cols-2 space-y-10 ">
        <div>
            <div class=" text-2xl">
                CO2
            </div>
            <!-- Graphique CO2 -->
            <div class="w-full">
                  <Bar
                        id="CO2-chart"
                        :options="{
                            responsive: true
                        }"
                        :data="CO2Data"
                    />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Temperature
            </div>
            <!-- Graphique Temperature -->
        </div>

        <div>
            <div class=" text-2xl">
                Humidity
            </div>
            <!-- Graphique Humidity -->
        </div>

        <div>
            <div class=" text-2xl">
                Pressure
            </div>
            <!-- Graphique Pressure -->
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import type { QualityTimestamp } from "@/types/QualityTimestamp";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

var dummyCO2Values = ref([] as QualityTimestamp[]);

var minutesInterval = 10;

// fill array with dummy values, taken every *minutesInterval* minutes
for (let i = 0; i < 24 * 60; i += minutesInterval) {
    dummyCO2Values.value.push({
        // midnight of may 1st + minute values i
        date: new Date(2023, 5, 1, 0, i),
        value: Math.floor(Math.random() * 100)
    });
}

// extract a labels array and datasets array
const labels = dummyCO2Values.value.map((value) => value.date.toLocaleTimeString());
// array of colours from values, red if value is < 25 or > 75, green if not
const colors = dummyCO2Values.value.map((value) => value.value < 25 || value.value > 75 ? '#f87979' : '#41b883');
const datasets = [
    {
        label: 'CO2',
        data: dummyCO2Values.value.map((value) => value.value),
        backgroundColor: colors
    }
];

const CO2Data = ref({
    labels,
    datasets,
});

export default defineComponent({
  name: 'AirQualityPage',
  components: { Bar },
    setup() {
        return {
        dummyCO2Values,
        CO2Data
        }
    }
});


</script>