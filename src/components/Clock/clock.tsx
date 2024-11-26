import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const secondsDegrees = (time.getSeconds() / 60) * 360;
  const minutesDegrees = (time.getMinutes() / 60) * 360;
  const hoursDegrees = ((time.getHours() % 12) / 12) * 360;

  return (
    <div
    className="relative  w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full bg-white border-[8px] border-indigo-300 shadow-md"
  >
    {/* Clock Numbers */}
    {[...Array(12)].map((_, i) => {
      const angle = ((i + 1) * 30 * Math.PI) / 180 - Math.PI / 2;
      const x = 50 + 42 * Math.cos(angle);  
      const y = 50 + 42 * Math.sin(angle);
      return (
        <div
          key={i}
          className=" absolute text-sm md:text-base font-semibold text-indigo-800"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {i + 1}
        </div>
      );
    })}
  
    {/* Clock Hands */}
    <div
      className="absolute w-1 h-[25%] bg-gray-800 rounded-full top-[25%] left-1/2 origin-bottom transform -translate-x-1/2"
      style={{
        transform: `translateX(-50%) rotate(${hoursDegrees}deg)`,
      }}
    />
    <div
      className="absolute w-1 h-[35%] bg-gray-800 rounded-full top-[15%] left-1/2 origin-bottom transform -translate-x-1/2"
      style={{
        transform: `translateX(-50%) rotate(${minutesDegrees}deg)`,
      }}
    />
    <div
      className="absolute w-0.5 h-[40%] bg-red-500 rounded-full top-[10%] left-1/2 origin-bottom transform -translate-x-1/2"
      style={{
        transform: `translateX(-50%) rotate(${secondsDegrees}deg)`,
      }}
    />
  </div>
  );
}