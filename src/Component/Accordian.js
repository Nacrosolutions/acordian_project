import { useState } from 'react';
import './Accordian.css';

const faqs = [
    {
      title: "Where are these chairs assembled?",
      text:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
      title: "How long do I have to return my chair?",
      text:
        "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
      title: "Do you ship to countries outside the EU?",
      text:
        "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
  ];


function AccordianItem ({num,title,text}) {

    const [open,setOpen]=useState(false);
    return (
      <div className={open ? 'item open' :'item'} onClick={()=>setOpen(!open)}>
        <p className='number'>{num < 9 ? num=`0${num}` : num}</p>
        <p className='title' >{title}</p>
        {open ? <p className='icon' onClick={()=>setOpen(false)}>-</p> : <p className='icon' onClick={()=>setOpen(true)}>+</p>}
        {open ?  <div className='content-box'>
            {text}
        </div> : null }
      </div>
    )
}

  export default  function Accordian (){

return (
    <div className='accordion'>

        {faqs.map((el,index)=><AccordianItem num={index+1} title={el.title}  text={el.text} key={index}></AccordianItem>)}

   </div>
)

  }




