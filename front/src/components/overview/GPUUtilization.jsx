import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import {motion} from "framer-motion"
import { useEffect, useState } from "react";

const GPUUtilization = () => {
    const [data, setData] = useState([]);
                useEffect(() => {
                  fetch('/output.json')
                    .then((response) => response.json())  
                    .then((jsonData) => {
                      setData(jsonData);  
                    })
                    .catch((error) => {
                      console.error('Error fetching data:', error);
                    });
                }, []);
        return (
            <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
            initial={{ opacity : 0, y:20}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.2}}>
    
            <h2 className="text-xl font-medium mb-4 text-gray-100">GPU Utilization</h2>
            <div className='h-80'>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="time" stroke='#9ca3af'    tickFormatter={(time) => {
                                             // 'time' 값에서 ':' 앞의 숫자만 추출
                                             const timeParts = time.split(' ')[0]; // '2024-11-16 12:30'에서 '12:30' 부분 추출
                                             const hour = timeParts.split('-')[2]; // '12:30'에서 '12'만 추출
                                             return hour; // X축에 '12', '13', '14'와 같은 시간만 표시
                                           }}interval={150}/>
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                    contentStyle={{
                        backgroundColor: "rgba(31,45,55,0.8)",
                        borderColor: "#4B5563",
                    }}
                    itemStyle={{ color: "#E5E7EB" }}
                    />
                    <Legend />
                    <Line
                    type="monotone"
                    dataKey="GPU Utilization"
                    stroke="#82ca9d"
                    dot={false} 
                    />
                </LineChart>
        </ResponsiveContainer>
            </div>
            </motion.div>
        )
}
export default GPUUtilization