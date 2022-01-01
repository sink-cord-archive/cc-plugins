import {
    Chart,
    LineElement,
    PointElement,
    LineController,
    LinearScale,
    LogarithmicScale,
    TimeScale,
    Tooltip,
    Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(
    LineElement,
    PointElement,
    LineController,
    LinearScale,
    LogarithmicScale,
    TimeScale,
    Tooltip,
    Filler
);

import { v4 as uuidv4 } from "@cumcord/modules/common/uuid";
import { useEffect } from "react";
import { persist } from "@cumcord/pluginData";
import { wpm } from "../dataManager";

export default ({ width, height }) => {
    width = width ?? 400;
    height = height ?? 200;

    const [chartId] = React.useState(uuidv4());
    const [chart, setChart] = React.useState();
    const [changeScale, setChangeScale] = React.useState(false);
    const id = "ysink_wpm_chart_" + chartId;

    useEffect(() => {
        if (changeScale && chart) {
            const type = chart.options.scales.y?.type;
            chart.options.scales.y.type =
                type === "logarithmic" ? "linear" : "logarithmic";
            setChangeScale(false);
            chart.update();
            return;
        }

        if (chart) return;

        const ctx = document.getElementById(id).getContext("2d");
        setChart(
            new Chart(ctx, {
                type: "line",
                data: {
                    //labels: Array.from(persist.ghost.datapoints.keys()),
                    datasets: [
                        {
                            label: "WPM",
                            data: Array.from(
                                persist.ghost.datapoints.values()
                            ).map((p) => ({
                                x: _.last(p),
                                y: wpm(p),
                            })),
                            // original blurple
                            borderColor: "rgba(114,137,218,1)",
                            tension: 0.3,
                            spanGaps: true,
                            // same as border, but less opaque
                            backgroundColor: "rgba(114,137,218,.1)",
                            fill: true,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: "time",
                        },
                    },
                },
            })
        );
    });

    return (
        <>
            <button onClick={() => setChangeScale(true)}>
                Toggle log scale
            </button>
            <canvas {...{ id, width, height }} />
        </>
    );
};
