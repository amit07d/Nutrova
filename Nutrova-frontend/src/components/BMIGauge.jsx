import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#e74c3c', '#f1c40f', '#2ecc71', '#e67e22'];
const bmiRanges = [
  { name: 'Underweight', value: 18.5 },
  { name: 'Normal', value: 6.5 },
  { name: 'Overweight', value: 5 },
  { name: 'Obesity', value: 10 },
];

function BMIGauge({ bmi }) {
  let arrowRotation = 0;
  if (bmi <= 18.5) arrowRotation = -60;
  else if (bmi <= 25) arrowRotation = -10;
  else if (bmi <= 30) arrowRotation = 30;
  else arrowRotation = 70;

  return (
    <div className="relative flex flex-col items-center">
      <PieChart width={300} height={150}>
        <Pie
          data={bmiRanges}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          cx="50%"
          cy="100%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
        >
          {bmiRanges.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      <div
        className="absolute top-[60px] left-1/2 origin-bottom"
        style={{ 
          transform: `translateX(-50%) rotate(${arrowRotation}deg)`, 
          height: '70px',
          transition: 'transform 0.5s ease'
        }}
        
      >
        <div className="w-1 h-16 bg-black"></div>
      </div>

      <div className="mt-4 text-2xl font-bold">
        BMI = {bmi.toFixed(1)}
      </div>

<div className="flex justify-between w-full mt-4 px-6 text-xs font-semibold">
  <div className="flex flex-col items-center">
    <div className="w-3 h-3 bg-[#e74c3c] rounded-full mb-1" />
    <span>Underweight</span>
  </div>
  <div className="flex flex-col items-center">
    <div className="w-3 h-3 bg-[#f1c40f] rounded-full mb-1" />
    <span>Normal</span>
  </div>
  <div className="flex flex-col items-center">
    <div className="w-3 h-3 bg-[#2ecc71] rounded-full mb-1" />
    <span>Overweight</span>
  </div>
  <div className="flex flex-col items-center">
    <div className="w-3 h-3 bg-[#e67e22] rounded-full mb-1" />
    <span>Obesity</span>
  </div>
</div>

    </div>
  );
}

export default BMIGauge;
