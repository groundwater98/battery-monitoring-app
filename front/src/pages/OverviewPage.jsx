import Header from '../components/common/Header';
import StatCard from '../components/common/StatCard';
import { motion } from 'framer-motion';
import { Zap, Thermometer } from 'lucide-react';
import SalesOverviewChart from '../components/overview/SalesOverviewChart.jsx';
import CategoryDistributionChart from '../components/overview/CategoryDistributionChart.jsx';
import CPUUtilization from '../components/overview/CPUUtilization.jsx';
import GPUUtilization from '../components/overview/GPUUtilization.jsx';
import { useState } from 'react';

const OverviewPage = () => {
  const [pluginMessage, setPluginMessage] = useState('');
  
  const handleModeChange = async (mode) => {
    const endpointMap = {
      Work: '/api/work',
      Rest: '/api/rest',
      Sleep: '/api/sleep',
    };

    try {
      const response = await fetch(`http://localhost:5000${endpointMap[mode]}`, {
        method: 'POST',
      });
      const result = await response.json();
      alert(`${mode} Mode Activate !!`);
      console.log(`${mode} Mode: ${result.message}`);
    } catch (error) {
      console.error(`Error activating ${mode} Mode:`, error);
      alert(`Failed to activate ${mode} Mode`);
    }
  };

  const handlePluginClick = (mode) => {
    if (mode === '100') {
      setPluginMessage('Battery Protection Charging Mode Turned Off');
    } else if (mode === 'custom') {
      setPluginMessage('Battery Protection Charging Mode Turned On');
    }
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Header title="Humanized" />
      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        {/* Plugin Message Display */}
        {pluginMessage && (
            <div className="absolute top-2 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
            <p className="text-xl font-bold text-white-400">{pluginMessage}</p>
          </div>
        )}
        <motion.div
          className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Overcharge time" icon={Zap} value={<span className='text-red-600 animate-pulse'>11H 10M</span>} color='#6366F1' />
          <StatCard name="Battery temperature" icon={Thermometer} value={<span className='text-red-600 animate-pulse'>49</span>} color='#EC4899' />
          <div className="flex space-x-3">
            <button
              className="px-5 h-20 rounded-full bg-red-600 hover:bg-red-700 transition duration-200 font-semibold"
              onClick={() => handleModeChange('Work')}
            >
              Work Mode
            </button>
            <button
              className="px-5 h-20 rounded-full bg-yellow-500 hover:bg-yellow-600 transition duration-200 font-semibold"
              onClick={() => handleModeChange('Rest')}
            >
              Rest Mode
            </button>
            <button
              className="px-5 h-20 rounded-full bg-green-600 hover:bg-green-700 transition duration-200 font-semibold"
              onClick={() => handleModeChange('Sleep')}
            >
              Sleep Mode
            </button>
            <button
              className="px-6 h-20 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-200 ease-in-out font-semibold"
              onClick={() => handlePluginClick('100')}
            >
              Plugin 100%
            </button>
            <button
              className="px-6 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:scale-105 transform transition duration-200 ease-in-out font-semibold animate-pulse"
              onClick={() => handlePluginClick('custom')}
            >
              Customized Plugin
            </button>
          </div>
        </motion.div>
        {/* charts */}
        <div className='grid gird-cols-1 lg:grid-cols-2 gap-12'>
          <SalesOverviewChart />
          <CategoryDistributionChart />
          <CPUUtilization />
          <GPUUtilization />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
