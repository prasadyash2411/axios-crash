
axios.defaults.headers.common['X-Auth-Token']=
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  // console.log('GET Request');
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit:5
  //   }
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err));
  axios

    .get('https://jsonplaceholder.typicode.com/todos?_limit:5'

    )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
  // console.log('POST Request');

  // axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //  data: {
  //  title:'New Todo',
  //  completed:false
  //   }
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err));

  axios.post('https://jsonplaceholder.typicode.com/todos',
    {
      title: 'New Todo',
      completed: false
    }
  )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');
  //   axios.put('https://jsonplaceholder.typicode.com/todos/1',
  //   {
  //   title:'Updated Todo',
  //   completed:true
  //    }
  //  )
  //  .then(res=>showOutput(res))
  //  .catch(err=>console.log(err));

  axios.patch('https://jsonplaceholder.typicode.com/todos/1',
    {
      title: 'Updated Todo',
      completed: true
    }
  )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  // console.log('DELETE Request');

  axios.delete('https://jsonplaceholder.typicode.com/todos/1',
  )
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  // console.log('Simultaneous Request');
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts'),
  ])
    // .then(res=>{
    // console.log(res[0]);
    // console.log(res[1]);
    // showOutput(res[1])
    // })
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log('Custom Headers');

  const config = {
    headers: {
      'Content-Type': 'application/jason',
      Authorization: 'sometoken'
    }
  }
  axios.post('https://jsonplaceholder.typicode.com/todos',
    {
      title: 'New Todo',
      completed: false
    }, config
  )
    .then(res => showOutput(res))
    .catch(err => console.log(err));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'hello world'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };
  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  // console.log('Error Handling');
  axios
  .get('https://jsonplaceholder.typicode.com/todoss')
  .then(res=>showOutput(res))
  .catch(err=>{
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
     if(err.response.status===404){
      alert('Error: Page Not Found')
    }
   }else if(err.request){
     console.log(err.request);

     }else{
      console.log(err.message);
     }
  
  });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log('Cancel Token');
  const source=axios.CancelToken.source();
  axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown =>{
    if (axios.isCancel(thrown)) {
      console.log('Request Canceled',thrown.message)
      
    }
  });
  if(true){
    source.cancel('Request Canceled!')
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  config => {
    console.log(
      `${config.method.toUpperCase()} request send to ${config.url
      }at ${new Date().getTime()}`
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// AXIOS INSTANCES
const axiosInstance= axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
});
// axiosInstance.get('/comments').then(res=>showOutput(res))
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
