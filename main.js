axios.defaults.headers.common['X-Auth-Token']="fengivejgopejnfwkjdUTNDXJANCKAoNDz-0t5gnckdsfnewopfjoscnmsklvnd"

// GET REQUEST
function getTodos() {
  // axios({
  //   method:'GET',
  //   url:"https://jsonplaceholder.typicode.com/posts",
  //   params:{
  //     _limit:5
  //   }
  // }).then((res)=>showOutput(res))
  // .catch((err)=>console.log(err))
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  .then((res)=>showOutput(res))
  .catch((err)=>console.log(err))
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method:'POST',
  //   url:"https://jsonplaceholder.typicode.com/posts",
  //   data:{
  //     name:'Sj',
  //     completed:false
  //   }
  // }).then((res)=>showOutput(res))
  // .catch((err)=>console.log(err))
  axios.post('https://jsonplaceholder.typicode.com/posts',{
    name:'Sj',
    completed:false
  }).then((res)=>showOutput(res))
  .catch((err)=>console.log(err))
}

// PUT/PATCH REQUEST
// Put updates entire data and patch update only given data
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/posts/101',{
    name:'Sjadeja',
    completed:false
  }).then((res)=>showOutput(res))
  .catch((err)=>console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/posts/101')
  .then((res)=>showOutput(res))
  .catch((err)=>console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://jsonplaceholder.typicode.com/todos')
  ])
  
  .then(axios.spread((posts,todos)=>showOutput(posts)))
  .catch((err)=>console.log(err)) 
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers:{
      'content-type':'application/json',
      Authorization:'sometoken'
    }
  };
  axios.post('https://jsonplaceholder.typicode.com/posts',{
    name:'Sj',
    completed:false
  },config)
  .then((res)=>showOutput(res))
  .catch((err)=>console.log(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options={
    method:'POST',
    url:'https://jsonplaceholder.typicode.com/posts',
    data:{
      title:"Hello World"
    },
    transformResponse:axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })
  };
  axios(options).then(res=>showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/postsfg?_limit=5')
  .then((res)=>showOutput(res))
  .catch((err)=>{
    if(err.response){
      //server returns other status than 200 range
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)

      if(err.response.status===404){
        alert("Error: Page not found")
      }
      else if(err.request){
        //request was made but no response
        console.error(err.request)
      }
      else{
        console.log(err.message)
      }
      
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source=axios.cancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/posts',{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log('Req cancelled!',thrown.message)
    }
  })
  if(true){
    source.cancel('Req cancelleddd!!')
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`
    );

    return config;
  },
  error=>{
    return Promise.reject(error);
  }
)

// AXIOS INSTANCES

const axiosinstance=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
})

axiosinstance.get('/comments').then(res=>showOutput(res))

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
