
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const labels = [
    'January', 'Febuary', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

const old_year_data = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 3564, 3200, 3854, 4100, 4153];
const current_year_data = [2400, 1398, 9800, 3908, 4800, 3800, 4300, 4560, 4600, 0, 0, 0];

const DashboardChart = (props) => {

    const current_year = props.year;

    const data = labels.map((item, index) => {
        return {
            name: item,
            [current_year - 1]: old_year_data[index],
            [current_year]: current_year_data[index]
        }
    })

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="2022" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="2023" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default DashboardChart;