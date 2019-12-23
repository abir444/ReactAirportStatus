import React, { useState }  from 'react';
import { DatePicker,InputNumber, Select, Button } from 'antd';
import './index.css';

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
     
        <div class='main' style={{ paddingTop: 20 }} >
         <div class='a'><p><strong> Welcome To Ramtoo Airways</strong></p></div> 
            <div>
            <Select
    showSearch
    style={{ width: 500 }}
    placeholder="Select a Carrier"
    optionFilterProp="children"
    onChange={onCarrierChange}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  > 
    <Option value="EK">
    <div style={{ marginRight: 15 }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Emirates</div>
    </Option>

    <Option value="ET">
    <div style={{ marginRight: 15 }}>
                    <img
                      src="https://discover.film/wp-content/uploads/2018/03/etihad-airlines-short-films.jpg"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Eithid</div>
    </Option>
    <Option value="QR">
    <div style={{ marginRight: 15 }}>
                    <img
                      src="https://prague.tv/images/customer/logo/Qatar-Airways-Logo_gallery-big.png"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Qatar</div>
    
    
    </Option>
  </Select>
            </div>
            <div><InputNumber onChange={onFlightNoChange} placeholder='ex 245, 311..'  style={{ width: 500 }}/></div>
            <div> <DatePicker onChange={onChangeDate}/> </div>
            <Button
             style={{  }}
          type="primary"
          icon="search"
          onClick={onSearch}
          style={{ marginLeft: 10 }}
        >
          Search
        </Button>
        {data.flighStatuses && (
          <div class="status">
          <h1>Search complete!</h1>
          <h4>{data.flighStatuses[0].status}</h4>
          </div>
        )}
        </div>

        
    )
};

// const style = {
//   main : {
    
//   }
// }