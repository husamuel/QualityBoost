import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductForm from '../components/ProductForm';

// Mock window.alert
global.alert = jest.fn();

describe('ProductForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with all input fields', () => {
    const mockAdd = jest.fn();
    render(<ProductForm onAddProduct={mockAdd} />);
    
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('price-input')).toBeInTheDocument();
    expect(screen.getByTestId('category-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('updates input values when typing', async () => {
    const user = userEvent.setup();
    const mockAdd = jest.fn();
    render(<ProductForm onAddProduct={mockAdd} />);
    
    const nameInput = screen.getByTestId('name-input');
    const priceInput = screen.getByTestId('price-input');
    const categoryInput = screen.getByTestId('category-input');
    
    await user.type(nameInput, 'Test Product');
    await user.type(priceInput, '99.99');
    await user.type(categoryInput, 'Test Category');
    
    expect(nameInput.value).toBe('Test Product');
    expect(priceInput.value).toBe('99.99');
    expect(categoryInput.value).toBe('Test Category');
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    const mockAdd = jest.fn();
    render(<ProductForm onAddProduct={mockAdd} />);
    
    await user.type(screen.getByTestId('name-input'), 'Test Product');
    await user.type(screen.getByTestId('price-input'), '99.99');
    await user.type(screen.getByTestId('category-input'), 'Test Category');
    
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(mockAdd).toHaveBeenCalledWith({
      name: 'Test Product',
      price: 99.99,
      category: 'Test Category'
    });
  });

  test('shows alert for empty fields', async () => {
    const user = userEvent.setup();
    const mockAdd = jest.fn();
    render(<ProductForm onAddProduct={mockAdd} />);
    
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(global.alert).toHaveBeenCalledWith('Please fill in all fields');
    expect(mockAdd).not.toHaveBeenCalled();
  });

  test('shows alert for invalid price', async () => {
    const user = userEvent.setup();
    const mockAdd = jest.fn();
    render(<ProductForm onAddProduct={mockAdd} />);
    
    await user.type(screen.getByTestId('name-input'), 'Test Product');
    await user.type(screen.getByTestId('price-input'), '-10');
    await user.type(screen.getByTestId('category-input'), 'Test Category');
    
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid price');
    expect(mockAdd).not.toHaveBeenCalled();
  });

  test('resets form after successful submission', async () => {
    const user = userEvent.setup();
    const mockAdd = jest.fn();
    render(<ProductForm onAddProduct={mockAdd} />);
    
    const nameInput = screen.getByTestId('name-input');
    const priceInput = screen.getByTestId('price-input');
    const categoryInput = screen.getByTestId('category-input');
    
    await user.type(nameInput, 'Test Product');
    await user.type(priceInput, '99.99');
    await user.type(categoryInput, 'Test Category');
    
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(nameInput.value).toBe('');
    expect(priceInput.value).toBe('');
    expect(categoryInput.value).toBe('');
  });
});