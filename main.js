// AXIOS GLOBAL
//use of global is you can add send value of header with every request
// it is used in more in tokens, authentication tokens for backend purpose

axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
// so we put real web token above in headers inside (config) as default
// default means every time we call any method header inside (config) contains that common token as default


// GET REQUEST
function getTodos() {
  // axios use to connect with backend
 /* axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    params: { // it use to pass parameters
      _limit: 5 // it used to limit the data by giving first five values only
    }
  })
  .then(res => showOutput(res)) 
  .catch(err => console.log(err)); // it work like a try and catch but we can also use await.
  */

  // we can also write above code in shorter way

  axios.get('https://jsonplaceholder.typicode.com/todos',{ params: { _limit: 5 }})
  .then(res => showOutput(res)) 
  .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
 /* axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: { // this data will shown on the post request site
      title: 'new todo',
      completed: false
    }
  })
  .then(res => showOutput(res)) // it also gives that id
  .catch(err => console.log(err)); */

  // we can write the above code in shorter way

  axios.post('https://jsonplaceholder.typicode.com/todos',data= {
    title: 'new todo',
    completed: false
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// PUT/PATCH REQUEST


function updateTodo() {
  // put is used to remove the previous and add the new one we  also have to pass /id like /1 passed bellow
  axios.put('https://jsonplaceholder.typicode.com/todos/1', {
  title: 'new todo added',
  completed: true
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));

  //patch is similar like put but update or overrides
  axios.patch('https://jsonplaceholder.typicode.com/todos/2', {
  title: 'new todo updated by patch',
  completed: true
  })
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/2')
    .then(res => showOutput(res))
    .catch(err => console.log(err));
}

// SIMULTANEOUS DATA
// if we want to get,post or delete multiple data so we can do it by calling that axios.method inside the previous then and continues but it would look ugly and not readable
//instead we have method called axios.all which takes the array of request in it
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos',{ params: { _limit: 5 }}),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5') // we can write the above code with different link like that
  ])
  /*.then(res => res.forEach(ele => {
    console.log(ele)
  }))*/ // as our showOutput() takes only one parameter in screen therefore
  .then(axios.spread((todo,post) => showOutput(post))) // because we want display the post
  .catch(err => console.log(err));
}

// CUSTOM HEADERS
// if we have to create a changed token for the back end then it is used
function customHeaders() {
  const config = {
    headers: {
      'content-Type': 'application/jason', // it is type of data we are sending
      Authorization: 'someToken' // which is used in backend
    }
  } 
  // we are using it for one data but what if there are more than one edit and we have to put tokens at end of each of them
  // then we use axios globals in it
  axios.post('https://jsonplaceholder.typicode.com/todos',
  data= { // 2nd parameter
    title: 'new todo',
    completed: false
  }, 
  config // third parameter
  ) // we add config here to post the config too with the data.
  .then(res => showOutput(res))
  .catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
// it is similar like post and get but here we are doing it in a neat way
function transformResponse() {
  const post = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'write a post in neat way'
    }
  }

  axios(post).then(res => showOutput(res));
}

// ERROR HANDLING
// if there are multiple errors then we have to handle the error
// we can do it by doing bunch of if else statement
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss') // as we provide false url for making it error
  .then(res => showOutput(res)) 
  .catch(err => {
    if(err.response) {
      // that means server respond with number other then 200 range (if range is more then 200 means error)
      // it will bring 404(page not found) because the page is not exist at all

      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      if(err.response.status === 404) {
        alert('page not found');
      }
    }
    else if(err.request) {
      // error made but no response gave 
      console.log(err.request);
    }
    else {
      console.log(err.message);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES
// it is used to intercept in between every method to show some of the response from it
// response such as last time of calling that method
axios.interceptors.request.use(
  config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime() }`);
    return config;
  },
  error => {
    return new Promise.reject(error);
  }
);

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
