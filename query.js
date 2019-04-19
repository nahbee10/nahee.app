import axios from 'axios'
import Vulva from './components/Vulva'

const api = axios.create({
  "http://nahee.app:5000"
})

var myVulva = new Vulva();
var cndidatesArr = [];

var rndX1 = Math.random(-1000,1000); var rndX2 = Math.random(-1000,1000); var rndX3 = Math.random(-1000,1000);

//myVulva.something.set(xCoord, yCoord, zCoord, size, sensitivity);
myVulva.clitoralHood.set(24.1, 107.89, 3.5, 5, V_SENS.HIGH);
myVulva.clitoris.set(rndX1, rndY1, rndZ1, 10, V_SENS.LOW);
myVulva.labiaMajora.set(rndX2, rndY2, rndZ2, 2, V_SENS.LOW);
myVulva.labiaMinora.set(49.2, 20.5, -1.6, 2, V_SENS.MEDIUM);
myVulva.vaginalOpening.set(rndX3, rndY3, rndZ3, rndN3, V_SENS.HIGH);
myVulva.urethralOpening.set(rndX4, rndY4, rndZ4, rndN4, V_SENS.MEDIUM);
myVulva.vulvaVestibule.set(31.0, -50.1, -5.8, 4, V_SENS.HIGH);
myVulva.anus.set(rndX5, rndY5, rndZ5, rndN5, V_SENS.HIGH);

cndidatesArr = api.get('/api/partner',{query: myVulva}).then(res=>{return res.data});  

console.log("xxx partner candidates :", cndidatesArr);


