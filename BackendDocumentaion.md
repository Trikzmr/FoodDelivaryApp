# Food Delivery App Backend Documentation

## Database Schemas

### 1. User Schema
```javascript
{
  _id: String,
  username: String,
  fullname: String,
  mobileNumber: String,
  profileUrl: String,
  addressID: String,
  Dob: Date,
  password: String,
  recentSearches: [String]
}
```

### 2. Category Schema
```javascript
{
  id: ObjectId,
  name: String,
  imageUrl: String,
  isActive: Boolean,
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```


### 3. Product Schema
```javascript
{
  id: ObjectId,
  name: String,
  description: String,
  price: Number,
  restaurentID: String,
  imageURL: String,
  moreImages: [String],
  category: ObjectId,
  rating: Number,
  sizes: [{ size: String, price: Number }],
  ingredients: [String],
  isFeatured: Boolean,
  isPopular: Boolean,
  isMustTry: Boolean,
  isAvailable: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Order Schema
```javascript
{
  id: ObjectId,
  userId: ObjectId,
  items: [{ productId: ObjectId, quantity: Number, size: String, price: Number }],
  status: String, // pending, confirmed, preparing, out_for_delivery, delivered, cancelled
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  total: Number,
  couponApplied: { code: String, discount: Number },
  paymentMethod: String,
  paymentStatus: String,
  deliveryAddress: { location: { lat: Number, lng: Number }, details: String },
  RiderLocation: { lat: Number, lng: Number },
  createdAt: Date,
  updatedAt: Date
}
```
### 5. Wishlist
```javascript
{
  _id: String,
  productId: String,
  userID: String
}
```

### 6. Address Schema
```javascript
{
  _id: String,
  location: { lat: Number, lng: Number },
  Address: String,
  userId: String,
  type: String, // Home, Work, Friends, Others
  note: String,
  contactNo: String
}
```

### 7. Zone Schema
```javascript
{
  _id: String,
  name: String,
  description: String,
  geoFence: [{ lat: Number, long: Number }]
}
```

### 8. Restaurent Schema
```javascript
{
  _id: String,
  name: String,
  zoneId: [String],
  Cordinates: { lat: Number, long: Number },
  description: String,
  imageUrl: String,
  moreImages: [String]
}
```

### 9. Cart

## API Endpoints

### Authentication
```
POST /api/auth/register
Request:
{
  name: String,
  email: String,
  password: String,
  phone: String
}
Response:
{
  token: String,
  user: UserObject
}

POST /api/auth/login
Request:
{
  email: String,
  password: String
}
Response:
{
  token: String,
  user: UserObject
}
```

### User Profile
```
GET /api/user/profile
Headers: Authorization: Bearer <token>
Response: UserObject

PUT /api/user/profile
Headers: Authorization: Bearer <token>
Request:
{
  name: String,
  phone: String
}
Response: UserObject

GET /api/user/address
Headers: Authorization: Bearer <token>

Response: Array[AddressObject]

Get /api/user/activeAddress
Headers: Authorization: Bearer <token>

Response: AddressObject

POST /api/user/addActiveAddress
Headers: Authorization: Bearer <token>

Request: {
    addressID: "String"
}

Response : "String"

```

### Categories
```
GET /api/categories
Response: Array<CategoryObject>

Post /api/categories/add

Request:
```

### Products
```
GET /api/products
Query Parameters:
- search: String
- category: String
- featured: Boolean
- popular: Boolean
- mustTry: Boolean
Response: Array<ProductObject>

GET /api/products/:id
Response: ProductObject

GET /api/products/hot-picks
Response: Array<ProductObject>

GET /api/products/popular
Response: Array<ProductObject>

GET /api/products/must-try
Response: Array<ProductObject>
```

### Orders
```
POST /api/orders
Headers: Authorization: Bearer <token>
Request:
{
  restaurantId: String,
  items: [{
    productId: String,
    quantity: Number,
    size: String
  }],
  deliveryAddress: {
    location: {
      lat: Number,
      lng: Number
    },
    details: String
  },
  paymentMethod: String,
  couponCode: String (optional)
}
Response: OrderObject

GET /api/orders
Headers: Authorization: Bearer <token>
Query Parameters:
- status: String
Response: Array<OrderObject>

GET /api/orders/:id
Headers: Authorization: Bearer <token>
Response: OrderObject

PUT /api/orders/:id/cancel
Headers: Authorization: Bearer <token>
Response: OrderObject
```

### Cart
```
GET /api/cart
Headers: Authorization: Bearer <token>
Response: {
  items: Array<CartItem>,
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  total: Number
}

POST /api/cart/items
Headers: Authorization: Bearer <token>
Request:
{
  productId: String,
  quantity: Number,
  size: String
}
Response: Updated CartObject

DELETE /api/cart/items/:itemId
Headers: Authorization: Bearer <token>
Response: Updated CartObject
```

### Coupons
```
GET /api/coupons
Headers: Authorization: Bearer <token>
Response: Array<CouponObject>

POST /api/coupons/verify
Headers: Authorization: Bearer <token>
Request:
{
  code: String,
  cartTotal: Number
}
Response: {
  valid: Boolean,
  discount: Number
}
```

## File Upload Endpoints
```
POST /api/upload/image
Headers: 
- Authorization: Bearer <token>
- Content-Type: multipart/form-data
Body:
- file: Image File (jpg, png, jpeg)
Response:
{
  url: String
}
```

## Middleware

### 1. Authentication Middleware
- Validates JWT token
- Adds user object to request
- Handles expired tokens

### 2. Error Handling Middleware
- Catches and formats all errors
- Sends appropriate status codes
- Logs errors for monitoring

### 3. Request Validation Middleware
- Validates request body/params
- Sanitizes input data
- Prevents malicious requests

### 4. File Upload Middleware
- Validates file types
- Limits file size
- Handles file storage

### 5. Rate Limiting Middleware
- Prevents abuse
- Limits requests per IP
- Configurable thresholds

### 6. CORS Middleware
- Handles cross-origin requests
- Configures allowed origins
- Manages preflight requests

### 7. Geo-Fence & Zone Middleware
- Checks if the user's current address is within a defined geo-fence (zone)
- Determines the user's zone based on address coordinates
- Filters and lists only restaurants and products available in the user's zone
- Returns an error or empty list if the address is outside all zones

**Usage:**
This middleware should be applied to all endpoints that list restaurants or products, ensuring users only see options available in their current zone.


## Environment Variables
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=your_jwt_secret
Cloudnary keys 
```