// components/ReceiptList.tsx

import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppSelector';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchReceipts } from '../redux/receiptSlice';
import { format } from 'date-fns'; // 🆕 date-fns import


const ReceiptList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { receipts, loading, error } = useAppSelector((state) => state.receipts);

  useEffect(() => {
    dispatch(fetchReceipts());
  }, [dispatch]);

  if (loading) return <p>Loading receipts...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>My Receipts</h2>
      {receipts.length === 0 ? (
        <p>No receipts found.</p>
      ) : (
       <ul>
        {receipts.map((receipt) => (
          <li className="list-none relative" key={receipt.receiptId}>
            <strong>{receipt.title}</strong>
            <br />
            <a href={receipt.receiptUrl} target="_blank" rel="noopener noreferrer">
              <img className="w-[4%] max-[600px]:w-[6%] absolute max-[600px]:top[1.6em] max-[600px]:left-[1em] top-[1.6em] left-[16em]" src="./images/atm.png"/>
            </a>{' '}
            – Uploaded at: {format(new Date(receipt.uploadedAt), 'PPpp')}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default ReceiptList;
