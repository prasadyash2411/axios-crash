// GET REQUEST

async function getTodos() {
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/todos?_limit=5",
  // })
  //   .then((res) => showOutput(res))
  //   .catch((error) => console.log(error));

  //way 2
  // axios({
  //   method: "get",
  //   url: "https://jsonplaceholder.typicode.com/todos",
  //   params: {
  //     _limit: 5,
  //   },
  // })
  //   .then((res) => showOutput(res))
  //   .catch((error) => console.log(error));

  //way 3
  // axios
  //   .get("https://jsonplaceholder.typicode.com/todos", {
  //     params: {
  //       _limit: 5,
  //     },
  //   })
  //   .then((res) => showOutput(res))
  //   .catch((error) => console.log(error));

  //way 4
  // axios
  //   .get("https://jsonplaceholder.typicode.com/todos?_limit=5")
  //   .then((res) => showOutput(res))
  //   .catch((error) => console.log(error));
  try {
    // console.log("inside get todos");
    let res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    showOutput(res);
  } catch (err) {
    console.log(err);
  }

  // console.log('GET Request');
}

// POST REQUEST
function addTodo() {
  /*
  axios({
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "New Todo",
      completed: false,
    },
  })
    .then((res) => showOutput(res))
    .catch((error) => console.log(error));
    */

  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "New Todo",
      completed: false,
    })
    .then((res) => showOutput(res))
    .catch((error) => console.log(error));
  // console.log("POST Request");
}

// PUT/PATCH REQUEST
function updateTodo() {
  // put replace whole obj
  // axios
  //   .put("https://jsonplaceholder.typicode.com/todos/1", {
  //     title: "Updated  Todo",
  //     completed: true,
  //   })
  //   .then((res) => showOutput(res))
  //   .catch((error) => console.log(error));

  //patch just modify existing data or add new if needed
  axios
    .patch("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated  Todo",
      completed: true,
    })
    .then((res) => showOutput(res))
    .catch((error) => console.log(error));
}

// DELETE REQUEST
function removeTodo() {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((res) => showOutput(res))
    .catch((error) => console.log(error));
}

// SIMULTANEOUS DATA
function getData() {
  // console.log("Simultaneous Request");

  // axios
  //   .all([
  //     axios.get("https://jsonplaceholder.typicode.com/todos"),
  //     axios.get("https://jsonplaceholder.typicode.com/posts"),
  //   ])
  //   .then((res) => {
  //     console.log(res[0]);
  //     console.log(res[1]);

  //     showOutput(res[1]);
  //   });

  // axios
  //   .all([
  //     axios.get("https://jsonplaceholder.typicode.com/todos"),
  //     axios.get("https://jsonplaceholder.typicode.com/posts"),
  //   ])
  //   .then(([todos, posts]) => {
  //     console.log(todos);
  //     console.log(posts);

  //     showOutput(posts);
  //   });

  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ])
    .then(
      axios.spread((todos, posts) => {
        showOutput(posts);
      })
    );
}

// CUSTOM HEADERS
function customHeaders() {
  console.log("Custom Headers");
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use((config) => {
  console.log(`${config.method.toUpperCase() } request send to ${config.url} at ${new Date().getTime()}`);
  return config;
}, error =>{
  return Promise.reject(error)
});

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
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
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
