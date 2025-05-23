import { useEffect } from 'react';
import { fetchItems } from '../src/redux/itemSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useAppSelector } from './hooks/useAppSelector';
import ItemList from '../src/components/ItemList';
import AddItemForm from '../src/components/AddItemForm';
import { Link } from "react-router-dom"
import type { Item } from "./redux/itemSlice"
import { resetAuthState } from '../src/redux/authSlice';


const LandingPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const items = useAppSelector((state) => state.items.items);

  useEffect(() => {
    if (user) {
      dispatch(fetchItems());
    }
  }, [user]);

  
const handleLogout = () => {
  dispatch(resetAuthState());
  localStorage.removeItem('token'); // optional if you're storing token
  localStorage.removeItem('user');  // optional
  // redirect to login or home
  window.location.href = '/login'; // or use react-router's useNavigate()
};
  const dummyItems: Item[] = [
    {
      _id: 'demo1',
      name: 'Demo Item',
      quantity: 100,
      used: 10,
      remaining: 90,
      image: null,
      category: 'Misc',
      capitalPrice: 0,
      sellingPrice: 0,
      datePurchased: new Date().toISOString(),
      owner: 'guest',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];
  
  
  const displayItems = user ? items : dummyItems;
  const itemsForDisplay = displayItems.map(item => ({
    ...item,
    image: item.image instanceof File ? null : item.image
  }));
  
  return (
    <section className="overflow-hidden"> 
    <section className="justify-between">
      <section className=" relative">
      {!user && (
        <section>
        <section className="flex justify-end items-center w-full max-[600px]:gap-[1em] gap-[3em] pr-4">
  <Link to="login" className="inline-block">
    <img className="w-[70px] max-[600px]:w-[60px]" src="./images/login.png" alt="Login" />
  </Link>
  <Link to="signup" className="inline-block">
    <img className="w-[90px] max-[600px]:w-[70px]" src="./images/sign-up.png" alt="Sign Up" />
  </Link>
</section>
        </section>
      )}
    </section>
     <section className="">
      
      {user && (
        <button className="fixed w-[8%] bg-[#ffffff] border-[#ffffff] border max-[600px]:right-[1.4em] right-[1em]" onClick={handleLogout}><img className="w-[3em]" src="./images/user-logout.png"/></button>
      )}
    </section>
      </section>
    <section className="fixed top-[10em] max-[600px]:ml-[0.5em] left-0 z-[999] flex flex-col gap-4 pl-2">
  <Link to="filter">
    <img className="w-[50px] hover:scale-105 transition-transform" src="./images/audit.png" alt="Audit" />
  </Link>
  <Link to="upload-receipt">
    <img className="w-[50px] hover:scale-105 transition-transform" src="./images/receipt.png" alt="Upload Receipt" />
  </Link>
</section>

      <h1>{user ? `Welcome ${user.name}` : 'Welcome to Inventory App'}</h1>
     

     
      {user ? (
        <>
          <AddItemForm />
          {/* ConsumeItemForm and Delete buttons can go here too */}
        </>
      ) : (
        <p>Log in to manage your inventory!</p>
      )}
     <section className="max-w-6xl mx-auto px-[.5em]">
       <ItemList items={itemsForDisplay} isDemo={!user} />
     </section>
     


    </section>
  );
};

export default LandingPage;
