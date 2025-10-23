# Demo Project Memo For the assessment purpose
Assessment to create CRUD application for Notes

The tech stack for this one is 
## Javascript and express js
### In memory storage for CRUD API to manage notes.

---
## Features

 - ** In- Memory storage ** (No Database Required)
 - ** CRUD Operations **: Create, Read, Update, Delete notes operations possible
 - ** Input Validations **: Implemented Input validation with error message
 - ** Minimal Setup ** : Just javascript enabled browser/IDE express js installed, node and npm must be installed to download the librairs


---   
 ## Getting started : 

 ### Prerequisites

   - Node
   - NPM

### Setup and Run the application:

  - In your bash/ terminal clone the repository

    git clone https://github.com/Varunbxr92/goldencity

    Navigate to the Project directory by executing the command

    cd goldencity

- Build the Project by running this command:
  
  npm install

After Build Success Message.

  - Run the application by executing the below given command

    npm start

    By Default if your port 3099 is free then the application will run on this port, else you got to free up the port 3099, other option is to go to server.js file and change the port from port 3099 to other port of your choice to run the application.

    The API Calls will be available at http://localhost:3099/notes
    
 ## API Endpoints
| Method	| Endpoint	| Description |
|:------:| :-------:| :----------:|
| POST	  |  ‘ /notes ’ |  	Create a New Note |
| GET	   | ‘ /notes ’	 | Retrieve All Notes |
| GET	  |  ‘ /notes/{id}’ |  	Retrieve a Note By Id |
| PUT	   | ‘ /notes/{id} ’	 | Update a Note By Id |
| DELETE	 |  ‘ /notes/{id} ’ |  	Delete a Note By Id |	


## Example Requests: 

  ### Create a Note

   ```shell
   curl --location 'http://localhost:3099/notes' \
--header 'Content-Type: application/json' \
--data '{
    "title" : "Test3",
    "content": "Test Content3"
}'
```

### Get All Notes
```shell
curl --location 'http://localhost:3099/notes'
```

### Get Note By Id
```shell
curl --location 'http://localhost:3099/notes'/1
```

### Update a Note
```shell
curl --location --request PUT 'http://localhost:3099/notes/3' \
--header 'Content-Type: application/json' \
--data '{
    "title": "Updated Title for 3",
    "content": "This is valid content for 3"
}'
```

### Delete a Note By Id
```shell
curl --location --request DELETE 'http://localhost:3099/notes/3'
```

## Error Handling 
 All errors are returned as structured JSON with Appropriate error codes.
 ### Validation Error (400)
```json
 {
  "title": "Title is mandatory",
  "content": "Content is Mandatory"
 }
```

 ### Not Found Error (404)
```json
 {
  "error": "Note Not Found with id : 1"
 }
```

 ### Internal Server Error (500)
```json
 {
  "error": "An unexpected error occurred: <error message>"
 }
```

-- Data will leave the memory as soon as the application comes to halt.
-- No database required since we are opting for In memory, here i have used List data structure in order to save the data

## Video Demo

 ### I have added Video Demo of the application Project Running fine locally on system and apparently can be seen from here.
  --- https://drive.google.com/drive/folders/1RFgBrrAWH9ovMN8_WhUzDxyNQihTdlQe?usp=sharing

  


