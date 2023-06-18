<template>
    <div class="text-3xl">
        Air Quality
    </div>


    <div class="mt-12 text-2xl">
        Your air quality score:
        <div v-if="iaqDataValues && iaqDataValues.length > 0" class="underline">
            <!-- Score -->
            {{ iaqDataValues[iaqDataValues.length - 1]["value"] }}
        </div>
        <hr/>
    </div>

    <div class="text-2xl">
        The current outdoor temperature is:
        <span class=" underline">
            {{ weather }} C°
        </span>
        <div v-if="weather > tempData.datasets[0].data[tempData.datasets[0].data.length - 1]">
            The outside temperature is warmer than indoors,<br/> close your windows to cool down your room.
        </div>
        <div v-else>
            The indoor temperature is warmer than outdoors,<br/> open your windows to cool down your room.
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
            <div class="w-full">
                <Bar
                    id="Temp-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="tempData"
                />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Humidity
            </div>
            <!-- Graphique Humidity -->
            <div class="w-full">
                <Bar
                    id="Humidity-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="humidityData"
                />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Pressure
            </div>
            <!-- Graphique Pressure -->
            <div class="w-full">
                <Bar
                    id="Pressure-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="pressureData"
                />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Gas
            </div>
            <!-- Graphique Pressure -->
            <div class="w-full" v-if="gasData !== undefined">
                <Bar
                    id="Gas-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="gasData"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import type { QualityTimestamp } from "@/types/QualityTimestamp";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import sample_temp from "@/sample_data/temp.json";
import sample_co2 from "@/sample_data/co2.json";
import sample_humidity from "@/sample_data/humidity.json";
import sample_pressure from "@/sample_data/pressure.json";
import sample_iaq from "@/sample_data/iaq.json";
import { useWeatherStore } from '@/stores/weather';
import { useAirQualityStore } from '@/stores/AirQuality';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

var dummyCO2Values = ref([] as QualityTimestamp[]);
var dummyTempValues = ref([] as QualityTimestamp[]);
var dummyHumidityValues = ref([] as QualityTimestamp[]);
var dummyPressureValues = ref([] as QualityTimestamp[]);

var weatherStore = null;
var airQualityStore = null;

let weather = ref(0);

var dummyIAQValues = ref([] as QualityTimestamp[]);
dummyIAQValues.value = JSON.parse(JSON.stringify(sample_iaq));
dummyIAQValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyTempValues.value = JSON.parse(JSON.stringify(sample_temp));
dummyTempValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyCO2Values.value = JSON.parse(JSON.stringify(sample_co2));
dummyCO2Values.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyHumidityValues.value = JSON.parse(JSON.stringify(sample_humidity));
dummyHumidityValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyPressureValues.value = JSON.parse(JSON.stringify(sample_pressure));
dummyPressureValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});


const getChartData = (valuesArray: QualityTimestamp[], chartLabel:string, lowRange: number, highRange: number, lowColor: string, highColor: string) => {
    const labels = valuesArray.map((value) => value.time.toLocaleTimeString());
    // array of colours from values, red if value is < 25 or > 75, green if not

    const colors = valuesArray.map((value) => {
        if (value.value < lowRange) {
            return lowColor;
        } else if (value.value > highRange) {
            return highColor;
        } else {
            // return green by default
            return '#41b883';
        }
    });

    const datasets = [
        {
            label: chartLabel,
            data: valuesArray.map((value) => value.value),
            backgroundColor: colors
        }
    ];

    return {
        labels,
        datasets,
    }
}

var CO2Data = ref(getChartData(dummyCO2Values.value, 'CO2', 0, 1000, '#f87979', '#f87979'));
var tempData = ref(getChartData(dummyTempValues.value, 'Temperature', 12, 30, '#f87979', '#f87979'));
var humidityData = ref(getChartData(dummyHumidityValues.value, 'Humidity', 30, 60, '#f87979', '#f87979'));
var pressureData = ref(getChartData(dummyPressureValues.value, 'Pressure', 0, 10000, '#f87979', '#f87979'));

var gasData = ref();

var iaqDataValues = ref([] as QualityTimestamp[]);

console.log(tempData.value);

export default defineComponent({
  name: 'AirQualityPage',
  components: { Bar },
    setup() {
        return {
        dummyCO2Values,
        CO2Data,
        tempData,
        humidityData,
        pressureData,
        iaqDataValues,

        gasData,
        dummyIAQValues,

        weatherStore,
        weather,
        }
    },
    async mounted() {
        weatherStore = useWeatherStore();
        // weather.value = await weatherStore.getCurrentTemperature();
        weather.value = await weatherStore.getCurrentTemperature();

        airQualityStore = useAirQualityStore();

        // ici appeler le store pour récupérer les données individuelles
        let cO2DataValues = await airQualityStore.getCO2();
        let gasDataValues = await airQualityStore.getGas();
        let humidityDataValues = await airQualityStore.getHumidity();
        iaqDataValues.value = await airQualityStore.getIaq();

        console.log(iaqDataValues.value);

        let pressureDataValues = await airQualityStore.getPressure();
        let tempDataValues = await airQualityStore.getTemperature();

        cO2DataValues.map((value) => {
            value.time = new Date(value.time);
            return value;
        });

        gasDataValues.map((value) => {
            value.time = new Date(value.time);
            return value;
        });

        humidityDataValues.map((value) => {
            value.time = new Date(value.time);
            return value;
        });

        pressureDataValues.map((value) => {
            value.time = new Date(value.time);
            return value;
        });

        tempDataValues.map((value) => {
            value.time = new Date(value.time);
            return value;
        });

        CO2Data.value = getChartData(cO2DataValues, 'CO2', 0, 1000, '#f87979', '#f87979');
        gasData.value = getChartData(gasDataValues, 'gas', 0, 1000, '#f87979', '#f87979');
        humidityData.value = getChartData(humidityDataValues, 'Humidity', 30, 60, '#f87979', '#f87979');
        pressureData.value = getChartData(pressureDataValues, 'Pressure', 0, 10000, '#f87979', '#f87979');
        tempData.value = getChartData(tempDataValues, 'Temperature', 12, 30, '#f87979', '#f87979');

        console.log(gasData.value);
    },
});


</script>