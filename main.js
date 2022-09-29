//  AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

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
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
      {
        timeout: 5000,
      }
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
  // console.log("Custom Headers");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };

  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Todo",
        completed: false,
      },
      config
    )
    .then((res) => showOutput(res))
    .catch((error) => console.log(error));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log("Transform Response");

  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  axios
    .get("https://jsonplaceholder.typicode.com/todoss", {
      // validateStatus: function (status) {
      //   return status < 500;
      //   //reject only if status >= 500
      // },
    })
    .then((res) => showOutput(res))
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        // request is made but no response
        console.error(err.request);
      } else {
        console.error(err.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request Canceled !!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request send to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosInstances = axios.create({
  //other custom settings
  baseURL: "https://jsonplaceholder.typicode.com",
});

// axiosInstances.get("/comments").then((res) => showOutput(res));

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
