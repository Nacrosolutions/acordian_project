import { useState } from "react";
import FlashCard from "./Component/FlashCard";
import Accordian from "./Component/Accordian";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 12, packed: true },
];




export default function App() {

  const [items,setItems]=useState([]);

  function handleItems (item) {
    setItems((items)=>[...items,item])
    }
  
function deleteItem(id) {
  setItems(items=>items.filter(item=>item.id !==id));
}

function handleToggleItem(id){

  setItems(items=>items.map((item)=>item.id===id ? {...item,packed:!item.packed } : item))

}

function clearHandler() {

  setItems([]);
}
return (<div>  
{/* <div className="app"> */}

{/* <Logo/>

  <Form handleItems={handleItems} />
  <PackingList items={items} deleteItem={deleteItem} handleToggleItem ={handleToggleItem} clearHandler={clearHandler}></PackingList>
  <Stats items={items}></Stats> */}

<Accordian/>
  {/* <FlashCard/> */}
</div>)
}



function Logo() {
  return( <h1>🌴Far Away 💼</h1>);
}


function Form({handleItems}) {

  const [description,setDescription]=useState('');
  const [quantity,setQuantity]=useState(1);



  function handleSubmit(e){


    e.preventDefault();

    if(!description)return;


const newItem={description,quantity,packed:false,id:Date.now()}

handleItems(newItem);


setDescription('');
setQuantity(1);

  }
  return <form className="add-form" onSubmit={handleSubmit}>  
  <h3>What do you need for your 😍 Trip ? </h3>
  <select  value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}>
{Array.from({length:20},(_,i)=>i+1).map((num)=><option value={num} key={num}>{num}</option>)}
  </select>
  <input type="text" placeholder="item...." value={description} onChange={(e)=>setDescription(e.target.value)}></input>
  <button>Add</button>
  </form>
}

function PackingList({items,deleteItem,handleToggleItem,clearHandler}) {

  const [sortBy,setSort]=useState('input');

  let sortedItem;


  if(sortBy === 'input') sortedItem=items;

  if(sortBy === 'description') sortedItem=items.slice().sort((a,b)=>a.description.localeCompare(b.description));


  if(sortBy==='packed') sortedItem=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))


  return (
    <div className="list"> 
  <ul>
   {sortedItem.map((item)=><Item key={item.id} item={item} deleteItem={deleteItem} handleToggleItem={handleToggleItem}/ >)}
  </ul>


<div className="actions">
  <select  value={sortBy} onChange={(e)=>setSort(e.target.value)}>
    <option value='input'>Sort by input order</option>
    <option value='description'>Sort by description</option>
    <option value='packed'>Sort by packed status</option>
  </select>

  <button onClick={clearHandler}>Clear List</button>

</div>

  </div>
  )
}


function Item({item,deleteItem,handleToggleItem}){


return <li>
  
<input type="checkbox" value={item.packed} onChange={()=>handleToggleItem(item.id)}/>
  <span style={item.packed ? {textDecoration:"line-through"}:{}}>{item.quantity} {item.description} </span>
<button onClick={()=>deleteItem(item.id)}>❌</button>
</li>

}

function Stats({items}) {

  const numLength=items.length;
  const packedItem=items.filter(item=>item.packed).length
  const percentagePacked =Math.round((packedItem /numLength) *100)
  
  return <footer className="stats">
    <em>
    {percentagePacked === 100  || numLength === 0 ? "Yeah you don't have anything to pack" : `💼 You have  ${numLength} item in your list , and you already packed  ${packedItem} (${percentagePacked}%)`}
    </em>

  </footer>
}