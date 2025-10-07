import React, { useState, useEffect } from "react";

export default function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000); 
    return () => clearInterval(timer);
  }, []);

  
  const options = { 
    day: "numeric",
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return (
    <div className="date-time">
      {now.toLocaleString("en-US", options)}
    </div>
  );
}
