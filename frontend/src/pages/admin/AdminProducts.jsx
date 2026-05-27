import { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

export default function AdminProducts() {
  const [view, setView] = useState('list'); // 'list' or 'form'
  const [editingProduct, setProduct] = useState(null);

  const handleEdit = (product) => {
    setProduct(product);
    setView('form');
  };

  const handleAdd = () => {
    setProduct(null);
    setView('form');
  };

  const handleSuccess = () => {
    setView('list');
  };

  return (
    <>
      {view === 'list' ? (
        <ProductList onEdit={handleEdit} onAdd={handleAdd} />
      ) : (
        <ProductForm 
          product={editingProduct} 
          onCancel={() => setView('list')} 
          onSuccess={handleSuccess} 
        />
      )}
    </>
  );
}
