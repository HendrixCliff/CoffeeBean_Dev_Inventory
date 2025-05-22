import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchFilteredItems, clearFilteredItems } from './../redux/filteredItemSlice';
import type { FilterParams } from '../redux/filteredItemSlice';
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";
import { fetchCategories } from '../redux/categorySlice';

const FilteredItemsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.filter);
  const { categories } = useAppSelector((state) => state.categories);

  const [filters, setFilters] = useState<FilterParams>({
    category: '',
    from: '',
    to: '',
    action: undefined,
    minUsed: undefined,
    maxUsed: undefined,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const anyFilterApplied = Object.values(filters).some((val) => val !== '' && val !== undefined);
    if (anyFilterApplied) {
      dispatch(fetchFilteredItems(filters));
    }
  }, [filters, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
    }));
  };

  const handleClear = () => {
    setFilters({
      category: '',
      from: '',
      to: '',
      action: undefined,
      minUsed: undefined,
      maxUsed: undefined
    });
    dispatch(clearFilteredItems());
  };

  const uniqueItems = Array.from(new Map(items.map(item => [item._id + (item.deleted ? '-audit' : ''), item])).values());

  return (
    <div>
      <section className="relative">
        <Link className="absolute max-[600px]:top-[-2.4em] max-[600px]:left-[-2em] left-[1em]" to="/"><GiExitDoor size={36} color={'#ff6e5a'} className="" /></Link>
      </section>
      <h2>Filtered Items</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label>
          From:
          <input type="date" name="from" value={filters.from} onChange={handleChange} />
        </label>
        <label>
          To:
          <input type="date" name="to" value={filters.to} onChange={handleChange} />
        </label>

        <label>
          Action:
          <select name="action" value={filters.action || ''} onChange={handleChange}>
            <option value="">All</option>
            <option value="DELETE">Delete</option>
            <option value="CONSUME">Sold</option>
          </select>
        </label>

        <button onClick={handleClear}>Clear</button>
      </div>

      {loading && <p>Loading items...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && items.length === 0 && <p>No items found.</p>}

      <ul>
        {uniqueItems.map((item) => {
          const remaining = item.quantity - item.used;
          const purchaseSoFar = item.used * item.sellingPrice;
          return (
            <li className="list-none mb-4 border-b pb-3" key={item._id + (item.deleted ? '-audit' : '')}>
              <strong>{item.name}</strong><br />
              📁 Category: {item.category}<br />
              📦 Quantity: {item.quantity} | Used: {item.used} | Remaining: {remaining}<br />
              💸 Selling Price: ₦{item.sellingPrice}<br />
              🏷️ Capital Price: ₦{item.capitalPrice}<br />
              🛒 Purchase So Far: ₦{purchaseSoFar}<br />
              {item.deleted && (
                <>
                  ❌ <strong>Action:</strong> {item.action}<br />
                {item.deleted && item.deletedAt && (
                <span>
                  🕒 <strong>Deleted At:</strong> {new Date(item.deletedAt).toLocaleString()}
                </span>
              )}<br />
                </>
              )}
              🕒 Created: {new Date(item.createdAt).toLocaleString()}<br />
              🕒 Updated: {new Date(item.updatedAt).toLocaleString()}<br />
              {item.image && (
                <img
                  src={item.image}
                  className="w-[8%] mt-2"
                  alt={`${item.name} photo`}
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilteredItemsList;
