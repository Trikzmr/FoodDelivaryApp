# Redux Store Setup Guide

## Overview
Redux store has been set up with Redux Toolkit for the Food Delivery App with the following features:
- User authentication and profile management
- Cart management with discount calculations
- Products and categories management
- Orders tracking
- Wishlist management
- Filter and search functionality

## Project Structure
```
app/
├── redux/
│   ├── store.js              # Redux store configuration
│   ├── selectors.js          # Redux selectors
│   ├── hooks.js              # Custom hooks for easy Redux usage
│   └── slices/
│       ├── userSlice.js      # User authentication & profile
│       ├── cartSlice.js      # Shopping cart
│       ├── productsSlice.js  # Products and categories
│       ├── ordersSlice.js    # Orders management
│       ├── wishlistSlice.js  # Wishlist
│       └── filterSlice.js    # Filters and search
```

## Store Slices

### 1. User Slice (userSlice.js)
Manages user authentication, profile, and addresses.

**State:**
```javascript
{
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  activeAddress: null,
  addresses: [],
  recentSearches: []
}
```

**Available Actions:**
- `loginRequest/Success/Failure` - Handle login
- `registerRequest/Success/Failure` - Handle registration
- `logout` - Clear user data
- `updateProfileRequest/Success/Failure` - Update user profile
- `setAddresses` - Set user addresses
- `addAddress` - Add new address
- `removeAddress` - Remove address
- `setActiveAddress` - Set active delivery address
- `addRecentSearch` - Add to recent searches
- `clearRecentSearches` - Clear search history

### 2. Cart Slice (cartSlice.js)
Manages shopping cart, calculations, and coupon codes.

**State:**
```javascript
{
  items: [],
  subtotal: 0,
  tax: 0,
  deliveryFee: 0,
  total: 0,
  coupon: null,
  discount: 0
}
```

**Available Actions:**
- `addToCart` - Add item to cart
- `updateCartItem` - Update item quantity
- `removeFromCart` - Remove item from cart
- `clearCart` - Clear entire cart
- `applyCoupon` - Apply coupon code
- `removeCoupon` - Remove coupon
- `setDeliveryFee` - Set delivery fee
- `setTax` - Set tax amount

### 3. Products Slice (productsSlice.js)
Manages products, categories, and product filtering.

**State:**
```javascript
{
  allProducts: [],
  filteredProducts: [],
  categories: [],
  isLoading: false,
  error: null,
  selectedProduct: null
}
```

**Available Actions:**
- `fetchProductsRequest/Success/Failure` - Fetch all products
- `fetchCategoriesRequest/Success/Failure` - Fetch categories
- `filterByCategory` - Filter products by category
- `searchProducts` - Search products
- `getHotPicks` - Get featured products
- `getPopularItems` - Get popular products
- `getMustTryItems` - Get must-try products
- `setSelectedProduct` - Set currently selected product
- `clearSelectedProduct` - Clear selection

### 4. Orders Slice (ordersSlice.js)
Manages orders and order tracking.

**State:**
```javascript
{
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null
}
```

**Available Actions:**
- `createOrderRequest/Success/Failure` - Create new order
- `fetchOrdersRequest/Success/Failure` - Fetch all orders
- `getOrderRequest/Success/Failure` - Get order details
- `cancelOrderRequest/Success/Failure` - Cancel order
- `updateOrderStatus` - Update order status (real-time)
- `updateDeliveryLocation` - Update rider location
- `clearCurrentOrder` - Clear current order

### 5. Wishlist Slice (wishlistSlice.js)
Manages user's wishlist.

**State:**
```javascript
{
  items: [],
  isLoading: false,
  error: null
}
```

**Available Actions:**
- `addToWishlist` - Add product to wishlist
- `removeFromWishlist` - Remove product from wishlist
- `fetchWishlistRequest/Success/Failure` - Fetch wishlist
- `clearWishlist` - Clear all wishlist items

### 6. Filter Slice (filterSlice.js)
Manages filters and search parameters.

**State:**
```javascript
{
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'popular',
  priceRange: { min: 0, max: 1000 },
  selectedZone: null
}
```

**Available Actions:**
- `setSelectedCategory` - Set category filter
- `setSearchQuery` - Set search query
- `setSortBy` - Set sorting option
- `setPriceRange` - Set price range
- `setSelectedZone` - Set zone (for geo-fence)
- `resetFilters` - Reset all filters

## Custom Hooks

The `hooks.js` file provides custom hooks for easy access to Redux state and actions.

### useCart()
```javascript
import { useCart } from './redux/hooks';

const MyComponent = () => {
  const { 
    items, 
    subtotal, 
    total, 
    itemCount, 
    addToCart, 
    removeFromCart,
    clearCart 
  } = useCart();

  return (
    // Use cart data and actions
  );
};
```

### useProducts()
```javascript
import { useProducts } from './redux/hooks';

const ProductsList = () => {
  const { 
    filteredProducts, 
    categories, 
    isLoading,
    filterByCategory,
    searchProducts 
  } = useProducts();

  return (
    // Use products data and actions
  );
};
```

### useAuth()
```javascript
import { useAuth } from './redux/hooks';

const Profile = () => {
  const { 
    user, 
    isAuthenticated, 
    addresses, 
    activeAddress,
    logout 
  } = useAuth();

  return (
    // Use auth data and actions
  );
};
```

### useOrders()
```javascript
import { useOrders } from './redux/hooks';

const OrdersScreen = () => {
  const { 
    orders, 
    currentOrder, 
    isLoading 
  } = useOrders();

  return (
    // Use orders data
  );
};
```

### useWishlist()
```javascript
import { useWishlist } from './redux/hooks';

const Wishlist = () => {
  const { 
    items, 
    itemCount,
    addToWishlist,
    removeFromWishlist 
  } = useWishlist();

  return (
    // Use wishlist data and actions
  );
};
```

## Selectors

Direct Redux selectors are available in `selectors.js` for advanced usage:

```javascript
import { useSelector } from 'react-redux';
import * as selectors from './redux/selectors';

const Component = () => {
  const user = useSelector(selectors.selectUser);
  const cartTotal = useSelector(selectors.selectCartTotal);
  const products = useSelector(selectors.selectFilteredProducts);
  
  return (
    // Use selected data
  );
};
```

## Usage Examples

### Example 1: Adding to Cart
```javascript
import { useCart } from './redux/hooks';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.imageURL,
      quantity: 1,
      size: 'M'
    });
  };

  return (
    <TouchableOpacity onPress={handleAddToCart}>
      <Text>Add to Cart</Text>
    </TouchableOpacity>
  );
};
```

### Example 2: Login
```javascript
import { useAuth } from './redux/hooks';
import { loginSuccess } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useAuth();

  const handleLogin = async (email, password) => {
    try {
      // Call your API
      const response = await loginAPI(email, password);
      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }));
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Login form
  );
};
```

### Example 3: Search Products
```javascript
import { useProducts } from './redux/hooks';

export const SearchScreen = () => {
  const { filteredProducts, searchProducts } = useProducts();

  const handleSearch = (query) => {
    searchProducts(query);
  };

  return (
    // Search UI
  );
};
```

## Integration with API

To integrate with your backend API, you'll need to create async thunks:

```javascript
// redux/thunks/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios'; // Your axios instance

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```

Then handle in the slice:
```javascript
const userSlice = createSlice({
  // ... existing code
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});
```

## Installation Required

Make sure you have installed the required packages:
```bash
npm install @reduxjs/toolkit react-redux
```

## Best Practices

1. **Use Custom Hooks**: Prefer using custom hooks from `hooks.js` instead of directly using `useSelector` and `useDispatch`.

2. **Keep Selectors Pure**: Selectors should not modify state.

3. **Normalize State**: Keep state as flat as possible.

4. **Use Thunks for Async**: Create async thunks for API calls.

5. **Error Handling**: Always handle errors in your components.

6. **Persistence**: Consider using `redux-persist` for persisting state to AsyncStorage.

7. **DevTools**: Use Redux DevTools for debugging in development.

## Next Steps

1. Install missing Redux packages if not already installed
2. Integrate with your backend API endpoints
3. Create async thunks for all API calls
4. Add Redux middleware for logging (optional)
5. Set up error boundaries for better error handling
