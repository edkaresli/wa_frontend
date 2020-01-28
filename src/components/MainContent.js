import React from 'react';
import '../components/MainContent.css'; 

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.forcasts = [];
    this.state = { allForcasts: [] , modified: false };
    this.handleClick = this.handleClick.bind(this);
    this.renderForcast = this.renderForcast.bind(this);
    this.createForcast = this.createForcast.bind(this);
  } 

  createForcast(forcast) {
    let city = forcast.city;
    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes();  
    let LIs = '';
    let element = `      
        <div>
          <h4>${city}</h4> <br />
          <span>${time}</span>
        </div>
        <ul>`;
    for (let i = 0; i < forcast.consolidated_weather.length; i++) {
      const date_of_forcast = forcast.consolidated_weather[i].applicable_date;
      const max_temp = Math.round(forcast.consolidated_weather[i].max_temp);
      const min_temp = Math.round(forcast.consolidated_weather[i].min_temp);
      const now_temp = i === 0 ? Math.round(forcast.consolidated_weather[i].the_temp) : '';
      const weather_state_name = forcast.consolidated_weather[i].weather_state_name;
      const weather_state_abbr = forcast.consolidated_weather[i].weather_state_abbr;
      
      LIs += `<li key=${(date.getSeconds()+i).toString()}>` + `<h5>${date_of_forcast}</h5><br />` + `<img src="` + `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg" width=60 height=60> <br />${weather_state_name} <br />
        Max: ${max_temp} &#8451;<br />
        Min: ${min_temp} &#8451;<br />`;
      if(i === 0) {
        LIs += `Now: ${now_temp} &#8451;` + '</li>';  
      }
      else {
        LIs += '</li>'
      }        
    }
    element += LIs + `</ul>`;

    return element;
  }

  renderForcast() {
    if(this.state.allForcasts.length < 1)
      return (<h3>No forcasts yet</h3>); 
    
    // let node = document.getElementById("searchResults");
    // let list = node.children;
    // for(let i = 0; i < list.length; i++) {
    //   node.removeChild(list[list.length - 1 - i]);
    // }
    /*
    while(node.hasChildNodes()) {
      node.removeChild(node.childNodes[0]);
    }    
    */
    let allElements = [];
    for(let i = 0; i < this.state.allForcasts.length; i++) {
      let forcastElement = `<div>${this.createForcast(this.state.allForcasts[i])}</div>`; 

      allElements.push(forcastElement);
      // let el = document.createElement('DIV');
      // el.innerHTML = forcastElement;
      // el.classList = "locationForcast";
      // document.getElementById("searchResults").appendChild(el);
    }
    return (allElements);
   
    /*
    let city = this.state.allForcasts[0].city;
    let date = new Date();
    let time = date.getHours() + ':' + date.getMinutes();
    let element = `      
        <div>
          <h4>${city}</h4> <br />
          <span>${time}</span>
        </div>
        <ul>`;
    let LIs = ''; 
    for (let i = 0; i < this.state[0].consolidated_weather.length; i++) {
      const date_of_forcast = this.state[0].consolidated_weather[i].applicable_date;
      const max_temp = Math.round(this.state[0].consolidated_weather[i].max_temp);
      const min_temp = Math.round(this.state[0].consolidated_weather[i].min_temp);
      const now_temp = i === 0 ? Math.round(this.state[0].consolidated_weather[i].the_temp) : '';
      const weather_state_name = this.state[0].consolidated_weather[i].weather_state_name;
      const weather_state_abbr = this.state[0].consolidated_weather[i].weather_state_abbr;
      
      LIs += '<li>' + `<h5>${date_of_forcast}</h5><br />` + `<img src="` + `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg" width=60 height=60> <br />${weather_state_name} <br />
        Max: ${max_temp} &#8451;<br />
        Min: ${min_temp} &#8451;<br />`;
      if(i === 0) {
        LIs += `Now: ${now_temp} &#8451;` + '</li>';  
      }
      else {
        LIs += '</li>'
      }        
    }

    element += LIs + `</ul>`;
    */
        
  }
    
  handleClick(event) {
   // event.preventDefault();
    
    let el = document.querySelector("input[type='text']");
    let locName = el.value;    
    // let fiveDaysForecast = [];
    console.log(locName);
    // let res = {};
    
    // let woeid = '';
    const url = `http://localhost:5000/forcasts/${locName}/`;    
    fetch(url)
      .then(response => { return response.json(); })
        .then(data => { 
         // console.log("Data from server: ", data); 
          if(this.forcasts.length > 5)
          {
            this.forcasts.pop();            
          }
          this.forcasts.push({ city: locName, consolidated_weather: data.consolidated_weather});
          this.setState({allForcasts: this.forcasts});          
         // console.log("this.state: ", this.state.allForcasts)
        })
          .catch(err => {
            console.log(err);
          });                         
  }    

  render() {
    return(
      <>
        <div>
          <input type="text" name="search" placeholder="Search for location"/> 
          <button type="button" name="button" value="getWeather" onClick={this.handleClick}>Get Weather</button>        
        </div>
        <this.renderForcast/>
      </>
    );
  }
}

export default MainContent;
