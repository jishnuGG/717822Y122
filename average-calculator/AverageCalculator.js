import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URLS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand",
};

const WINDOW_SIZE = 10;

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState([]);
  const [prevNumbers, setPrevNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [selectedType, setSelectedType] = useState("p"); // Default to prime

  const fetchNumbers = async () => {
    try {
      const startTime = performance.now();
      const response = await axios.get(API_URLS[selectedType], { timeout: 500 });
      const endTime = performance.now();

      if (endTime - startTime > 500) {
        console.log("Request took too long, ignoring response.");
        return;
      }

      if (response.data && response.data.numbers) {
        const newNumbers = response.data.numbers.filter(
          (num) => !numbers.includes(num) 
        );

        setPrevNumbers([...numbers]); 

        let updatedNumbers = [...numbers, ...newNumbers].slice(-WINDOW_SIZE); 

        setNumbers(updatedNumbers);
        setAverage(
          updatedNumbers.reduce((sum, num) => sum + num, 0) / updatedNumbers.length
        );
      }
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, [selectedType]); 

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Average Calculator Microservice</h2>
      <select onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="p">Prime Numbers</option>
        <option value="f">Fibonacci Numbers</option>
        <option value="e">Even Numbers</option>
        <option value="r">Random Numbers</option>
      </select>
      <button onClick={fetchNumbers} style={{ marginLeft: "10px" }}>Fetch Numbers</button>

      <div style={{ marginTop: "20px" }}>
        <h4>Previous Window:</h4>
        <p>{JSON.stringify(prevNumbers)}</p>

        <h4>Current Window:</h4>
        <p>{JSON.stringify(numbers)}</p>

        <h4>Average:</h4>
        <p>{average.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AverageCalculator;