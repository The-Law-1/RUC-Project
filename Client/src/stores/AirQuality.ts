import { defineStore } from "pinia";
import type { QualityTimestamp } from "@/types/QualityTimestamp";

export const useAirQualityStore = defineStore("airQuality", () => {
    const backendPath = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    async function getAirQuality(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/all`;

        console.log(path);

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
        // return await response.json();
    }

    async function getCO2(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/co2`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
    }

    async function getGas(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/gas`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
    }

    async function getHumidity(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/humidity`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
    }

    async function getIaq(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/iaq`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
    }

    async function getPressure(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/pressure`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
    }

    async function getTemperature(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/temperature`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // keep only last 24 hours?

        const data = await response.json();

        // get last 24 hours
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);
        // keep only data from last 24 hours
        const filteredData = data.filter((d: QualityTimestamp) => {
            const date = new Date(d.time);
            return date > last24Hours;
        });

        return filteredData;
    }




    return {
        getAirQuality,
        getCO2,
        getGas,
        getHumidity,
        getIaq,
        getPressure,
        getTemperature,
    }
});
