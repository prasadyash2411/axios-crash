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
function getData() {
  console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
}

// INTERCEPTING REQUESTS & RESPONSES

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
