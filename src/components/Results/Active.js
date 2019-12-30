  
import React from "react";


export default ({ airportData}) => {

  return (
    <div>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>
            Status : <span style={{ color: "green" }}>In Air</span>
          </h3>
        </div>
      </div>

      <div>
        <h4 style={{color:"green"}}>Arrival</h4>
        <div>
          <div>
            {airportData[0].name} 
          </div>
          <div>
            {airportData[0].city}, {airportData[0].countryName}
          </div>
        </div>
      </div>
      <div>
        <h4 style={{color:"red"}}>Departure</h4>
        <div>
          <div>
            {airportData[1].name} {airportData[1].fs}
          </div>
          <div>
            {airportData[1].city}, {airportData[1].countryName}
          </div>
        </div>
      </div>
    </div>
  );
};