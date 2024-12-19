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
const SalesOverviewChart = () => {
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
      const filteredData = data.filter(item => item.measure !== "0");
      return (
          <motion.div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
          initial={{ opacity : 0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay:0.2}}>
  
          <h2 className="text-xl font-medium mb-4 text-gray-100"> Battery Usage </h2>
          <div className='h-80'>
             {filteredData.length > 0 ? (
                     <ResponsiveContainer width={"100%"} height={"100%"}>
                     <LineChart data={filteredData}>
                       <CartesianGrid strokeDasharray="3 3" stroke='#4B5563' />
                       <XAxis dataKey="time" stroke='#9ca3af'  tickFormatter={(time) => {
                         // 'time' 값에서 ':' 앞의 숫자만 추출
                         const timeParts = time.split(' ')[1]; // '2024-11-16 12:30'에서 '12:30' 부분 추출
                         const hour = timeParts.split(':')[0]; // '12:30'에서 '12'만 추출
                         return hour; // X축에 '12', '13', '14'와 같은 시간만 표시
                       }}/>
                       <YAxis />
                       <Tooltip contentStyle={{backgroundColor: "rgba(31,45,55,0.8)",borderColor:"4B5563"}} itemStyle={{color:"E5E7EB"}}>
                         <Line type="monotone" datakey='sales' stroke ='6366F1' strokeWidth={3} dot={{fill:'#6366F1', strokeWidth:2, r:6}} activateDot={{r:8, strokeWidth:2}} />
                       </Tooltip>
                       <Legend />
                       <Line type="monotone" dataKey="Current battery percentage" stroke="#CE5A9E" activeDot={{ r: 8 }}  dot={false}  />
                       <Line type="monotone" dataKey="prediction" stroke="#87CEEB"  dot={false}   />
                     </LineChart>
                     </ResponsiveContainer>
                     ): (
                         <p>No data to display</p>
                       )}
          </div>
          </motion.div>
      )
}
export default SalesOverviewChart