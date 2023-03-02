// Axios globals
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


// GET REQUEST
function getTodos() {
    // 1st way
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //     }
    // }).then(res => showOutput(res)).catch(err => console.error(err))

    // 2nd way
    // axios.get({
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //     }

    // EZ way
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 1000}).then(res => showOutput(res)).catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
    // 1st way
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {
    //         title: 'New todo',
    //         completed: false
    //     }
    // }).then(res => showOutput(res)).catch(err => console.error(err))

    // EZ way
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New todo',
        completed: false
    }).then(res => showOutput(res)).catch(err => console.error(err))

}

// PUT/PATCH REQUEST
function updateTodo() {
    // Put
    // axios.put('https://jsonplaceholder.typicode.com/todos/1', {
    //     title: 'Updated todo',
    //     completed: true
    // }).then(res => showOutput(res)).catch(err => console.error(err))

    // Patch
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated todo',
        completed: true
    }).then(res => showOutput(res)).catch(err => console.error(err))

}

// DELETE REQUEST
function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1').then(res => showOutput(res)).catch(err => console.error(err))

}

// SIMULTANEOUS DATA
function getData() {
    // 1st way
    // axios.all([axios.get('https://jsonplaceholder.typicode.com/todos'), axios.get('https://jsonplaceholder.typicode.com/posts')]).then((res) => {
    //     console.log(res[0])
    //     console.log(res[1])
    //     showOutput(res[1])
    // }).catch(err => console.error(err))

    // EZ way
    axios.all([axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'), axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')]).then(axios.spread((todos, posts) => showOutput(posts))).catch(err => console.error(err))

}

// CUSTOM HEADERS
function customHeaders() {

    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'auth-token'
        }
    }

    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New todo',
        completed: false
    }, config).then(res => showOutput(res)).catch(err => console.error(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {
            title: 'Hello World'
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase()
            return data
        })
    }

    axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss'
  //, {
      // validateStatus: function(status) {
      //     return status < 500;
      // }
    //}
    ).then(res => showOutput(res)).catch(err => { // console.error(err)
        if (err.response) { // Server responds any other than 200 range
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
            if (err.response.status === 404) {
                alert('Error: Page not found')
            } else if (err.request) { // Request was made but no response
                console.log(err.request)
            } else {
                console.log('Error: ', err.message)
            }
        }
    })
}

// CANCEL TOKEN
function cancelToken() {
    const source = axios.CancelToken.source()
    axios.get('https://jsonplaceholder.typicode.com/todos', {cancelToken: source.token}).then(res => showOutput(res)).catch(thrown => {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled:', thrown.message)
        }

    })
    if (true) {
        source.cancel('Operation canceled by the user.')
    }

}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
    console.log(`${
        config.method.toUpperCase()
    } request sent to ${
        config.url
    } at ${
        new Date().getTime()
    }`);
    return config;
}, error => {
    return Promise.reject(error);
})

// AXIOS INSTANCES
const axiosInstance = axios.create({baseURL: 'https://jsonplaceholder.typicode.com'})

// axiosInstance.get('/comments').then(res => showOutput(res)).catch(err => console.error(err))

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${
        res.status
    }</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${
        JSON.stringify(res.headers, null, 2)
    }</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${
        JSON.stringify(res.data, null, 2)
    }</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${
        JSON.stringify(res.config, null, 2)
    }</pre>
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
document.getElementById('transform').addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
