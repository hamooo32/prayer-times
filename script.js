
const PrayerTimes = document.getElementById("PrayerTimes")

new Promise((resolve,reject)=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
        resolve(pos.coords)
        alert("done")
    },err=>reject(err))
})

.then((res)=>{
        let {latitude,longitude} = res
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(res => res.json())
        .then((address)=>{
            document.getElementById("country").innerHTML = address.address.country
            document.getElementById("city").innerHTML = address.address.city
        })
        
        ///////////////////////////////
        let today = new Date().toLocaleDateString()
        let [month,day,year]=today.split("/")
        today = `${day}-${month}-${year}`
        
        PrayerTimes.innerHTML=`        <div id="Fajr">
            <h1>Fajr</h1>
            <h1 id="FajrTime" class="salaTime">04:35</h1>
        </div>
        <div id="Sunrise">
            <h1>Sunrise</h1>
            <h1 id="SunriseTime" class="salaTime">04:35</h1>
        </div>
        <div id="Dhuhr">
            <h1>Dhuhr</h1>
            <h1 id="DhuhrTime" class="salaTime">04:35</h1>
        </div>
        <div id="Asr">
            <h1>Asr</h1>
            <h1 id="AsrTime" class="salaTime">04:35</h1>
        </div>
        <div id="Maghrib">
            <h1>Maghrib</h1>
            <h1 id="MaghribTime" class="salaTime">04:35</h1>
        </div>
        <div id="Isha">
            <h1>Isha</h1>
            <h1 id="IshaTime" class="salaTime">04:35</h1>
        </div>
        `
        const FajrTime = document.getElementById("FajrTime")
        const SunriseTime = document.getElementById("SunriseTime")
        const DhuhrTime = document.getElementById("DhuhrTime")
        const AsrTime = document.getElementById("AsrTime")
        const MaghribTime = document.getElementById("MaghribTime")
        const IshaTime = document.getElementById("IshaTime")
        
        fetch(`https://api.aladhan.com/v1/timings/${today}?latitude=${latitude}&longitude=${longitude}`)
        .then(salawat => salawat.json())
        .then((salawat)=>{
            let str = "hello"
            str.startsWith
            let {Fajr,Sunrise,Dhuhr,Asr,Maghrib,Isha} = salawat.data.timings
            if(Fajr.startsWith("0")){
                Fajr = Fajr.slice(1)
            }
            if(Sunrise.startsWith("0")){
                Sunrise = Sunrise.slice(1)
            }
            FajrTime.innerHTML = Fajr
            SunriseTime.innerHTML = Sunrise
            DhuhrTime.innerHTML = Dhuhr
            AsrTime.innerHTML = Asr
            MaghribTime.innerHTML = Maghrib
            IshaTime.innerHTML = Isha
            console.log(salawat)
        })
        
}).catch((err)=>{
    switch(err.code){
        case err.PERMISSON_DENIED:
            alert (" denied permission")
            break
        case err.POSITION_UNAVAILABLE:
            alert("position is unavailable ")
            break
        case err.TIMEOUT:
            alert("timeout")
            break
        default:
            alert("unknown error")
    }
PrayerTimes.innerHTML = `<section><h1 style='margin:0;'>Something went wrong try again</h1>
</section>

`
let btn = document.createElement("button")
btn.innerHTML="give Permission "
btn.onclick =()=>{
    navigator.geolocation.getCurrentPosition(pos=>{
        location.reload()
    })
}
});



function setTime(){
    const time = document.getElementById("time")
    const day = document.getElementById("day")
    day.innerHTML = new Date().toLocaleDateString()
    let getNowTime = new Date().toLocaleTimeString().slice(-11,-6)
    let PMOrAM = new Date().toLocaleTimeString().slice(-3)
    time.innerHTML = getNowTime + PMOrAM 
}
setTime()
setInterval(()=>{
    setTime()
        
     
},60000)