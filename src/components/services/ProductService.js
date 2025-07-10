// services/ProductService.js
class ProductService {
  static async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(product => product.category))];
      
      return {
        products: data,
        categories: uniqueCategories
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  static filterProducts(products, filters) {
    const { searchTerm, selectedCategory, priceRange } = filters;
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => product.price <= priceRange);

    return filtered;
  }
}

export default ProductService;