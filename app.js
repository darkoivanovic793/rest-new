
// Instantiating new EasyHTTP class 
const http = new EasyHTTP; 
// User Data 
const data = { 
    title: 'sunny yadav', 
    description: 'sunnyyadav new user', 
    published: 0
  } 
  
// Update Post 
http.put( 
'https://localhost:3000/tutorials/2', 
     data) 
  
// Resolving promise for response data 
.then(data => console.log(data)) 
  
// Resolving promise for error 
.catch(err => console.log(err));
