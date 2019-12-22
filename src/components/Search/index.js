import React, { useState }  from 'react';
import { DatePicker,InputNumber, Select, Button } from 'antd';

export default () =>{
      // defining select option and set
      const { Option } = Select;
      const [carrier, setCarrier] = useState("");
      const [flightNumber, setFlightNumber] = useState(0);
      const [date, setDate] = useState("");
      const [data, setData] = useState("");
      const [confirmed, setConfirmed] = useState({});

    // date change function
    function onChangeDate(date, dateString){
      setDate(dateString);
    }

        //flight change function
        function onFlightNoChange(value) {
          setFlightNumber(value);
        }

      //carrier change function
      function onCarrierChange(value) {
        setCarrier(value);
      }         
const onSearch= () =>{




  let formattedDate = date.replace("-", "/");
  formattedDate = formattedDate.replace("-", "/");
    fetch(
        `https://cors-anywhere.herokuapp.com/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/${carrier}/${flightNumber}/dep/${formattedDate}`,
        {
          method: "GET",
          headers: {
            appId: "4f4c6490",
            appKey: "d003705834d72def59a9938392b33dc2"
          }
        }
      )
        .then(data => data.json())
        .then(finalData => {
          setData(finalData);
          console.log(finalData);
           setConfirmed(finalData);
        })
}


    return (
        <div>
            <div>
            <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onCarrierChange}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="EY">EY</Option>
    <Option value="ET">ET</Option>
    <Option value="QT">QT</Option>
  </Select>
            </div>
            <div><InputNumber onChange={onFlightNoChange} placeholder='ex 245, 311..'/></div>
            <div> <DatePicker onChange={onChangeDate}/> </div>
            <Button
          type="primary"
          icon="search"
          onClick={onSearch}
          style={{ marginLeft: 10 }}
        >
          Search
        </Button>
        {JSON.stringify(data)}
        </div>

        
    )
}