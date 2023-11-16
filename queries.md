mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      password
    }
  }
} 

{
  "data": {
    "addUser": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic2FtYm9AbXNuLmNvbSIsIl9pZCI6IjY1NTYzYWQ1MjU5MmM3NGMyOWY3YzhkYSJ9LCJpYXQiOjE3MDAxNDk5NzMsImV4cCI6MTcwMDE1NzE3M30.RRhn2c1X6yhcexcfSryO8DQEBRpC92rVj4uvDPEteK8",
      "user": {
        "_id": "65563ad52592c74c29f7c8da",
        "email": "sambo@msn.com",
        "password": "$2b$10$f5akAx904B8sXVXWJuGcBum5OCxFnlhgc1kfj7PXFx2j/O0.mN72i"
      }
    }
  }
}

{  "username": "clamo",
  "email": "clamo@email.com",
  "password": "password12345"
}

{
  "data": {
    "addUser": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiY2xhbW9AZW1haWwuY29tLCIsIl9pZCI6IjY1NTY0MTM2YzdkOGFmNGQxNGFlZDI3NCJ9LCJpYXQiOjE3MDAxNTE2MDYsImV4cCI6MTcwMDE1ODgwNn0.1VLJczEXCnfp3vY3HjfBaayvqchYQ5h6CnpKMGNSjNo",
      "user": {
        "_id": "65564136c7d8af4d14aed274",
        "email": "clamo@email.com,",
        "password": "$2b$10$wu9J/KixThHQhTPLsYAlgewfPqw9fxyJxp5dD4YPh4.CkXOlITb3a",
        "username": "clamo"
      }
    }
  }
}