//AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

// GET REQUEST
function getTodos() {
  
  // axios({
  //   method : "get",
  //   url : "https://jsonplaceholder.typicode.com/todos",
  //   params : {
  //     _limit : 5
  //   }
  // })
  //   .then((response)=>showOutput(response))
  //   .catch((error)=>console.log(error))

  axios
  .get("https://jsonplaceholder.typicode.com/todos?_limit=5", {timeout: 5000})
  .then((response)=>showOutput(response))
  .catch((error)=>console.log(error))

}

// POST REQUEST
function addTodo() {
  
//   axios({
//     method : "post",
//     url : "https://jsonplaceholder.typicode.com/todos",
//     data : {
//       title : "New Entry",
//       completed : false
//     }
//   })
//     .then((response)=>showOutput(response))
//     .catch((error)=>console.log(error))
// }

  axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title : "New Entry",
        completed : false
      })
      .then((response)=>showOutput(response))
      .catch((error)=>console.log(error))
    
}


// PUT/PATCH REQUEST
function updateTodo() {
  // axios
  // .put("https://jsonplaceholder.typicode.com/todos/1", {
  //   title : "Updated New Entry",
  //   completed : true
  // })
  // .then((response)=>showOutput(response))
  // .catch((error)=>console.log(error))

  axios
  .patch("https://jsonplaceholder.typicode.com/todos/1", {
    title : "Updated New Entry",
    completed : true
  })
  .then((response)=>showOutput(response))
  .catch((error)=>console.log(error))
}

// DELETE REQUEST
function removeTodo() {
  axios
  .delete("https://jsonplaceholder.typicode.com/todos/1")  
  .then((response)=>showOutput(response))
  .catch((error)=>console.log(error))
}

// SIMULTANEOUS DATA
function getData() {
  
  axios.all([
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5")
  ])
  // .then((response)=>{
  //   console.log(response[0]);
  //   console.log(response[1]);
  //   showOutput(response[1]);
  // })
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch((error) => console.log(error))

}

// CUSTOM HEADERS
function customHeaders() {
  
  const config = {
    headers: {
      "Content-Type" : "application/json",
      Authorization: "sometoken"
    }
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos", 
      {
        title : "New Entry",
        completed : false
      },
      config
    )
    .then((response)=>showOutput(response))
    .catch((error)=>console.log(error))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "hello everyone"
    },
    transformResponse: axios.defaults.transformResponse.concat((data)=>{
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then((response) => showOutput(response));

}



// ERROR HANDLING
function errorHandling() {
  
  axios
  .get("https://jsonplaceholder.typicode.com/todoss",
      {
        //   validateStatus: function(status){
        //   return status < 500; //Reject only if status is  greater than or equal to 500
        // }
  })
  .then((response)=>showOutput(response))
  .catch((error)=>{
    if(error.response)
    {
      //Server responded with a status other than 200
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if(error.response.status===404)
        alert("Page is not found")
    }
    else if(error.request)
         {
            //Request was made but no response
            console.log(error.request);
         }
         else
         console.log(error.message);
  });


}



// CANCEL TOKEN
function cancelToken() {
  
  const source = axios.CancelToken.source();
  
  axios
  .get("https://jsonplaceholder.typicode.com/todos", {
    cancelToken: source.token
  })
  .then((response)=>showOutput(response))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log("Request Canceled", thrown.message);
    }
  });
  if(true)
  {
    source.cancel("Reques cancel");
  }

}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(

  (config)=>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
    return config;
  },
  
  (error)=>{
    return Promise.reject(error);
  }

);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  //other custom settings
  baseURL: "https://jsonplaceholder.typicode.com"
});
//axiosInstance.get("/comments").then((response) => showOutput(response));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
