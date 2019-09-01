import React from 'react';

class MainContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.handleClick = this.handleClick.bind(this);
  } 

  handleClick(event) {
    event.preventDefault();
    // Send a POST request to node server with the location.
    // The node server should attempt to fetch from MetaWeather and send forcast back to client.
    let el = document.querySelector("input[type='text']");
    let locName = el.value;    
    let fiveDaysForecast = [];
    console.log(locName);
    let res = {};
    /* place a fetch call here! */
    /* send the location as a query */
    /* receive the id of the location */
    let woeid = '';
    
    //let url = "https://www.metaweather.com/api/location/search/?query=prague";
    
    // let headers = new Headers();
   // headers.append('Content-Type', 'application/json');
    //const request = new Request(url, { method: 'GET', cache: 'default', mode: 'no-cors', headers: headers });
    // fetch(request)
    fetch('http://localhost:5000/location/' + locName + '/')
      .then(response => { return response.json(); })
        .then(data => { console.log(data); } )
          .catch(err => {
            console.log(err);
          });
        
        /*      
        if(response.status == 200) {
          console.log("Cool!");
        }
        else {
          console.log("Oops! response.status = " + response.status);
          return;
        } 
        */     
      
    // woeid = 796597;
  /*
    let result = fetch("https://www.metaweather.com/api/location/" + woeid + '/');
    result.then(response => {
      return response.json();
    }).then(data => {
        fiveDaysForecast = data; 
        console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
    */
    /* send a query with the id and receive a JSON response */
    /* turn the JSON into a <ul> and put it in state */
    /* render the result in a child component */
    // document.getElementById("searchResults").innerText = "Name: " + res.name; 
  }

  render() {
    return(
      <main>
        <div>
          <input type="text" name="search" placeholder="Search for location"/> 
          <button type="button" name="button" value="getWeather" onClick={this.handleClick}>Get Weather</button>        
        </div>
        <div id="searchResults"></div>
      </main>
    );
  }
}

export default MainContent;
