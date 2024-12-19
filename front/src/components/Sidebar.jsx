import {BarChart2,Menu,Settings} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from 'lucide-react';
const SIDEBAR_ITEMS =[
    {name:"Humanized", icon:BarChart2, color:"#6366f1", href:"/"},
    {name:"Settings", icon:Settings, color:"#6EE7B7", href:"/settings"},
];
const Sidebar =() =>{
    const [isSidebarOpen, setIsSidebarOpen]=useState(true);
    return (
        <motion.div 
        className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
            isSidebarOpen ? 'w-64':'w-20'}`}
            animate={{width:isSidebarOpen ? 256:80}}>
        <div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
            <motion.button
                whileHover={{scale:1.1}}
                whileTop={{scale:0.9}}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'>
                <Menu size={24} />           
            </motion.button>
            <nav className='mt-8 flex-grow'>
            {isSidebarOpen  && (
            <div className='flex items-center p-4 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                <span className='bg-amber-300  text-black text-lg w-60 rounded-lg p-4 ml-2 '>
                <User size={40} className="mr-3 text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-all duration-300" />
                    Computer Engineering
                    <br />
                    <span className='text-sm text-gray-700'>Hong Kildong</span>
                </span>
            </div>
            )}
            <br />
            {SIDEBAR_ITEMS.map((item, index)=>(
                <Link key={item.href} to ={item.href}>
                    <motion.div className='flex items-center p-4 text-lg font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
                            <item.icon size={20} style={{color:item.color, minWidth:"20px"}}/>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span className='ml-4 whitespace-nowrap' initial={{opacity:0, width:0}} animate={{opacity:1, width:"auto"}} exit={{opacity:0, width:0}} transition={{duration:0.2, delay:0.3}}>
                                    {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                    </motion.div>
                </Link>
            ))}

            </nav>
        </div>
        </motion.div>
    );
};
export default Sidebar;