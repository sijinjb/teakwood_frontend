import React, { useState, useCallback } from 'react';

const RangeSlider = () => {
  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(7000);
  const min = 100;
  const max = 10000;

  const handleMinChange = useCallback((event) => {
    const value = Math.min(Number(event.target.value), maxValue - 500);
    setMinValue(value);
  }, [maxValue]);

  const handleMaxChange = useCallback((event) => {
    const value = Math.max(Number(event.target.value), minValue + 500);
    setMaxValue(value);
  }, [minValue]);

  // Calculate the percentage positions for the slider range
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = 100 - (((maxValue - min) / (max - min)) * 100);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative max-w-xl w-full">
        {/* Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step="100"
          value={minValue}
          onChange={handleMinChange}
          className="absolute pointer-events-none opacity-0 cursor-pointer w-full h-2 z-20"
        />
        <input
          type="range"
          min={min}
          max={max}
          step="100"
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute pointer-events-none opacity-0 cursor-pointer w-full h-2 z-20"
        />

        {/* Slider Background and Range */}
        <div className="relative z-10 h-2">
          <div className="absolute left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
          <div
            className="absolute top-0 bottom-0 rounded-md bg-teal-600"
            style={{
              left: `${minPercent}%`,
              right: `${maxPercent}%`,
            }}
          ></div>

          {/* Min and Max Handles */}
          <div
            className="absolute w-6 h-6 bg-teal-600 rounded-full"
            style={{ left: `${minPercent}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute bg-black text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1">
              ${minValue}
            </div>
          </div>
          <div
            className="absolute w-6 h-6 bg-teal-600 rounded-full"
            style={{ right: `${maxPercent}%`, transform: 'translateX(50%)' }}
          >
            <div className="absolute bg-black text-white text-xs rounded py-1 px-2 bottom-full right-1/2 transform translate-x-1/2 -translate-y-1">
              ${maxValue}
            </div>
          </div>
        </div>

        {/* Text Inputs */}
        <div className="flex justify-between items-center py-5">
          <input
            type="text"
            value={minValue}
            onChange={(e) => setMinValue(Math.min(Number(e.target.value), maxValue - 500))}
            className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
          />
          <input
            type="text"
            value={maxValue}
            onChange={(e) => setMaxValue(Math.max(Number(e.target.value), minValue + 500))}
            className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
