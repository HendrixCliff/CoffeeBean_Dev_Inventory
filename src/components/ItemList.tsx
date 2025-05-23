import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
//import { useAppSelector } from '../hooks/useAppSelector';
import { consumeItem, deleteItem } from '../redux/itemSlice';
import { format } from 'date-fns'; // ✅ Import from date-fns

export interface Item {
  _id: string;
  name: string;
  category: string;
  capitalPrice: number;
  sellingPrice: number;
  quantity: number;
  used: number;
  remaining: number;
  datePurchased: string;
  image?: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  items: Item[];
  isDemo?: boolean;
}

const ItemList: React.FC<Props> = ({ items, isDemo = false }) => {
  const dispatch = useAppDispatch();

  const handleConsume = (id: string) => {
    const amount = prompt('Enter amount to consume:');
    const parsed = parseInt(amount || '0', 10);
    if (!isNaN(parsed) && parsed > 0) {
      dispatch(consumeItem({ id, amountUsed: parsed }));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItem(id));
    }
  };

  const totalCapital = items.reduce(
    (sum, item) => sum + item.capitalPrice * item.quantity,
    0
  );
  const totalSelling = items.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );
  const totalProfit = totalSelling - totalCapital;
  const totalPurchaseSoFar = items.reduce(
    (sum, item) => sum + item.used * item.sellingPrice,
    0
  );

  return (
    <section>
      {items.length === 0 && <p>No items to display</p>}

      <ul  className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {items.map((item) => {
          const itemCapitalTotal = item.capitalPrice * item.quantity;
          const itemSellingTotal = item.sellingPrice * item.quantity;
          const itemProfit = itemSellingTotal - itemCapitalTotal;
          const purchaseSoFar = item.used * item.sellingPrice;

          return (
            <li className="list-none px-[auto] py-[.6em] rounded shadow w-full" key={item._id}>
              <strong>{item.name}</strong> — Used: {item.used} / Quantity: {item.quantity}
              <br />
              Remaining: {item.quantity - item.used}
              <br />
              🏷️ <strong>Capital Price:</strong>{' '}
              <img className="w-[2%] mb-[-.4em] max-[600px]:w-[4%] max-[600px]:m-[-.1em]" src="./images/naira.png" alt="₦" />
              {item.capitalPrice ? item.capitalPrice.toLocaleString() : "N/A"}
              <br />
              💸 <strong>Selling Price:</strong>{' '}
              <img className="w-[2%] mb-[-.4em] max-[600px]:w-[4%] max-[600px]:m-[-.1em]" src="./images/naira.png" alt="₦" />
              {typeof item.sellingPrice === 'number' ? item.sellingPrice.toLocaleString() : 'N/A'}
              <br />
              📦 <strong>Total Capital:</strong>{' '}
              <img className="w-[2%] mb-[-.4em] max-[600px]:w-[4%] max-[600px]:m-[0em]" src="./images/naira.png" alt="₦" />
              {typeof itemCapitalTotal === 'number' ? itemCapitalTotal.toLocaleString() : 'N/A'}
              <br />
              💰 <strong>Total Selling:</strong>{' '}
              <img className="w-[2%] mb-[-.4em] max-[600px]:w-[4%] max-[600px]:m-[-.1em]" src="./images/naira.png" alt="₦" />
              {typeof itemSellingTotal === 'number' ? itemSellingTotal.toLocaleString() : 'N/A'}
              <br />
              🧮 <strong>Profit:</strong>{' '}
              <img className="w-[2%] mb-[-.4em] max-[600px]:w-[4%] max-[600px]:m-[-.1em]" src="./images/naira.png" alt="₦" />
              {typeof itemProfit === 'number' ? itemProfit.toLocaleString() : 'N/A'}
              <br />
              📈 <strong>Purchase So Far:</strong>{' '}
              <img className="w-[2%] mb-[-.4em] max-[600px]:w-[4%] max-[600px]:m-[-.1em] " src="./images/naira.png" alt="₦" />
              {typeof purchaseSoFar === 'number' ? purchaseSoFar.toLocaleString() : 'N/A'}
                            <br />
              📁 Category: {item.category}
              <br />
              🕒 Created on {format(new Date(item.createdAt), 'PPpp')}
              <br />
              🕒 Last Sold on {format(new Date(item.updatedAt), 'PPpp')}
              <br />

              {item.image && (
                <img
                  src={item.image}
                  className="w-[8%] max-[600px]:w-[38%] mt-2"
                  alt={`${item.name} photo`}
                />
              )}

              {!isDemo && (
                <div className="mt-2">
                  <button className="bg-[#466e4d] text-[#ffffff]" onClick={() => handleConsume(item._id)}>Sell</button>{' '}
                  <button className="bg-[#6e4667] text-[#ffffff]" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {items.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h3>📊 Totals Summary</h3>
          <p>
            🧾 <strong>Total Capital:</strong>{' '}
            <img className="w-[2%] mb-[-.4em] max-[600px]:mb-[-.1em] max-[600px]:w-[4%]" src="./images/naira.png" />
            {totalCapital.toLocaleString()}
          </p>
          <p>
            💰 <strong>Total Selling:</strong>{' '}
            <img className="w-[2%] mb-[-.4em] max-[600px]:mb-[-.1em] max-[600px]:w-[4%]" src="./images/naira.png" />
            {totalSelling.toLocaleString()}
          </p>
          <p>
            📈 <strong>Total Profit:</strong>{' '}
            <img className="w-[2%] mb-[-.4em] max-[600px]:mb-[-.1em] max-[600px]:w-[4%]" src="./images/naira.png" />
            {totalProfit.toLocaleString()}
          </p>
          <p>
            🛒 <strong>Purchase So Far:</strong>{' '}
            <img className="w-[2%] mb-[-.4em] max-[600px]:mb-[-.1em] max-[600px]:w-[4%]" src="./images/naira.png" />
            {totalPurchaseSoFar.toLocaleString()}
          </p>
        </div>
      )}
    </section>
  );
};

export default ItemList;
