// Default header 
axios.defaults.headers.common['X-Auth-Token']= 'some-token';


// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/posts', { params :{ _limit :5}})
  .then(res => showOutput(res))
  .catch(err =>  console.log(err))
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/posts', {title: "Todo", body: "hello world"})
  .then(res => showOutput(res))
  .catch(err =>  console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios.put('https://jsonplaceholder.typicode.com/posts/1',{title: "Todo1", body: "hello world"})
  // .then(res => showOutput(res))
  // .catch(err =>  console.log(err))

  axios.patch('https://jsonplaceholder.typicode.com/posts/1',{title: "Todo1", body: "hello world"})
  .then(res => showOutput(res))
  .catch(err =>  console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/posts/1')
 .then(res => showOutput(res))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
    axios.get("https://jsonplaceholder.typicode.com/todos")
  ]).then( axios.spread((posts,todos)=>showOutput(todos)));
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
          'Content-Type': 'application/json',
          Authorization :  "authanticationToken"
        }
  }

  axios.post('https://jsonplaceholder.typicode.com/posts', {title: "Todo", body: "hello world"},config)
  .then(res => showOutput(res))
  .catch(err =>  console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const option = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/posts",
    data: {title: "Todo", body: "hello world"},
    transformResponse : axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()
      return data
  }),
  }
  axios(option).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios.get("https://jsonplaceholder.typicode.com/postss")
  .then(res => showOutput(res))
  .catch(err =>  {
    if (err.response){
      // server resposed with other than 200 range status
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      
      if ( err.response.status === 404 ){
        alert("page not found");
      }
    }
    else if (err.request){
      // request was made but no response
      console.error(err.request)
  }
  else {
    console.error(err.message)
  }
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios.get("https://jsonplaceholder.typicode.com/posts",{
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown =>{
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    }
  })

  if (true){
    source.cancel("Request canceled");
  }


}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config=>{
   console.log(
    `Request: ${config.method.toUpperCase()} ${config.url}`,
    config

   )
      return config
}, error=> Promise.reject(error));

// AXIOS INSTANCES

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
