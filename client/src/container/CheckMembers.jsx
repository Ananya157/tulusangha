import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/tables.scss";

export const CheckMembers = () => { 
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const url = 'https://aatana.org/api/getMembers.php'
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
        axios({
            method: 'get',
            url: url,
        })
            .then(function (response) {
                setData(response.data);
                setLoading(false);
            })
            .catch(function (response) {
                console.log(response)
            });
    })();
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  const renderTableData = () => {
      console.log(data[0])
    return data.map(data1 => {
       const id = data1.ID;//destructuring
       const name = data1.Name;
       const spouseName = data1.SpouseName;
       const email = data1.Email;
       const type = data1.MemType;
       const pay = data1.PaymentMethod;
       const phone = data1.Phone;
       const address = data1.Address;
       const city = data1.City;
       const state = data1.State;
       const zipcode = data1.ZIP;
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{spouseName}</td>
             <td>{email}</td>
             <td>{type}</td>
             <td>{pay}</td>
             <td>{phone}</td>
             <td>{address}</td>
             <td>{city}</td>
             <td>{state}</td>
             <td>{zipcode}</td>
          </tr>
       )
    })
 }

 const renderTableHeader = () => {
    const headers = {"ID" : "" , "Name" : "" , "Spouse Name" : "", "Email":"", "Membership Type":"", "Payment Method": "", "Phone":"", "Address":"", "City":"", "State":"", "ZipCodde":""}
    return Object.keys(headers).map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }


  return (
    <div>
        <h1 id='title'>AATA Member Details</h1>
        <table id='students'>
            <tbody>
            <tr>{renderTableHeader()}</tr>
                {renderTableData()}
            </tbody>
        </table>
    </div>
  );
}
