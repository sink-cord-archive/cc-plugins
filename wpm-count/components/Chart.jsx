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
import { persist } from "@cumcord/pluginData";
import { findByProps } from "@cumcord/modules/webpack";
import { wpm } from "../dataManager";

const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Header = findByProps("Sizes", "Tags");

export default ({ width, height }) => {
    width = width ?? 400;
    height = height ?? 200;

    const [chart, setChart] = React.useState();
    const [changeScale, setChangeScale] = React.useState(false);

    const chartRef = React.useRef();

    React.useEffect(() => {
        if (changeScale && chart) {
            const type = chart.options.scales.y?.type;
            chart.options.scales.y.type =
                type === "logarithmic" ? "linear" : "logarithmic";
            setChangeScale(false);
            chart.update();
            return;
        }

        if (chart) return;

        setChart(
            new Chart(chartRef.current, {
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
            <div
                style={{
                    display: "flex",
                    gap: ".5rem",
                    "align-items": "center",
                }}
            >
                <Header tag="h2">WPM Chart</Header>
                <Button
                    size={Button.Sizes.TINY}
                    color={Button.Colors.BRAND}
                    look={Button.Looks.OUTLINED}
                    onClick={() => setChangeScale(true)}
                >
                    Toggle log scale
                </Button>
            </div>

            <canvas {...{ width, height }} ref={chartRef} />
        </>
    );
};
