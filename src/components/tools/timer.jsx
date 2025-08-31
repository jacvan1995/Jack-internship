import { useState, useEffect } from "react";

const getCountdown = (endTime) => {
  if (typeof endTime !== "number" || isNaN(endTime)) return "Expired";

  const now = Date.now();
  const diff = endTime - now;
  if (diff <= 0) return "Expired";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const pad = (n) => String(n).padStart(2, "0")
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
};

const CountdownTimer = ({ expiryDate }) => {
    const isValidTimeStamp = typeof expiryDate === "number" && !isNaN(expiryDate)

  const [timeLeft, setTimeLeft] = useState(() =>
    isValidTimeStamp ? getCountdown(expiryDate): "expired")

  useEffect(() => {
    if (!isValidTimeStamp) {
      setTimeLeft("Expired");
      return;
    }

    const updateCountdown = () => {
      const countdown = getCountdown(expiryDate);
      setTimeLeft(countdown)
    };

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
  
};
export default CountdownTimer;