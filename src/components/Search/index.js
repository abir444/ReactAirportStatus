import React, { useState }  from 'react';
import { DatePicker,InputNumber, Select, Button } from 'antd';
import './index.css';
import Results from '../Results';

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

    //test



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
        <div class='main' style={{ paddingTop: 20 }} >
         <div class='a'><p><strong> Welcome To Ramtoo Airways</strong></p></div> 
            <div style={{padding:10}}>
            <Select 
    showSearch
    style={{ width: 500}}
    placeholder="Select a Carrier"
    optionFilterProp="children"
    onChange={onCarrierChange}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  > 
    <Option value="EK">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Emirates</div>
                </div>
              </Option>
              <Option value="EY">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="https://discover.film/wp-content/uploads/2018/03/etihad-airlines-short-films.jpg"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Eithid</div>
                </div>
              </Option>
              <Option value="QR">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginRight: 15 }}>
                    <img
                      src="https://prague.tv/images/customer/logo/Qatar-Airways-Logo_gallery-big.png"
                      height="20px"
                      width="20px"
                    />
                  </div>
                  <div style={{ fontSize: 18 }}>Qatar</div>
                </div>
              </Option>
  </Select>
            </div>
            <div><InputNumber onChange={onFlightNoChange} placeholder='ex 245, 311..'  
            style={{ width: 500 , padding : 10}}/></div>
            <div> <DatePicker onChange={onChangeDate} /> </div>
            <Button
             style={{ paddingTop:10 }}
          type="primary"
          icon="search"
          onClick={onSearch}
          style={{ marginLeft: 10 }}
        >
          Search
        </Button>
        </div>
        <div>
        {data.flightStatuses && data.flightStatuses.length > 0 && (
          <div class="status">
          <h1>Search complete!</h1>
          <Results status= {data.flightStatuses[0].status}
                   airportData={
                            data.appendix && data.appendix.airports
                              ? data.appendix.airports
                              : ""
                          }
          
          />
          </div>
          
        )}
        </div>
          {
            data.flightStatuses && data.flightStatuses.length ===0 && <h1> Zero Info Returned ! Try again later</h1>
          }


        </div>
        
        
    )
};

// const style = {
//   main : {
    
//   }
// }