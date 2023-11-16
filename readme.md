## API Reference

## URL

_Server_

```
http://localhost:3000
```

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## RESTful endpoints

### POST /api/author/

> Post New Author

_Request Header_

```
not needed
```

_Request Body_

```
{
    "author": <author_name>
}
```

_Response (200)_

```
{
    "data": {<data_author>},
    "status": "Success"
}
```

_Response (400 - Author Already Existed)_

```
{
    "message": "Author Already Existed"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*/author*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/buku/

> Post Buku

_Request Header_

```
not needed
```

_Request Body_

```
{
    "judulBuku": <title_of_book>
    "authorId": <author_id>
    "kategoriBukuId": <kategori_id>
}
```

_Response (200)_

```
{
    "data": {<data_buku>},
    "status": "Success"
}
```

_Response (400 - Buku Already Existed)_

```
{
    "message": "Buku Already Existed"
}
```

_Response (400 - Author Not Found)_

```
{
    "message": "Author Not Found"
}
```

_Response (400 - Kategori Buku Not Found)_

```
{
    "message": "Kategori Buku Not Found"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*/judulBuku*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/kategori/

> Post Kategori

_Request Header_

```
not needed
```

_Request Body_

```
{
    "kategori": <kategori_of_book>
}
```

_Response (200)_

```
{
    "data": {<data_kategori>},
    "status": "Success Create Kategori"
}
```

_Response (400 - Kategori Already Existed)_

```
{
    "message": "Kategori Already Existed"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*/kategori*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/author

> Get All Author

```http
    GET /api/author/
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_author>],
    "status": "Success"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### Author Detail

```http
    GET /api/author/:id
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Request Params_

```
authorId
```

_Response (200)_

```
{
    "data": [<data_author>],
    "status": "Success"
}
```

_Response (404 - Author not found)_

```
{
    "message": "Author not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### GET /api/buku

> Get All buku

```http
    GET /api/buku/
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_buku>],
    "status": "Success"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### Buku Detail

```http
    GET /api/buku/:id
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Request Params_

```
bukuId
```

_Response (200)_

```
{
    "data": [<data_buku>],
    "status": "Success"
}
```

_Response (404 - Buku not found)_

```
{
    "message": "Buku not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### GET /api/kategori

> Get All kategori

```http
    GET /api/kategori/
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_kategori>],
    "status": "Success"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### Kategori Detail

```http
    GET /api/kategori/:id
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Request Params_

```
kategoriBukuId
```

_Response (200)_

```
{
    "data": [<data_kategori>],
    "status": "Success"
}
```

_Response (404 - Kategori not found)_

```
{
    "message": "Kategori not found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### PUT /api/author/:id

> Update by id

_Request Params_

```
/<authorId>
```

_Request Header_

```
not needed
```

_Request Body Author Name_

```
{
    "author": "<string.min_length(3).required>",
}
```

_Response (200)_

```
{
    "data": {new_author},
    "message": "Success"
}
```

_Response (400 - Author Not Found)_

```
{
    "status": 404,
    "message": "Author Not Found"
}
```

_Response (400 - Author Already Existed)_

```
{
    "status": 404,
    "message": "Author Already Existed"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"author\" length must be more than 3"
}
```

### PUT /api/buku/:id

> Update by id

_Request Params_

```
/<bukuId>
```

_Request Header_

```
not needed
```

_Request Body Author Name_

```
{
    "judulBuku": "<string.min_length(3).required>",
    "authorId": "<author_id>",
    "kategoriBukuId": "<kategori_buku_id>",
}
```

_Response (200)_

```
{
    "data": {update_buku},
    "message": "Success"
}
```

_Response (400 - Author Not Found)_

```
{
    "status": 404,
    "message": "Author Not Found"
}
```

_Response (400 - Kategori Buku Not Found)_

```
{
    "status": 404,
    "message": "Kategori Buku Not Found"
}
```

_Response (400 - Buku Already Existed)_

```
{
    "status": 404,
    "message": "Buku Already Existed"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"judulBuku\" length must be more than 3"
}
```

### PUT /api/kategori/:id

> Update by id

_Request Params_

```
/<kategoriId>
```

_Request Header_

```
not needed
```

_Request Body Kategori Name_

```
{
    "kategori": "<string.min_length(3).required>",

}
```

_Response (200)_

```
{
    "data": {update_kategori},
    "message": "Success"
}
```

_Response (400 - Kategori Buku Not Found)_

```
{
    "status": 404,
    "message": "Kategori Buku Not Found"
}
```

_Response (400 - Kategori Already Existed)_

```
{
    "status": 404,
    "message": "Kategori Already Existed"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"kategori\" length must be more than 3"
}
```

### DELETE /api/author/:id

> Delete author by id

_Request Params_

```
/<author_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Author Not Found"
}
```

### DELETE /api/buku/:id

> Delete buku by id

_Request Params_

```
/<buku_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Buku Not Found"
}
```

### DELETE /api/kategori/:id

> Delete kategori by id

_Request Params_

```
/<kategori_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Kategori Not Found"
}
```
