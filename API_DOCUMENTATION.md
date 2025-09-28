# LEOS API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### 1. User Signup

**POST** `/api/auth/signup`

**Rate Limited:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_id",
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true
  }
}
```

**Error Responses:**

- `400` - Validation Error: "Please provide all required fields"
- `409` - Conflict: "User already exists"
- `429` - Too Many Requests: "Too many requests, please try again later"

---

### 2. User Login

**POST** `/api/auth/login`

**Rate Limited:** 5 requests per 15 minutes

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "full_name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

**Error Responses:**

- `400` - Validation Error: "Please provide email and password"
- `401` - Unauthorized: "Invalid credentials"
- `429` - Too Many Requests: "Too many requests, please try again later"

---

### 3. Forgot Password

**POST** `/api/auth/forgot-password`

**Rate Limited:** 3 requests per 15 minutes

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

**Error Responses:**

- `400` - Validation Error: "Please provide email"
- `404` - Not Found: "User not found"
- `429` - Too Many Requests: "Too many requests, please try again later"

---

### 4. Reset Password

**POST** `/api/auth/reset-password`

**Rate Limited:** 3 requests per 15 minutes

**Request Body:**

```json
{
  "token": "reset_token",
  "password": "newpassword123"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Error Responses:**

- `400` - Validation Error: "Please provide token and password"
- `400` - Invalid Token: "Invalid or expired reset token"
- `429` - Too Many Requests: "Too many requests, please try again later"

---

### 5. Get User Profile

**GET** `/api/auth/profile`

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `401` - Unauthorized: "Access denied. No token provided"
- `401` - Unauthorized: "Access denied. Invalid token"

---

### 6. Logout

**POST** `/api/auth/logout`

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 👥 User Management Endpoints

### 1. Create User

**POST** `/api/users`

**Authentication Required:** Yes

**Request Body:**

```json
{
  "full_name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "role": "user"
}
```

**Success Response (201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "user_id",
    "full_name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "isActive": true
  }
}
```

**Error Responses:**

- `400` - Validation Error: "Please provide all required fields"
- `409` - Conflict: "User already exists"
- `403` - Forbidden: "Access denied. Insufficient permissions"

---

### 2. Get All Users

**GET** `/api/users`

**Authentication Required:** Yes

**Query Parameters:**

- `limit` (optional): Number of users to return (default: 100)
- `skip` (optional): Number of users to skip (default: 0)
- `sort` (optional): Sort field (default: createdAt)

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "user_id",
      "full_name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true
    }
  ],
  "count": 1,
  "pagination": {
    "limit": 100,
    "skip": 0,
    "hasMore": false
  }
}
```

---

### 3. Get User by ID

**GET** `/api/users/:id`

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "full_name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true
  }
}
```

**Error Responses:**

- `404` - Not Found: "User not found"

---

### 4. Update User

**PUT** `/api/users/:id`

**Authentication Required:** Yes

**Request Body:**

```json
{
  "full_name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "user_id",
    "full_name": "John Updated",
    "email": "john.updated@example.com",
    "role": "admin"
  }
}
```

**Error Responses:**

- `404` - Not Found: "User not found"
- `403` - Forbidden: "Access denied. Insufficient permissions"

---

### 5. Delete User

**DELETE** `/api/users/:id`

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Responses:**

- `404` - Not Found: "User not found"
- `403` - Forbidden: "Access denied. Insufficient permissions"

---

## 💰 Finance Reserve Endpoints

### 1. Get All Finance Summaries

**GET** `/api/finance-reserve`

**Query Parameters:**

- `limit` (optional): Number of records to return (default: 100)
- `skip` (optional): Number of records to skip (default: 0)
- `sort` (optional): Sort field (default: { date: -1 })

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "summary_id",
      "entity": {
        "id": "entity_id",
        "entityName": "Entity Name",
        "entityCode": "ENT001"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "totalReserve": 1000000,
      "currency": "AED",
      "dataSource": "api"
    }
  ],
  "count": 1,
  "pagination": {
    "limit": 100,
    "skip": 0,
    "hasMore": false
  }
}
```

---

### 2. Get Finance Summary by Date

**GET** `/api/finance-reserve/:date`

**Path Parameters:**

- `date`: Date in YYYY-MM-DD format

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "summary_id",
    "entity": {
      "id": "entity_id",
      "entityName": "Entity Name",
      "entityCode": "ENT001"
    },
    "date": "2024-01-15T00:00:00.000Z",
    "totalReserve": 1000000,
    "currency": "AED"
  }
}
```

**Error Responses:**

- `400` - Validation Error: "Please provide a valid date"
- `404` - Not Found: "Finance summary not found for the specified date"

---

### 3. Sync Finance Data

**POST** `/api/finance-reserve/sync`

**Request Body:**

```json
{
  "entityId": "entity_id_optional"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Finance data synced successfully",
  "data": {
    "syncedRecords": 5,
    "totalRecords": 5,
    "lastSyncDate": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `500` - Server Error: "Failed to sync finance data"

---

### 4. Get Finance Trends Analysis

**GET** `/api/finance-reserve/trends/analysis`

**Query Parameters:**

- `entityId` (optional): Entity ID to filter by
- `days` (optional): Number of days for trend analysis (default: 30)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "trends": {
      "totalReserve": {
        "current": 1000000,
        "previous": 950000,
        "change": 50000,
        "changePercentage": 5.26
      },
      "growthRate": 5.26,
      "trendDirection": "up"
    },
    "period": {
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-01-15T00:00:00.000Z",
      "days": 15
    }
  }
}
```

---

## 📊 Google Reviews Endpoints

### 1. Fetch User Google Reviews

**POST** `/api/google-reviews/fetch`

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "message": "Google reviews fetched successfully",
  "data": {
    "newReviews": 3,
    "totalReviews": 15,
    "lastFetchDate": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `500` - Server Error: "Failed to fetch Google reviews"

---

### 2. Get User Google Reviews

**GET** `/api/google-reviews`

**Authentication Required:** Yes

**Query Parameters:**

- `from` (optional): Start date in YYYY-MM-DD format
- `to` (optional): End date in YYYY-MM-DD format

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "review_id",
      "user": "user_id",
      "date": "2024-01-15T00:00:00.000Z",
      "starRating": 5,
      "reviewer": "John Doe",
      "comment": "Great service!",
      "avgRating": 4.5,
      "totalReviewCount": 10
    }
  ],
  "count": 1
}
```

---

### 3. Get Review Statistics

**GET** `/api/google-reviews/statistics`

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "totalReviews": 15,
    "averageRating": 4.5,
    "ratingDistribution": {
      "5": 8,
      "4": 4,
      "3": 2,
      "2": 1,
      "1": 0
    },
    "recentReviews": 3,
    "positiveReviews": 12,
    "negativeReviews": 1
  }
}
```

---

### 4. Get All Google Reviews (Admin)

**GET** `/api/google-reviews/all`

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "review_id",
      "user": "user_id",
      "date": "2024-01-15T00:00:00.000Z",
      "starRating": 5,
      "reviewer": "John Doe",
      "comment": "Great service!",
      "avgRating": 4.5,
      "totalReviewCount": 10
    }
  ],
  "count": 1
}
```

---

## 📱 Social Media Endpoints

### 1. Get Social Media Stats

**GET** `/api/social-media/stats`

**Query Parameters:**

- `platform` (required): Platform name (e.g., "Instagram", "Facebook")
- `entityId` (optional): Entity ID to filter by

**Example:** `GET /api/social-media/stats?platform=Instagram&entityId=68d3ef7b3aedf547be3ddfe9`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "platform": "Instagram",
    "followers": 10000,
    "likes": 5000,
    "views": 25000,
    "reach": 15000,
    "impressions": 20000,
    "clicks": 1000,
    "engagement": 500,
    "posts": 25,
    "engagementRate": 5.0,
    "lastUpdated": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `400` - Validation Error: "Platform is required"

---

### 2. Get Social Media Trends

**GET** `/api/social-media/trends`

**Query Parameters:**

- `platform` (optional): Platform name
- `entityId` (optional): Entity ID to filter by
- `days` (optional): Number of days for trend analysis (default: 30)

**Example:** `GET /api/social-media/trends?platform=Instagram&entityId=68d3ef7b3aedf547be3ddfe9&days=30`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "trends": {
      "followers": {
        "current": 10000,
        "previous": 9500,
        "change": 500,
        "changePercentage": 5.26
      },
      "engagement": {
        "current": 5.0,
        "previous": 4.8,
        "change": 0.2,
        "changePercentage": 4.17
      }
    },
    "growthRate": 5.26,
    "trendDirection": "up",
    "period": {
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-01-15T00:00:00.000Z",
      "days": 15
    }
  }
}
```

---

### 3. Get Platform Comparison

**GET** `/api/social-media/compare`

**Query Parameters:**

- `entityId` (optional): Entity ID to filter by

**Example:** `GET /api/social-media/compare?entityId=68d3ef7b3aedf547be3ddfe9`

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "platforms": [
      {
        "platform": "Instagram",
        "followers": 10000,
        "engagementRate": 5.0,
        "performance": "high"
      },
      {
        "platform": "Facebook",
        "followers": 8000,
        "engagementRate": 3.5,
        "performance": "medium"
      }
    ],
    "bestPerforming": "Instagram",
    "totalFollowers": 18000,
    "averageEngagement": 4.25
  }
}
```

---

## 👥 HR Data Endpoints

### 1. Save HR Data

**POST** `/api/hr/save-data`

**Request Body:**

```json
{
  "employeeName": "John Doe",
  "department": "Engineering",
  "salary": 50000,
  "hireDate": "2024-01-01"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Data saved successfully",
  "file": "20240115-103000-1705312200000.json",
  "payload": {
    "employeeName": "John Doe",
    "department": "Engineering",
    "salary": 50000,
    "hireDate": "2024-01-01"
  }
}
```

**Error Responses:**

- `400` - Validation Error: "Payload is empty"
- `500` - Server Error: "Failed to write file to storage"

---

## 🔧 Health Check

### Health Check

**GET** `/api/health` or `/health`

**Success Response (200):**

```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "development"
}
```

---

## 📝 Common Error Responses

### Validation Error (400)

```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Please provide all required fields",
  "statusCode": 400
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Access denied. No token provided",
  "statusCode": 401
}
```

### Forbidden (403)

```json
{
  "success": false,
  "error": "Forbidden",
  "message": "Access denied. Insufficient permissions",
  "statusCode": 403
}
```

### Not Found (404)

```json
{
  "success": false,
  "error": "Not Found",
  "message": "Resource not found",
  "statusCode": 404
}
```

### Conflict (409)

```json
{
  "success": false,
  "error": "Conflict",
  "message": "Resource already exists",
  "statusCode": 409
}
```

### Too Many Requests (429)

```json
{
  "success": false,
  "error": "Too Many Requests",
  "message": "Too many requests, please try again later",
  "statusCode": 429
}
```

### Server Error (500)

```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Something went wrong",
  "statusCode": 500
}
```

---

## 🔒 Security Features

- **Rate Limiting**: Applied to authentication endpoints
- **JWT Authentication**: Required for protected routes
- **Input Sanitization**: XSS protection on all inputs
- **Request ID Tracking**: Each request gets a unique ID
- **Response Time Monitoring**: Performance tracking headers
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: Additional security headers

---

## 📊 Response Headers

All responses include these headers:

- `X-Request-ID`: Unique request identifier
- `X-Response-Time`: Response time in milliseconds
- `Content-Type`: application/json
- `Access-Control-Allow-Origin`: CORS configuration

---

## 🚀 Postman Collection Setup

1. **Base URL**: `http://localhost:5000/api`
2. **Authentication**: Bearer Token in Authorization header
3. **Content-Type**: `application/json` for POST/PUT requests
4. **Rate Limiting**: Respect the rate limits mentioned above

### Environment Variables for Postman:

- `base_url`: `http://localhost:5000/api`
- `auth_token`: `{{jwt_token_from_login_response}}`

### Pre-request Scripts:

```javascript
// Set authorization header if token exists
if (pm.environment.get("auth_token")) {
  pm.request.headers.add({
    key: "Authorization",
    value: "Bearer " + pm.environment.get("auth_token"),
  });
}
```

### Test Scripts for Login:

```javascript
// Save token to environment
if (pm.response.code === 200) {
  const response = pm.response.json();
  if (response.data && response.data.token) {
    pm.environment.set("auth_token", response.data.token);
  }
}
```

---

## 📋 Testing Checklist

### Authentication Flow:

1. ✅ Signup with valid data
2. ✅ Login with credentials
3. ✅ Access protected routes with token
4. ✅ Test token expiration
5. ✅ Test invalid credentials

### Error Handling:

1. ✅ Test validation errors
2. ✅ Test unauthorized access
3. ✅ Test rate limiting
4. ✅ Test server errors

### Data Operations:

1. ✅ Test CRUD operations
2. ✅ Test pagination
3. ✅ Test filtering and sorting
4. ✅ Test data validation

---

_Last Updated: January 15, 2024_
_API Version: 1.0_
