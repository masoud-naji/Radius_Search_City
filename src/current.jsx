import { useState, useEffect } from "react";

export default function GetCurrentLocation() {
  const [result, setResult] = useState({ curlat: 0, curlng: 0, message: "" });

  useEffect(() => {
    if (!navigator.geolocation) {
      const message = "Your browser doesn't support Geolocation";
      setResult((currentstate) => ({ ...currentstate, message }));
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const curlat = position.coords.latitude;
      const curlng = position.coords.longitude;
      setResult((currentstate) => ({ ...currentstate, curlat, curlng }));
    });
  }, []);
  return result;
}
