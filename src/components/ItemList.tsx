import React, { useState, useEffect } from 'react';
import itemData from '../items.json';
import 'tailwindcss/tailwind.css';

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
    if (currentItem.trim() !== '') {
      setItemList(prevItems => [...prevItems, { item: currentItem, category }]);
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
    <div className="text-lg">
      <h1>{kartname}</h1>
      <input 
        type="text"
        value={kartname}
        onChange={e => saveKartname(e.target.value)}
        placeholder="Enter Kart Name"
        />
      <ul>
        <input
          type="text"
          value={currentItem}
          onChange={e => handleInputChange(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              addItem();
            }
          }}
          placeholder="Enter item name"
        />
        <input 
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Enter category"
        />
        <button onClick={addItem}>＋Add</button>
        <div className="">
          <h2>Items</h2>
          {itemList.map((item, index) => (
            <li key={index}>
              <span>{item.item}</span>  <span>{item.category}</span>
              <button onClick={() => removeItem(index)}>－Remove</button>
              
            </li>
          ))}
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
