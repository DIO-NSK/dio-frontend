import {CategoryScale, Chart as ChartJS, LinearScale, ScriptableContext} from 'chart.js/auto'
import {Line} from 'react-chartjs-2'
import Text from "@/components/atoms/text/text-base/Text";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {FiCalendar} from "react-icons/fi";
import {cn} from "@/utlis/cn";
import {Rubik} from "next/font/google";
import {GraphPoint} from "@/app/admin/model";

ChartJS.register(CategoryScale, LinearScale)

const createGradientBg = (context: ScriptableContext<"line">) => {

    const bgColor = ['rgba(54, 159, 233, 0.5)', 'rgba(54, 159, 233, 0)']
    if (!context.chart.chartArea) return
    const {ctx, data, chartArea: {top, bottom}} = context.chart
    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)

    gradientBg.addColorStop(0, bgColor[0])
    gradientBg.addColorStop(1, bgColor[1])

    return gradientBg

}

const rubik = Rubik({subsets: ['latin']})

ChartJS.defaults.font.family = rubik.style.fontFamily
ChartJS.defaults.plugins.legend.display = false

type LineChartProps = {
    graphPoints : GraphPoint[],
    name : string,
    className ?: string
}

const LineChart = (props : LineChartProps) => {
    return (
        <div className={cn("w-full flex flex-col gap-5 p-6 rounded-xl border-2 border-light-gray", props.className)}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <Text text={props.name} className={"text-[20px] font-medium"}/>
                <IconTextButton
                    placement={"right"}
                    icon={<FiCalendar size={"18px"}/>}
                    text={"Выберите период"}
                    onClick={() => console.log("Selected!")}
                    className={"gap-3 text-link-blue hover:text-blue-800"}
                />
            </div>
            <Line
                data={{
                    labels: props.graphPoints.map(item => item.label),
                    datasets: [
                        {
                            fill: true,
                            data: props.graphPoints.map(item => item.value),
                            borderColor: "#369FE9",
                            borderWidth: 3,
                        }
                    ]
                }}
                options={{
                    elements: {
                        point: {
                            radius: 4,
                            backgroundColor: "white",
                        },
                        line: {
                            backgroundColor: createGradientBg
                        }
                    }
                }}
            />
        </div>
    );
};

export default LineChart;
