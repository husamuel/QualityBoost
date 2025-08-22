import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from '../components/ProductList';

const mockProducts = [
  { id: 1, name: 'Test Product 1', price: 19.99, category: 'Test Category 1' },
  { id: 2, name: 'Test Product 2', price: 29.99, category: 'Test Category 2' }
];

describe('ProductList', () => {
  test('renders product list with products', () => {
    const mockDelete = jest.fn();
    render(<ProductList products={mockProducts} onDeleteProduct={mockDelete} />);
    
    expect(screen.getByText('Products (2)')).toBeInTheDocument();
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
  });

  test('renders empty state when no products', () => {
    const mockDelete = jest.fn();
    render(<ProductList products={[]} onDeleteProduct={mockDelete} />);
    
    expect(screen.getByTestId('no-products')).toBeInTheDocument();
    expect(screen.getByText('No products available.')).toBeInTheDocument();
  });

  test('calls onDeleteProduct when delete button is clicked', () => {
    const mockDelete = jest.fn();
    render(<ProductList products={mockProducts} onDeleteProduct={mockDelete} />);
    
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  test('renders correct number of product items', () => {
    const mockDelete = jest.fn();
    render(<ProductList products={mockProducts} onDeleteProduct={mockDelete} />);
    
    const productItems = screen.getAllByTestId('product-item');
    expect(productItems).toHaveLength(2);
  });
});