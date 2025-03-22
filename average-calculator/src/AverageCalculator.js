import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Dropdown, Button, Segment, Header, List, Statistic } from "semantic-ui-react";
import reportWebVitals from "./reportWebVitals";
const API_URLS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand",
};

const WINDOW_SIZE = 10;

const options = [
  { key: "p", value: "p", text: "Prime Numbers" },
  { key: "f", value: "f", text: "Fibonacci Numbers" },
  { key: "e", value: "e", text: "Even Numbers" },
  { key: "r", value: "r", text: "Random Numbers" },
];

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState([]);
  const [prevNumbers, setPrevNumbers] = useState([]);
  const [average, setAverage] = useState(0);
  const [selectedType, setSelectedType] = useState("p");

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
        const newNumbers = response.data.numbers.filter((num) => !numbers.includes(num));

        setPrevNumbers([...numbers]);

        let updatedNumbers = [...numbers, ...newNumbers].slice(-WINDOW_SIZE);

        setNumbers(updatedNumbers);
        setAverage(updatedNumbers.reduce((sum, num) => sum + num, 0) / updatedNumbers.length);
      }
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, [selectedType]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <Segment padded>
        <Header as="h2" textAlign="center" color="blue">
          Average Calculator Microservice
        </Header>

        <Dropdown
          selection
          options={options}
          value={selectedType}
          onChange={(e, { value }) => setSelectedType(value)}
          style={{ marginBottom: "10px" }}
        />
        <Button primary onClick={fetchNumbers}>
          Fetch Numbers
        </Button>

        <Segment>
          <Header as="h4" color="grey">Previous Window</Header>
          <List horizontal>
            {prevNumbers.map((num, index) => (
              <List.Item key={index}>
                <List.Content>{num}</List.Content>
              </List.Item>
            ))}
          </List>

          <Header as="h4" color="grey">Current Window</Header>
          <List horizontal>
            {numbers.map((num, index) => (
              <List.Item key={index}>
                <List.Content>{num}</List.Content>
              </List.Item>
            ))}
          </List>

          <Statistic color="green">
            <Statistic.Label>Average</Statistic.Label>
            <Statistic.Value>{average.toFixed(2)}</Statistic.Value>
          </Statistic>
        </Segment>
      </Segment>
    </Container>
  );
};

export default AverageCalculator;