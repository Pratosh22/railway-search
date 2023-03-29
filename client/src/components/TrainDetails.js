import "./traindetails.css";
import axios from "axios";
import { useState, useEffect } from "react";
function TrainDetails(props) {
  let trainName = [];
  let sourceTime = [];
  let destinationTime = [];
  let distanceArr = [];
  let priceArr = [];
  const [train, setTrain] = useState([]);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [distance, setDistance] = useState([]);
  const [price, setPrice] = useState([]);
  useEffect(() => {
    const getres = async () => {
      const res = await axios.get("http://localhost:8001/train");

      //console.log(res.data.data.trains.length);
      for (let i = 0; i < res.data.data.trains.length; i++) {
        //loop the stops using for loop
        let source_index = -1,
          destination_index = -1;
        for (let j = 0; j < res.data.data.trains[i].stop.length; j++) {
          //push the stops in the array
          let x = res.data.data.trains[i].stop[j];
          if (x === props.source) {
            source_index = j;
            // console.log(source_index);
          } else if (x === props.destination) {
            destination_index = j;
            // console.log(destination_index);
          }
        }
        let distance = 0;
        if (
          source_index !== -1 &&
          destination_index !== -1 &&
          source_index < destination_index
        ) {
          trainName.push(res.data.data.trains[i].name);
          //   console.log(res.data.data.trains[i].name);
          sourceTime.push(res.data.data.trains[i].time[source_index]);
          //   console.log(res.data.data.trains[i].time[source_index]);
          destinationTime.push(res.data.data.trains[i].time[destination_index]);
          //   console.log(res.data.data.trains[i].time[destination_index]);
          for (let k = source_index + 1; k <= destination_index; k++) {
            distance = distance + res.data.data.trains[i].distance[k];
            // console.log(res.data.data.trains[i].distance[k])
          }
          //   console.log(distance);
          distanceArr.push(distance);
          let price = distance * 1.25;
          priceArr.push(price);
          //   console.log(price);
        }
      }

      setTrain(trainName);
      setSource(sourceTime);
      setDestination(destinationTime);
      setDistance(distanceArr);
      setPrice(priceArr);
    };
    getres();
  }, []);

  const renderedList = train.map((item) => {
    return (
      <div>
        <h3>{item}</h3>
      </div>
    );
  });

  const sourceList = source.map((item) => {
    return (
      <div>
        <h3>{item}</h3>
      </div>
    );
  });

  const destinationList = destination.map((item) => {
    return (
      <div>
        <h3>{item}</h3>
      </div>
    );
  });

  const distanceList = distance.map((item) => {
    return (
      <div>
        <h3>{item}</h3>
      </div>
    );
  });

  const priceList = price.map((item) => {
    return (
      <div>
        <h3>{item}</h3>
      </div>
    );
  });

  return (
    <div className="result">
      <h1>Train Details</h1>
      <h3>
        Source: {props.source} Destination: {props.destination}
      </h3>

      {renderedList.length === 0 ? (
        <h2>No trains available</h2>
      ) : (
        <div className="train">
          <div className="trainName">
            <h3>Train Name</h3>
            {renderedList}
          </div>
          <div className="source">
            <h3>Source Time</h3>
            {sourceList}
          </div>
          <div className="destination">
            <h3>Destination Time</h3>
            {destinationList}
          </div>
          <div className="distance"> 
            <h3>Distance</h3>
            {distanceList}
          </div>
          <div className="price">
            <h3>Price</h3>
            {priceList}
          </div>
        </div>
      )}
    </div>
  );
}
export default TrainDetails;
