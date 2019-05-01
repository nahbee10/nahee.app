import axios from 'axios'

const api = axios.create({
  "http://localhost:4000"
})

export default orgasmWorker(){
  self.addEventListener("message", e => {
    if (!e) return;
    api.post('/api/orgasm', 
  		{created_at:Date(), 
  		sex_id:e.data[0], 
  		partner_id:e.data[1], 
  		is_real:true, 
  		part:e.data[2], 
  		body_position:e.data[3],
  		role:e.data[4], 
  		intensity:e.data[5], 
  		sounds:e.data[6]})
    .then(res => {
      if (res.data.error != null){
        console.log("fail",res.data.error)
      }else{
        console.log("success");
      }
    })
  });
};