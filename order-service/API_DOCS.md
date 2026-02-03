# Order Service API Documentation

## Overview

Order Service API provides endpoints for managing orders in the GrocerEase system.

## Base URL

```
http://localhost:3001/api
```

## Endpoints

### Health Check

- **GET** `/health`
- **Description**: Verify service is running
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order Service is running",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
  ```

---

## Implemented Endpoints

### Get All Orders

- **GET** `/orders`
- **Description**: Retrieve all orders with pagination
- **Query Parameters**:
  - `page` (optional, default: 1): Page number for pagination
  - `limit` (optional, default: 10, max: 100): Number of orders per page
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "customer_id": "cust_123",
        "status": "pending",
        "total": 99.99,
        "created_at": "2024-01-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
  ```

### Get Order by ID

- **GET** `/orders/:id`
- **Description**: Retrieve a specific order
- **Parameters**:
  - `id` (path): Order ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "customer_id": "cust_123",
      "status": "pending",
      "total": 99.99,
      "created_at": "2024-01-01T12:00:00.000Z"
    }
  }
  ```

---

## TODO - Endpoints to be implemented

### Create Order

- **POST** `/orders`
- **Description**: Create a new order
- **Request Body**:
  ```json
  {
    "customerId": "string",
    "items": [
      {
        "productId": "string",
        "quantity": "number"
      }
    ],
    "shippingAddress": "string"
  }
  ```

### Update Order

- **PUT** `/orders/:id`
- **Description**: Update an existing order
- **Parameters**:
  - `id` (path): Order ID

### Delete Order

- **DELETE** `/orders/:id`
- **Description**: Delete an order
- **Parameters**:
  - `id` (path): Order ID

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

---

**Last Updated**: February 3, 2026
