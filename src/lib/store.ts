import { readable } from "svelte/store";
import { filterByDateRange } from "./commonVariables";

export const ordersOneMonth = readable("Hello, I work.", function start() {
    const interval = setInterval(() => {
        ordersOneMonth.set((n) => n == "Hello" ? "Hello, I work." : "Hello")
    }, 1000);
    
    return function stop() {
        clearInterval(interval)
    };
});