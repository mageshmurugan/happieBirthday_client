import React,{useState,useRef} from 'react'

function Form({user}) {
    const [open, setOpen] =useState(false);
    const names=useRef();
    const email=useRef();
    const date=useRef();
    const nam=useRef();

    
    async function handleSubmit(){
        setOpen(false)
        const data={
            names:names.current.value,
            email:email.current.value,
            date:date.current.value,
            nam:nam.current.value,
            mobile:user[1]
        }
        const loggedInResponse = await fetch("https://happiebirthday.onrender.com/", {
          method: "POST",
          headers: { "Content-Type": "application/json",Authorization:`Bearer ${user[0]}` },
          body: JSON.stringify(data),
          });
          const loggedIn = await loggedInResponse.json();
          console.log(loggedIn)
    }
    return (
      <>
        
      
      {open?(
      <div className='automate-model'>
          <div className='automate-ab'>
          <input
            className='auto-input'
            type='text'
            placeholder="Friend Name"
            name='friend'
            ref={names}
          /> 
           
          <input
            className='auto-input'
            ref={email}
            
            placeholder="Email"
            type='email'
            name='email'
          />
          
          <input
            ref={date}

            className='auto-input'
  
            placeholder="dd-mm-yyyy"
          name='date'
           type="text"
           onFocus={(e)=>e.target.type="date"}
           onBlur={(e)=>(e.target.type="text")}
           style={{width:'91%'}}
          />
  
        <input
            ref={nam}
            
            className='auto-input'
           
            placeholder="Your Name"
            type='text'
            name='name'
          />
            
          <div  className='auto-input' id='auto-button'>
          <button onClick={()=>setOpen(false)} className='cancel-btn'>Cancel</button>
          <button className='mybutton' onClick={handleSubmit}>Automate</button>
          </div>
          </div>
          </div> 
           ):(<button onClick={()=>setOpen(true)} className='mybutton'>Automate</button>)}
      </>
    )
}

export default Form
