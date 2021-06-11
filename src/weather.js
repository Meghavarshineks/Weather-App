let loc=document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;

const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
});

const getWeather=async(city)=>{
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fdfae54e42e8476493ec2cf48a4a2eb8`,
        {mode: 'cors'});

        const weatherData=await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
        if(id>=200 && id<300){
            tempicon.src="thunder.svg"
        }
        else if(id>=200 && id<300){
            tempicon.src="cloudy.svg"
        }
        else if(id>=300 && id<400){
            tempicon.src="rainy-6.svg"
        }
        else if(id>=500 && id<600){
            tempicon.src="snowy-6.svg"
        }
        else if(id>=600 && id<700){
            tempicon.src="cloudy-day-3.svg"
        }
        else if(id==800){
            tempicon.src="day.svg"
        }
        else if(id>800){
            tempicon.src="cloudy.svg";
        }
    }
    catch(error){
        alert('City not found');
    }
};

window.addEventListener("load",()=>{
    let longi;
    let lati;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{

            longi=position.coords.longitude;
            lati=position.coords.latitude;
            const proxy="https://cors-anywhere.herokuapp.com/";

            const api=` ${proxy}api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=fdfae54e42e8476493ec2cf48a4a2eb8 `;

            fetch(api).then((response)=>{
                return response.json();
            })

            .then(data=>{
                const{name}=data;
                const{feels_like}=data.main;
                const{id,main}=data.weather[0];

                loc.textContent=name;
                climate.textContent=main;
                tempvalue.textContent=Math.round(feels_like-273);
                if(id>=200 && id<300){
                    tempicon.src="thunder.svg"
                }
                else if(id>=200 && id<300){
                    tempicon.src="cloudy.svg"
                }
                else if(id>=300 && id<400){
                    tempicon.src="rainy-6.svg"
                }
                else if(id>=500 && id<600){
                    tempicon.src="snowy-6.svg"
                }
                else if(id>=600 && id<700){
                    tempicon.src="cloudy-day-3.svg"
                }
                else if(id==800){
                    tempicon.src="day.svg"
                }
                else if(id>800){
                    tempicon.src="cloudy.svg";
                }
                
            




                console.log(data);
            })
        
        })
    }

})