import { useDispatch, useSelector } from 'react-redux';
import * as selectors from './selectors';
import {
  addToCart,
  applyCoupon,
  clearCart,
  removeCoupon,
  removeFromCart,
  updateCartItem,
} from './slices/cartSlice';
import {
  filterByCategory,
  getHotPicks,
  getMustTryItems,
  getPopularItems,
  searchProducts,
  setSelectedProduct,
} from './slices/productsSlice';
import {
  addAddress,
  addRecentSearch,
  logout,
  removeAddress,
  setActiveAddress,
} from './slices/userSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from './slices/wishlistSlice';

// Cart hooks
export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectors.selectCartItems);
  const subtotal = useSelector(selectors.selectCartSubtotal);
  const tax = useSelector(selectors.selectCartTax);
  const deliveryFee = useSelector(selectors.selectCartDeliveryFee);
  const total = useSelector(selectors.selectCartTotal);
  const itemCount = useSelector(selectors.selectCartItemCount);
  const coupon = useSelector(selectors.selectCartCoupon);
  const discount = useSelector(selectors.selectCartDiscount);

  return {
    items,
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    coupon,
    discount,
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (payload) => dispatch(removeFromCart(payload)),
    updateCartItem: (payload) => dispatch(updateCartItem(payload)),
    clearCart: () => dispatch(clearCart()),
    applyCoupon: (coupon) => dispatch(applyCoupon(coupon)),
    removeCoupon: () => dispatch(removeCoupon()),
  };
};

// Products hooks
export const useProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(selectors.selectAllProducts);
  const filteredProducts = useSelector(selectors.selectFilteredProducts);
  const categories = useSelector(selectors.selectCategories);
  const isLoading = useSelector(selectors.selectProductsLoading);
  const error = useSelector(selectors.selectProductsError);
  const selectedProduct = useSelector(selectors.selectSelectedProduct);

  return {
    allProducts,
    filteredProducts,
    categories,
    isLoading,
    error,
    selectedProduct,
    filterByCategory: (categoryId) => dispatch(filterByCategory(categoryId)),
    searchProducts: (query) => dispatch(searchProducts(query)),
    getHotPicks: () => dispatch(getHotPicks()),
    getPopularItems: () => dispatch(getPopularItems()),
    getMustTryItems: () => dispatch(getMustTryItems()),
    setSelectedProduct: (product) => dispatch(setSelectedProduct(product)),
  };
};

// User hooks
export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.selectUser);
  const token = useSelector(selectors.selectToken);
  const isAuthenticated = useSelector(selectors.selectIsAuthenticated);
  const isLoading = useSelector(selectors.selectUserLoading);
  const error = useSelector(selectors.selectUserError);
  const addresses = useSelector(selectors.selectUserAddresses);
  const activeAddress = useSelector(selectors.selectActiveAddress);
  const recentSearches = useSelector(selectors.selectRecentSearches);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    addresses,
    activeAddress,
    recentSearches,
    logout: () => dispatch(logout()),
    addAddress: (address) => dispatch(addAddress(address)),
    removeAddress: (id) => dispatch(removeAddress(id)),
    setActiveAddress: (address) => dispatch(setActiveAddress(address)),
    addRecentSearch: (search) => dispatch(addRecentSearch(search)),
  };
};

// Orders hooks
export const useOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectors.selectOrders);
  const currentOrder = useSelector(selectors.selectCurrentOrder);
  const isLoading = useSelector(selectors.selectOrdersLoading);
  const error = useSelector(selectors.selectOrdersError);

  return {
    orders,
    currentOrder,
    isLoading,
    error,
  };
};

// Wishlist hooks
export const useWishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectors.selectWishlistItems);
  const isLoading = useSelector(selectors.selectWishlistLoading);
  const error = useSelector(selectors.selectWishlistError);
  const itemCount = useSelector(selectors.selectWishlistItemCount);

  return {
    items,
    isLoading,
    error,
    itemCount,
    addToWishlist: (product) => dispatch(addToWishlist(product)),
    removeFromWishlist: (productId) => dispatch(removeFromWishlist(productId)),
  };
};
