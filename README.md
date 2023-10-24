# How to perform this practical

## 1. Install all the dependencies

open the terminal and write the command:

```
npm install
```

## 2. Download POSTMAN

download the POSTMAN for sending request to add/mine the block in the blockchain

### https://www.postman.com/downloads/

## 3. Start the Server

start the server for sending request and getting response of blockchain back

```
open the POSTMAN
create new http post request
http://localhost:3000/api/mine
Add the below data into the body in POSTMAN and hit ENTER
{data: "Adding new block"}
```

Now you will get the response of blockchain with all the blocks
