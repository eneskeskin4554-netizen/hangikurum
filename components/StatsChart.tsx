
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Broker } from '../types';

interface StatsChartProps {
  brokers: Broker[];
}

const StatsChart: React.FC<StatsChartProps> = ({ brokers }) => {
  // Sort brokers by commission (using Share commission as default) for better visualization
  const data = [...brokers]
    .sort((a, b) => a.commissionRate.share - b.commissionRate.share)
    .map(b => ({
      name: b.name.split(' ')[0], // Short name for axis
      fullName: b.name, // Full name for tooltip
      komisyon: b.commissionRate.share,
      color: b.logoColor.replace('bg-', '') 
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-lg z-50">
          <p className="text-xs font-bold text-slate-800">{payload[0].payload.fullName}</p>
          <p className="text-sm text-blue-600">
            Hisse: Onbinde {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#64748b' }} 
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#64748b' }} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9'}} />
          <Bar dataKey="komisyon" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
