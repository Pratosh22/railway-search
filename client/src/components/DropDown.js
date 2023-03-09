import Dropdown from "react-dropdown";
import { useEffect, useState } from "react";
import "./dropdown.css";
import axios from "axios";
import TrainDetails from "./TrainDetails";
import "react-dropdown/style.css";
function DropDown() {
  const [display, setDisplay] = useState(false);
  const [stops2, setStops2] = useState([]);
  const [train, setTrain] = useState([]);
  
  let stops = [];  

  const getStops = async () => {
    const data = await axios.get("http://localhost:8001/train");
    //loop the data using for loop

    for (let i = 0; i < data.data.data.trains.length; i++) {
      //loop the stops using for loop
      for (let j = 0; j < data.data.data.trains[i].stop.length; j++) {
        //push the stops in the array
        let x = data.data.data.trains[i].stop[j];
        // console.log(x);
        if (!stops.includes(x)) {
          stops.push(x);
        }
      }
    }
    setStops2(stops);
    return data;
  };



  useEffect(() => {
    fetch("http://localhost:8001/train", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setTrain(data.data.trains[0].stop);
      });
    getStops();

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selecteddestination === "" || selectedsource === "") {
      alert("Please select source and destination");
      return;
    }
    if (selecteddestination === selectedsource) {
      alert("Source and destination cannot be same");
      return;
    }
    setDisplay(true);
  };

  const [selectedsource, setSource] = useState("");
  const [selecteddestination, setDestination] = useState("");

  return (
    <div>
      {display ? (
        <TrainDetails
          source={selectedsource}
          destination={selecteddestination}
          data={train}
        />
      ) : (
        <div className="wrapper">
          <h1>Railway Search</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Source</label>
              <Dropdown
                onChange={(e) => setSource(e.value)}
                value={selectedsource}
                options={stops2}
                placeholder="Select an option"
              />
            </div>
            <div>
              <label>Destination</label>
              <Dropdown
                onChange={(e) => setDestination(e.value)}
                value={selecteddestination}
                options={stops2}
                placeholder="Select an option"
              />
            </div>
            <button>Find Train</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DropDown;
