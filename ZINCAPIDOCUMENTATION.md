### Zinc API Grocery Project Documentation

Link to Zinc API documentation webpage: https://docs.zincapi.com/


- We will most likely only use the Product Search, Ordering a Product, and Retreiving a Product capabilities from the Zinc API.
- To learn more about each specific capability, on the left side of the documentation, you have a menu with all the different capabilities.
  Then once you click that, you will get a detailed explanation of each capability, as well as what is required for each HTTP Request.
  - Lastly, to the right you will have an real-life example of how to use that specific request. And how to call it.
  
  
  ##Regarding to what I have done so far with my code:
  
  #Product Search
  - I first initialized and instantiated an HTTP Request object, which will allow us to issue RESTful API requests. 
  - Then I got the corresponding URL to issue a product search, from the API Doc, and later set the request to be a "GET", as well as passing in the URL
  - Then passed in the Basic Authorization Authentification to the request headers, to authorize our request, and then you will get the results in a JSON Object.
  
  #Product Ordering
  - Product Ordering is very similar to the Product Search, just that we have to send in a JSON Object, or JSON formatted string, with all the required fields. You can 
    see my code to see how the JSON Object is formatted. The current code only has the JSON Object example given from the API Doc.
  - Then the retreival method, just sends in the requestID given from the product ordering method, which is the requestID that corresponds to the specific order.
    You can use that code to view the status of the order, as well as a summary of that order.
    
    
 
