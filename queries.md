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





{  "username": "farteeka",
  "email": "farteeka@email.com",
  "password": "farteeka"
}
{
  "data": {
    "addUser": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZmFydGVla2FAZW1haWwuY29tIiwiX2lkIjoiNjU1NmE1MGVjYThkYTI3N2JjNWExOTM0In0sImlhdCI6MTcwMDE3NzE2NiwiZXhwIjoxNzAwMTg0MzY2fQ.bSgIrYmE7Fz04jXmKC6lGu9ekGCvFFQO568wC_2xhn0",
      "user": {
        "_id": "6556a50eca8da277bc5a1934",
        "username": "farteeka",
        "email": "farteeka@email.com",
        "password": "$2b$10$V8/gVlq9ZXEbHG0y4eV2u.eAEMy9VdfcAvZCF9fT2vSn6YvkV/KOm"
      }
    }
  }
}