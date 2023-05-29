import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';
import { DeleteForever, SmartButton, Edit } from '@mui/icons-material';
import { count } from 'console';

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


  // Count items in list and display them in the UI. If there are no items, display a message.
    const countItems = itemList.length > 0 ? itemList.length : 'No items yet.';
    // If the number of items is greater than 10, display a warning.
    const countItemsClass = itemList.length > 20 ? '🔥' : '';



  // Remove item from list
  const removeItem = (index: number) => {
    setItemList(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };


  // Clear all items from list
    const clearItems = () => {
    setItemList([]);
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
        <div className='text-3xl text-left font-bold'>
            <p></p>
      <h3>{kartname} <Edit /></h3>
        </div>
        <div className='text-lg text-left'>
            <p>Created: </p>
      <p>Items: {countItems} {countItemsClass}</p>
      </div>
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
          placeholder="Type your item here and press enter"
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
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full">
            <b>Recipe ideas</b> <SmartButton />
            
        </button>
    </div>


        <div className='container mx-auto px-4 py-4 border'>
          
          <div className='text-3xl text-purple-800'>
          <h1><b>Items</b></h1>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full">
            <b>Clear all items</b> <DeleteForever />
            </button>
          <div className="text-purple-800 container text-3xl text-left">
          {itemList.map((item, index) => (
            <li key={index}>
              <span>{item.item}</span>
              <div className='text-sm text-left flex flex-row bg-blue-500 text-white py-1 px-2 rounded'>
                <div>{item.category}</div>
                
              </div>  
              
            
            <div className='text-right'>
              <button
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                onClick={() => removeItem(index)}><DeleteForever />
                </button>  
            </div>

            <div className='text-right'>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => removeItem(index)}><Edit />
                </button>  
            </div>
            
            </li>
          ))}
        </div>
        </div>
        
        
      </ul>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => setCurrentItem(suggestion)}>
            <h2>Suggestions</h2>
            <p>{suggestion}</p>
          </li>
        ))}
      </ul>
    </div>
        
  );
};

export default ItemList;
