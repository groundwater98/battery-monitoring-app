import {motion} from "framer-motion";
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";

const categoryData=[
    {name:"VS code", value:247},
    {name:"Nvcontainer", value:151},
    {name:"Chrome", value:122},
    {name:"Mesedge", value:60},
    {name:"Excel", value:40},
]
const CategoryDistributionChart =() => {
    const COLORS = [ '#6366F1','#EC4899',  '#F59E0B','#A78BFA', '#10B981']; // 예시
    return (
        <motion.div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
        initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}}>
        <h2 className="text-xl font-medium mb-4 text-gray-100">App Usage Ranking</h2>
        <div className='h-80'>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>  
                    <Pie data={categoryData} dataKey="value" cx={"50%"} cy={"50%"} labelLine={false} outerRadius={80} fill='#8884d8' datakey='value' 
                    label={({name, percent}) =>` ${(percent *100).toFixed(1)}%`}>
                    {categoryData.map((entry, index)=> (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "rgba(31,41,55,0.8)", borderColor:"#4B5563"}} itemStyle={{color:"#E5E7EB"}}formatter={(value, name) => [`${value} M`, name]}/>
                    <Legend verticalAlign="bottom" height={28} />    
                </PieChart>  
            </ResponsiveContainer>
        </div>
        </motion.div>
    )
};
export default CategoryDistributionChart;