const axios = require('axios');

axios({
  method:'get',
  url:"http://localhost:4000/todos", 
  data:{username:"jic4656"}
}).then((res)=>{
console.log(res)
})
