"use client";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ChartResult({ data }: any) {

    return <div >
        <BarChart width={100} height={430} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="total" >
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.barColor} />)}
            </Bar> */}
        </BarChart>
    </div>
}