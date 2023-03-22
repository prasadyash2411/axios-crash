//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:5
  //   }
  // })
  // .then((response) => showOutput(response))
  // .catch((err)=>console.log(err));
  // console.log('GET Request');

  ////// Shortening the above request   /////////

  axios                                                                     //or axios.get
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5',{ timeout: 2000})
    .then((response) => showOutput(response))
    .catch((err) => console.log(err));

  //console.log('GET Request');
}

// POST REQUEST --  //Gives Output with new Todo and ID attached from server
function addTodo() {
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{title:'New Todo',completed:false})
  .then((response) => showOutput(response))
  .catch((err)=>console.log(err));

  //console.log('POST Request');
}

// PUT/PATCH REQUEST
function updateTodo() {
  // axios
  //   .put('https://jsonplaceholder.typicode.com/todos/1', {                                  //Needs id of ToDo to UPDATE    -- Replace Everything
  //     title: 'Updated Todo', completed: true         //Gives Output with new Todo and ID attached from server
  //   })
  //   .then((response) => showOutput(response))
  //   .catch((err) => console.log(err))

  axios
    .patch('https://jsonplaceholder.typicode.com/todos/1', {                                  //Needs id of ToDo to UPDATE    -- Replace Everything
      title: 'Updated Todo', completed: true         //Gives Output with new Todo and ID attached from server
    })
    .then((response) => showOutput(response))
    .catch((err) => console.log(err))

  //console.log('PUT/PATCH Request');
}

// DELETE REQUEST
function removeTodo() {

  axios
    .delete('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => showOutput(response))
    .catch((err) => console.log(err))

  //console.log('DELETE Request');
}

// SIMULTANEOUS DATA
function getData() {

  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ]).then(axios.spread((todos,posts)=>showOutput(posts)))     //gives ability to give Var names to axios.all array Promise outputs
  .catch((err)=>console.error(err));
  
  //console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers:{
      'Content-Type':'application/json',
      Authorization:'someJWTtoken'
    }
  }

  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo', completed: false                   //Gives Output with new Todo and ID attached from server
    },config
    )
    .then((response) => showOutput(response))
    .catch((err) => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options ={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })

  }
  axios(options).then(res=>showOutput(res));              //Making axios request with options object holding method url data etc
  
  //console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  axios                                                                     //or axios('https://jsonplaceholder.typicode.com/todoss')
    .get('https://jsonplaceholder.typicode.com/todoss',{
      // validateStatus: function(status){
      //   return status<500;    //Reject only if Status>=500
      // }
    })
    .then((response) => showOutput(response))
    .catch((err) => {
      if(err.response){
        //Server response status 200
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);

        if(err.response.status==404){
          alert("Error: Page Not found");
        }
        else if(err.request){
          //Request was made but there's no response
          console.error(err.request);
        }
        else{
          console.error(err.message);
        }
      }
    });

  //console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios                                                                     //or axios.get
    .get('https://jsonplaceholder.typicode.com/todos',{
      cancelToken: source.token
    })
    .then((response) => showOutput(response))
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log('Request Canceled',thrown.message)
      }
    });
    if(true){
      source.cancel('Request Cancelled!')
    }

  //console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES -- To Track/intercept requests - Log type URL and Time when the request was made
axios.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
},
error=>{
  return Promise.reject(error);
})
// AXIOS INSTANCES

const axiosInstance = axios.create({
  //other custom settings
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments').then(res=>showOutput(res)).catch(e=>console.log(e));


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
