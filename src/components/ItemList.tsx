import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';
import { DeleteForever } from '@mui/icons-material';
import { SmartButton } from '@mui/icons-material';

const ItemList: React.FC = () => {
  const [itemList, setItemList] = useState<{ item: string; category: string }[]>([]);
  const [currentItem, setCurrentItem] = useState('');
  const [category, setCategory] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [kartname, setKartname] = useState<string>('');
  

    // Load items from browsers local storage.
  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    const savedKartname = localStorage.getItem('kartname');
    const savedCategory = localStorage.getItem('category');
    // If there are saved items, update the state with them.
    if (savedItems && savedKartname && savedCategory) {
        setItemList(JSON.parse(savedItems));
        setKartname(JSON.parse(savedKartname));
        setCategory(JSON.parse(savedCategory));
      }
    }, []);

  // Save items to browsers local storage.
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(itemList))
    localStorage.setItem('kartname', JSON.stringify(kartname))
    localStorage.setItem('category', JSON.stringify(category))
  }, [itemList]); // Every time the itemList changes the effect is run.


  const saveKartname = (input: string) => {

    setKartname(input);
  }
  // Add item to list
  const addItem = () => {
    if (currentItem.trim() !== '') { // Don't add empty strings
      setItemList(prevItems => [...prevItems, { item: currentItem, category }]); // Add item to list
      setCategory(''); // Reset category 
      setCurrentItem(''); // Reset input
      setSuggestions([]); // Reset suggestions
    }
  };


  // Remove item from list
  const removeItem = (index: number) => {
    setItemList(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };


  // Filter suggestions
  const filterSuggestions = (input: string) => {
    const filteredItems = itemData.filter(item => item.item.toLowerCase().includes(input.toLowerCase()));
    const suggestionList = filteredItems.map(item => item.item);
    setSuggestions(suggestionList);
  };


  // Handle input change. Update currentItem state and filter suggestions
  const handleInputChange = (value: string) => {
    setCurrentItem(value);
    filterSuggestions(value);

    // Find the selected item from the suggestions list
    const selectedItem = itemData.find(item => item.item.toLowerCase() === value.toLowerCase());
    
    // If matching item is found, set the category to the item's category
    if (selectedItem) {
        setCategory(selectedItem.category);

    } else {
      setCategory('');
    }
  };

  return (
    <div className="text-center text-lg">
        <h1>Your Lists</h1>
      <h3>{kartname}</h3>
      <input 
        type="text"
        value={kartname}
        className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
        onChange={e => saveKartname(e.target.value)}
        placeholder="Enter Kart Name"
        />
      <ul></ul>

        <input
          type="text"
          value={currentItem}
          className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full'
          onChange={e => handleInputChange(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addItem();
            }
          }}
          placeholder="Enter item name"
        />
        <ul>
        <input 
          type="text"
          value={category}
          className='border border-gray-300 rounded-md px-4 py-5 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full'
          onChange={e => setCategory(e.target.value)}
          placeholder="Enter category"
        />
        <div className="container mx-auto px-4 py-4 border">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
        onClick={addItem}>
        <b>＋Add</b>
      </button>

      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
        >
            <b>Recipe ideas</b> <SmartButton />
        </button>
    </div>


        <div className='container mx-auto px-4 py-4 border'>
        <div className="text-purple-800 container text-3xl">
          <h1><b>Items</b></h1>
          {itemList.map((item, index) => (
            <li key={index}>
              <span>{item.item}</span>  <span>{item.category}</span> 

              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'
                onClick={() => removeItem(index)}><DeleteForever />
                
                
              </button>
            
            </li>
          ))}
        </div>
        </div>
        
        
      </ul>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => setCurrentItem(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
        
  );
};

export default ItemList;
