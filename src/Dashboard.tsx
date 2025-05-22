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
        <>
          <Link className=" absolute right-[-3em] top-[.3em]" to="signup"><img className="w-[13.5%] " src="./images/login.png"/></Link>
          <Link className="absolute right-[-10em] " to="login"><img className="w-[16%]" src="./images/sign-up.png"/></Link>
        </>
      )}
    </section>
     <section className="">
      <Link className="fixed top-[9em] left-[-4em] max-[600px]:left-[-13.5em] z-[999] " to="filter"><img className="w-[8%]" src="./images/audit.png"/></Link>
      {user && (
        <button className="fixed w-[8%] bg-[#ffffff] border right-[1em]" onClick={handleLogout}><img className="w-[3em]" src="./images/user-logout.png"/></button>
      )}
    </section>
      </section>
      <section className="gap-[1em]">
        <Link className="fixed left-[-4em] top-[14em] z-[999] max-[600px]:left-[-13.5em]" to="upload-receipt"><img className="w-[8%]" src="./images/receipt.png"/></Link>
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
