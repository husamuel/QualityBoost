import React from 'react';

const ProductList = ({ products, onDeleteProduct }) => {
  if (products.length === 0) {
    return (
      <div>
        <h2>Products</h2>
        <p data-testid="no-products">No products available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Products ({products.length})</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {products.map(product => (
          <div 
            key={product.id} 
            data-testid="product-item"
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
            <p style={{ margin: '5px 0' }}>
              <strong>Price:</strong> ${product.price}
            </p>
            <p style={{ margin: '5px 0' }}>
              <strong>Category:</strong> {product.category}
            </p>
            <button
              onClick={() => onDeleteProduct(product.id)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              data-testid="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;