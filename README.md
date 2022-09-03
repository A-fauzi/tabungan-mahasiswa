# API Spec
---
# Admin
## Create Admin

Request :
- Method : POST
- Endpoint : `/admin`
- Header :
    - Content-Type: application/json
    - Accept: application/json
- Body :

```json 
{
     "username": "string",
     "password": "string"
}
```

Response :

```json 
{
    "code": 200,
    "message": "SUCCESS",
    "data": {
        "id": "d43ef229-ab2f-4687-8087-e379d21aac66",
        "role": "admin",
        "username": "string",
        "password": "$2a$08$XnPhr/KzsidPGOW72eZQ8uunvmcR4uCutsk5CXdwcGZod1eDqDepK",
        "updatedAt": "2022-09-03T11:01:38.074Z",
        "createdAt": "2022-09-03T11:01:38.074Z",
        "deletedAt": null
    }
}
```
---
## Authentication
Request :
- Method : POST
- Endpoint : `/login`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json 
{
    "username":"string",
    "password":"string"
}
```

Response :

```json 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiNDUzNWNiODQtZDE3ZC00NzcwLTg3MTMtNzk2MmI5MGM4NDEyIiwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDA4JHFBT21GcC8wYk1TaHhPcFZtLlkwOXVKZ0tydDNNSElOMi9NdDE2cTVrdXZTTHMvQ1VEMkppIiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0wOC0yOFQwNToxMDozNy4zNzJaIiwidXBkYXRlZEF0IjoiMjAyMi0wOC0yOFQwNToxMDozNy4zNzJaIiwiZGVsZXRlZEF0IjpudWxsfSwiaWF0IjoxNjYyMjAyNzUwLCJleHAiOjE2NjI1MDI3NTB9.7vbohYPh_iNgUrL7-SzX0aPz2VyhIrrY_Kp8t0IOPj8"
}
```
---
## Authorization:

Request :
- Bearer Token
  - Token : {{Jwt_token}}

---
# Transaction
## store transaction mahasiswa
Request :
- Method : POST
- Endpoint : `/transaction`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json 
{
    "mahasiswa_nim":"234567866",
    "balance":500000,
    "type":"debit"
}
```

Response :

```json 
{
    "code": 200,
    "message": "SUCCESS",
    "data": {
        "id": "be3ec2ae-9105-4573-9a54-845fd2771ff8",
        "date": "2022-09-03",
        "mahasiswa_nim": "234567866",
        "balance": -500000,
        "type_transaction": "debit",
        "updatedAt": "2022-09-03T11:06:50.952Z",
        "createdAt": "2022-09-03T11:06:50.952Z",
        "deletedAt": null,
        "mahasiswaNim": "234567866"
    }
```
---