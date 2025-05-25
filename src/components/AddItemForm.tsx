import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addItem } from '../redux/itemSlice';

const AddItemForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [capitalPrice, setCapitalPrice] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(parseInt(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || quantity <= 0 || capitalPrice <= 0 || sellingPrice <= 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }
   
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity.toString());
    formData.append('capitalPrice', capitalPrice.toString());
    formData.append('sellingPrice', sellingPrice.toString());

    if (image) {
      formData.append('image', image);
    }

    dispatch(addItem(formData));

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    setName('');
    setCategory('');
    setQuantity(0);
    setCapitalPrice(0);
    setSellingPrice(0);
    setImage(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>

      <div>
        <label>Name*</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      <div>
        <label>Quantity*</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          required
        />
      </div>

      <div>
        <label>Capital Price*</label>
        <input
          type="number"
          value={capitalPrice}
          onChange={(e) => setCapitalPrice(parseFloat(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Selling Price*</label>
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {image && <p>Selected: {image.name}</p>}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: 150,
              height: 'auto',
              marginTop: 10,
              borderRadius: 6,
              border: '1px solid #ccc',
              objectFit: 'cover',
            }}
          />
        )}
      </div>

      <button className="w-[5%] border-[#ffffff]  border max-[600px]:w-[13%] bg-[#ffffff]" type="submit"><img className="w-[3em]" src="./images/plus.png"/></button>
    </form>
  );
};

export default AddItemForm;
