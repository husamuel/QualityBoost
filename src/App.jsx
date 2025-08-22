import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

// Mock initial data
const initialProducts = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Coffee Mug', price: 12.99, category: 'Home' },
  { id: 3, name: 'Running Shoes', price: 89.99, category: 'Sports' }
];

function App() {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now() // Simple ID generation for demo
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Product Management</h1>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <ProductForm onAddProduct={addProduct} />
        </div>
        <div style={{ flex: 2, minWidth: '400px' }}>
          <ProductList products={products} onDeleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  );
}

export default App;