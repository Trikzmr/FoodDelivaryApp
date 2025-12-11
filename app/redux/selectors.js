// User selectors
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
export const selectUserAddresses = (state) => state.user.addresses;
export const selectActiveAddress = (state) => state.user.activeAddress;
export const selectRecentSearches = (state) => state.user.recentSearches;

// Cart selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartDeliveryFee = (state) => state.cart.deliveryFee;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Products selectors
export const selectAllProducts = (state) => state.products.allProducts;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectCategories = (state) => state.products.categories;
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;

// Orders selectors
export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;

// Wishlist selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistLoading = (state) => state.wishlist.isLoading;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectWishlistItemCount = (state) => state.wishlist.items.length;

// Filter selectors
export const selectSelectedCategory = (state) => state.filter.selectedCategory;
export const selectSearchQuery = (state) => state.filter.searchQuery;
export const selectSortBy = (state) => state.filter.sortBy;
export const selectPriceRange = (state) => state.filter.priceRange;
export const selectSelectedZone = (state) => state.filter.selectedZone;
