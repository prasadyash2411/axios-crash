// GET REQUEST
function getTodos() {
  fetch('https://api.example.com/todos')
    .then(response => response.json())
    .then(data => {
      console.log('GET Request');
      console.log(data); // Assuming the response contains the todos data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// POST REQUEST

function addTodo() {
  const todo = {
    title: 'New Todo',
    description: 'Some description',
    completed: false
  };

  fetch('https://api.example.com/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(response => response.json())
    .then(data => {
      console.log('POST Request');
      console.log(data); // Assuming the response contains the added todo data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  const todoId = 123; // Replace with the ID of the todo you want to update

  const updatedTodo = {
    title: 'Updated Todo',
    description: 'Updated description',
    completed: true
  };

  fetch(`https://api.example.com/todos/${todoId}`, {
    method: 'PUT', // or 'PATCH' if you want a partial update
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedTodo)
  })
    .then(response => response.json())
    .then(data => {
      console.log('PUT/PATCH Request');
      console.log(data); // Assuming the response contains the updated todo data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// DELETE REQUEST
function removeTodo() {
  const todoId = 123; // Replace with the ID of the todo you want to remove

  fetch(`https://api.example.com/todos/${todoId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('DELETE Request');
        console.log(`Todo with ID ${todoId} has been successfully deleted.`);
      } else {
        throw new Error('Error deleting todo.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  const url1 = 'https://api.example.com/data1';
  const url2 = 'https://api.example.com/data2';

  const request1 = fetch(url1);
  const request2 = fetch(url2);

  Promise.all([request1, request2])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
      console.log('Simultaneous Request');
      console.log('Data 1:', data[0]); // Data from the first URL
      console.log('Data 2:', data[1]); // Data from the second URL
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  const url = 'https://api.example.com/data';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  };

  fetch(url, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
    .then(data => {
      console.log('Custom Headers');
      console.log(data); // Assuming the response contains the desired data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const url = 'https://api.example.com/data';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Transform Response');
      const transformedData = transformData(data); // Custom transformation function
      console.log(transformedData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Custom transformation function
function transformData(data) {
  // Perform transformation on the data
  // For example, you can map over an array and modify its items
  const transformedArray = data.map(item => ({
    ...item,
    modified: true
  }));

  // Return the transformed data
  return transformedArray;
}

// ERROR HANDLING
function errorHandling() {
  const url = 'https://api.example.com/data';

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log('Error Handling');
      console.log(data); // Assuming the response contains the desired data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// CANCEL TOKEN
function cancelToken() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const url = 'https://api.example.com/data';

  axios.get(url, {
    cancelToken: source.token
  })
    .then(response => {
      console.log('Cancel Token');
      console.log(response.data); // Assuming the response contains the desired data
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error:', error);
      }
    });

  // Cancel the request
  source.cancel('Request canceled by the user');
}

// INTERCEPTING REQUESTS & RESPONSES
// Import the Axios library
const axios = require('axios');

// Create an instance of Axios
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // Modify the request config as needed
    console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    // Handle request error
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // Modify the response data as needed
    console.log('Response Interceptor:', response.data);
    return response;
  },
  error => {
    // Handle response error
    console.error('Response Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Example usage
function makeRequest() {
  const url = 'https://api.example.com/data';

  instance.get(url)
    .then(response => {
      console.log('Request Successful');
      console.log(response.data);
    })
    .catch(error => {
      console.error('Request Failed:', error);
    });
}

makeRequest();


// // Import the Axios library
const axios = require('axios');

// Create an instance of Axios
const instance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token'
  }
});

// Add request interceptors
instance.interceptors.request.use(
  config => {
    // Modify the request config as needed
    console.log('Request Interceptor:', config);
    return config;
  },
  error => {
    // Handle request error
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptors
instance.interceptors.response.use(
  response => {
    // Modify the response data as needed
    console.log('Response Interceptor:', response.data);
    return response;
  },
  error => {
    // Handle response error
    console.error('Response Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Example usage
function makeRequest() {
  instance.get('/data')
    .then(response => {
      console.log('Request Successful');
      console.log(response.data);
    })
    .catch(error => {
      console.error('Request Failed:', error);
    });
}

makeRequest();


