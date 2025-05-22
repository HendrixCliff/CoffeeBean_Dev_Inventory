import React, { useState } from 'react';
import { useAppDispatch} from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { uploadReceipt } from './../redux/receiptSlice';
import { GiExitDoor } from "react-icons/gi";
import { Link } from "react-router-dom";
import ReceiptList  from "./../components/ReceiptList"

const UploadReceiptForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const { loading, success, error } = useAppSelector((state) => state.receipts);

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!file || !title.trim()) return;

  const formData = new FormData();
  formData.append('receipt', file);
  formData.append('title', title); // ✅ Add the title here

  dispatch(uploadReceipt(formData));
};


  return (
    <section>
      <section className="relative">
        <Link className="absolute max-[600px]:top-[-2.4em] max-[600px]:left-[-2em] left-[1em]" to="/"><GiExitDoor size={36} color={'#ff6e5a'} className="" /></Link>
      </section>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Enter receipt title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
            />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
        </button>
        {success && <p>✅ Uploaded!</p>}
        {error && <p>❌ {error}</p>}
        </form>

        <ReceiptList />
    </section>

  );
};

export default UploadReceiptForm;
