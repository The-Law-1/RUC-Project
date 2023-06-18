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

        console.log(await response.text());

        return [];
        // return await response.json();
    }

    return {
        getAirQuality,
    }
});
