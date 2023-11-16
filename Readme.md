# Pokemon API

Basic express.js project with basic routes:
* Express
* Joi
* Fs
* Sequelize

---

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### GET /product

> read product

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
    "data": [<data_product>],
    "message": "Success read product"
}
```

---

### GET /category

> Get category

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

    "data": {<data_category>},
    "message": "Success read all category"

}
```

---

### GET /detail/:id

 > Get by id

_Request Params_

```
<type_id>/<productId>

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
    "data": {
        "name" : "<name>",
        "description" : "<description>",
        "price" : "<price>",
        "category" : "<category>"
        "image" : "<image>"
        "Category": {
            "name": "<name>"
        },
        "Product_Suppliers": [
            {
                "supplierId": <supplierId>,
                "Supplier": {
                    "id": <id>,
                    "name": "<name>",
                }
            }
        ]
    },
    "message": "Success read detail product"
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

---
### POST /product

> post product

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
  "description" : "<description>",
  "price" : "<price>",
  "category" : "<category>",
  "image" : "<image>",
  "categoryId" : "<categoryId>",
  "sellerId" : "<sellerId>",
  "nameSupplier" : "<nameSupplier>"
}
```

_Response (200)_
```
{
  "data": [
    createProduct": {
      <data_product>
    },
    createConjuntion: {
      <data_conjuntion>
    }
  ],
   "message": "Success Add product"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

---

### PUT /product

> put product

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
  "description" : "<description>",
  "price" : "<price>",
  "category" : "<category>",
  "image" : "<image>",
  "categoryId" : "<categoryId>",
  "sellerId" : "<sellerId>",
}
```

_Response (200)_
```
{
  "data": [
    createProduct": {
      <data_product>
    },
  ],
   "message": "Success Add product"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /product

> Delete by name

_Request Params_
```
/<type_id>/<id>
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
    "data": [<data_product>],
    "message": "Product with id ${id} has been   deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### POST /category

> post category

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
}
```

_Response (200)_
```
{
  "data": [
    createdCategory": {
      <data_category>
    },
  ],
   "message": "Success add category"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

_Response (400 - Validation Error)_
```
{
    "message": "Category with the same name already exists."
}
```

---

### PUT /category

> put category

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name" : "<name>",
}
```

_Response (200)_
```
{
  "data": [
    data": {
      <data_category>
    },
  ],
   "message": "Success Edit category"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /category

> Delete by id

_Request Params_
```
/<type_id>/<id>
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
    "message": "Category with id ${id} has been deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### GET /seller

> Get seller

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

    "data": {
        "shop" : "<shop>",
    },
    "status": "Success read all seller"

}
```

---

### GET /seller/:id

 > Get by id

_Request Params_

```
<type_id>/<id>

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
    "data": {
        "shop" : "<shop>",
    },
    "message": "Success read detail product"
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

---

### POST /seller

> post seller

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "shop" : "<shop>",
  "name" : "<name>",
  "description" : "<description>",
  "price" : "<price>",
  "category" : "<category>",
  "image" : "<image>",
  "categoryId" : "<categoryId>",
  "sellerId" : "<sellerId>",
  "supplierName" : "<supplierName>"
}
```

_Response (200)_
```
{
  "data": [
    createSeller": {
      <data_seller>
    },
    createProduct: {
      <data_product>
    }
  ],
   "message": "successfully added new stores and first items"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

---

### PUT /seller

> PUT seller

_Request Params_
```
<type_id>/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "shop" : "<shop>",
}
```

_Response (200)_
```
{
  "data": [
    data": {
      <data_seller>
    }
  ],
   "message": "Success edit seller/Store"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

---

### DELETE /seller

> Delete by id

_Request Params_
```
/<type_id>/<id>
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
    "message": "Store with id ${id} and his product has been deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---