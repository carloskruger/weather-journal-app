
/* Global Variables */

// An API key needs to be entered here
const myAPIKey = '';
const newZip = document.getElementById('zip').value;
const newContent = document.getElementById('feelings').value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener('click',getInformation);

async function getInformation(e){
  
    const newZip = document.getElementById('zip').value;
    
    const myURL = 'http://api.openweathermap.org/data/2.5/weather?zip='+newZip+',us&appid='+myAPIKey
    let data;
    await getTemperature(myURL)
}

const getTemperature = async (baseURL)=>{
    
  let res = await fetch(baseURL);
  try {
//main.temp
    data = await res.json();
    let kelvin = data.main.temp;
    let fahrenheit = convertKtoFTemp(kelvin);
    let temperature = fahrenheit.toFixed(2);
    const newContent = document.getElementById('feelings').value;
    postData("/addData",{temperature: temperature, date: newDate, content: newContent});
   
    updateUI();
  }  
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

function convertKtoFTemp(kelvin){
  let fahrenheit =  (kelvin * 9/5) - 459.67 ;
  return fahrenheit;
}

const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
      try {
        const newData = await response.json();
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

  const updateUI = async() => {
      try {
          const request = await fetch('/all');
          const allData = await request.json();
          document.getElementById('date').innerHTML = allData[allData.length - 1].date;
          document.getElementById('temp').innerHTML = allData[allData.length - 1].temp + "F";
          document.getElementById('content').innerHTML = allData[allData.length - 1].content;
      }
      catch(error){
          console.log("error: ", error)
      }
  }
