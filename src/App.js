/** App.js */
import {useState} from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./components/Legend";
import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import portfolio from "./PORTFOLIO.json";
import "./index.css";

const portfolioData = {
    name: "Portfolio",
    color: "#ffffff",
    items: portfolio.map((d) => ({ ...d, date: new Date(d.date) }))
};
const schcData = {
    name: "SCHC",
    color: "#d53e4f",
    items: schc.map((d) => ({ ...d, date: new Date(d.date) }))
};
const vcitData = {
    name: "VCIT",
    color: "#5e4fa2",
    items: vcit.map((d) => ({ ...d, date: new Date(d.date) }))
};

export default function App() {
    const [selectedItems, setSelectedItems] = useState([]);
    const legendData = [portfolioData, schcData, vcitData];
    const chartData = [
        portfolioData,
        ...[schcData, vcitData].filter((d) => selectedItems.includes(d.name))
    ];
    const onChangeSelection = (name) => {
        const newSelectedItems = selectedItems.includes(name)
            ? selectedItems.filter((item) => item !== name)
            : [...selectedItems, name];
        setSelectedItems(newSelectedItems);
    };

    return (
        <div className="App">
            <Legend
                data={legendData}
                selectedItems={selectedItems}
                onChange={onChangeSelection}
            />
            <MultilineChart data={chartData} />
        </div>
    );
}
