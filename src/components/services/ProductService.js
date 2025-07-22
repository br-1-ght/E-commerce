// services/ProductService.js
class ProductService {
  static async fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      const uniqueCategories = [...new Set(data.map(product => product.category))];
      
      return {
        products: data,
        categories: uniqueCategories
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static filterProducts(products, filters) {
    const { searchTerm, selectedCategory, priceRange } = filters;
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => product.price <= priceRange);

    return filtered;
  }
}

export default ProductService;