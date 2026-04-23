# Backend User Creation Flow

This document explains the complete flow of user creation in the backend application, from the API endpoint to the database storage.

## API Endpoint

**POST** `/api/auth/register`

This endpoint handles user registration with the following validations:
- `name.firstname`: Minimum 3 characters
- `email`: Valid email format, minimum 5 characters
- `password`: Minimum 6 characters

## Request Flow

### 1. Route Handler (`auth.route.js`)
- Validates request body using `express-validator`
- Forwards to `authController.register` if validation passes

### 2. Controller (`user.controller.js`)
The `register` function performs the following steps:

1. **Validation Check**
   - Uses `validationResult(req)` to check for validation errors
   - Returns `400` status with error array if validation fails

2. **User Existence Check**
   - Queries database for existing user with same email
   - Throws error if user already exists

3. **Password Hashing**
   - Calls `userModel.hashPassword(password)` to hash the password using bcrypt

4. **User Creation**
   - Calls `userService.createUser()` with user data
   - Creates user in database

5. **Token Generation**
   - Calls `user.generateAuthToken()` to create JWT token
   - Sets HTTP-only cookie with the token

6. **Response**
   - Returns `201` status with success message and user data

### 3. Service Layer (`user.service.js`)
The `createUser` function:
- Validates required fields (firstname, email, password)
- Creates user document in MongoDB using the User model

### 4. Model Layer (`user.model.js`)
The User model includes:
- Schema validation for all fields
- Password hashing static method
- JWT token generation method
- Password comparison method

## Status Codes

- **201**: User created successfully
- **400**: Validation errors or user already exists

## Request Body Example

```json
{
  "name": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response Examples

### Success (201)
```json
{
  "message": "User created successfully",
  "user": {
    "name": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "_id": "...",
    // other user fields
  }
}
```

### Validation Error (400)
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "name.firstname",
      "location": "body"
    }
  ]
}
```

### User Exists Error (400)
```json
{
  "error": "User already exists with this email"
}
```