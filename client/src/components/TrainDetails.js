import './traindetails.css'
import axios from 'axios';
import {useState, useEffect} from 'react';
function TrainDetails(props){
    let trainName=[];
    let sourceTime=[];
    let destinationTime=[];
    let distanceArr=[];
    let priceArr=[];
    useEffect(()=>{
       

        const getres=async()=>{
            
            const res=await axios.get('http://localhost:8001/train');
            
            //console.log(res.data.data.trains.length);
            for (let i = 0; i < res.data.data.trains.length; i++) {
                //loop the stops using for loop
                let source_index=-1,destination_index=-1;
                for (let j = 0; j < res.data.data.trains[i].stop.length; j++) {
                  //push the stops in the array
                  let x = res.data.data.trains[i].stop[j];
                  if(x===props.source)
                  {
                     source_index=j;
                    // console.log(source_index);
                  }
                  else if(x===props.destination)
                  {
                     destination_index=j;   
                    // console.log(destination_index);
                  }
                }
                 let distance=0;
                  if(source_index!==-1 && destination_index!==-1 && source_index<destination_index)
                  {
                    trainName.push(res.data.data.trains[i].name);
                    console.log(res.data.data.trains[i].name)
                    sourceTime.push(res.data.data.trains[i].time[source_index]);
                    console.log(res.data.data.trains[i].time[source_index])
                    destinationTime.push(res.data.data.trains[i].time[destination_index]);
                    console.log(res.data.data.trains[i].time[destination_index])
                    for(let k=source_index+1;k<=destination_index;k++)
                    {   
                        distance=distance+res.data.data.trains[i].distance[k];
                        // console.log(res.data.data.trains[i].distance[k])

                    }
                    console.log(distance);
                    distanceArr.push(distance);
                    let price=distance*1.25;
                    priceArr.push(price);
                    console.log(price);
                  }
              }

            }
        getres();
    },[])
            

    console.log(trainName);
    return (
        <div className="result">
            <h1>Train Details</h1>
            <h3>Source: {props.source}       Destination: {props.destination}</h3>
            {/* display train details here */}
            <table>
                <tr>
                    <th>Train Name</th>
                    <th>Source Time</th>
                    <th>Destination Time</th>
                    <th>Distance</th>
                    <th>Price</th>
                </tr>
                {trainName.map((item,index)=>{
                    return(
                        <tr>
                            <td>{item}</td>
                            <td>{sourceTime[index]}</td>
                            <td>{destinationTime[index]}</td>
                            <td>{distanceArr[index]}</td>
                            <td>{priceArr[index]}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
export default TrainDetails;