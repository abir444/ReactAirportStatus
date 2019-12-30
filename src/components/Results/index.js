import React from "react";
import Active from "./Active";
import Scheduled from "./Scheduled";
export default props => {
  return renderBasedOnStatus(props);
};

const renderBasedOnStatus = props => {
  const { status, airportData } = props;
  switch (status) {
    case "U":

    return <h1>Unknown</h1>
    case "A":
      return (
        <Active
          airportData={airportData}
        />
      );

    // return (<h1>In Air</h1>)
    case "L":

    return (<h1>Landed</h1>)

    case "S":


    return(
        <Scheduled
        airportData={airportData}
      />
        )
    default:
      return <p>Unavailable</p>;
  }
}