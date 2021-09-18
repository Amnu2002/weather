var loader = document.getElementById("preloader");
function myfun(){
    loader.style.display="none";
}
window.addEventListener('load',()=>{
    let long;
    let lat;
    var temperatureDescription = document.querySelector('.temperature-description');
    var temperatureDegree = document.querySelector('.degree');
    var locationTimeZone = document.querySelector('.location-timezone');
    var temperature;
    var desc;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            var icon = document.querySelector(".icon");
            icon.innerHTML=`<img src="" alt="this is image" class="icon1">`;
            lat=position.coords.latitude;
            long=position.coords.longitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5c6c3266422022f2b56eeb4b16ed9623`;
            fetch(api)
            .then(Response =>{
                return Response.json();
            })
            .then(data=>{
                console.log(data);
                temperature=Math.floor(data.main.temp-273.15);
                desc=data.weather[0].description;
                var loc = data.name+' / '+data.sys.country;
                temperatureDegree.textContent = temperature+" C";
                temperatureDescription.textContent = desc;
                locationTimeZone.textContent=loc;
                const {icon} = data.weather[0];
                document.querySelector('.icon1').src="https://openweathermap.org/img/wn/"+ icon +".png";
                setTimeout(myfun,1000);
            });
        },err=>{
            locationTimeZone.innerHTML=`<b>Dekh bhai Ghabrane ki baat nahi hai.<br>
            teri location off hai on karde mai kha ni jaauga.</b>`;
            var contain = document.querySelector(".container");
            myfun();
        });
        
    }
})

