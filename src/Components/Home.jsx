import React,{useState,useEffect,lazy, Suspense} from 'react'
import Cookies from 'js-cookie'

const Login=lazy(()=>import("./Login"))
const Body=lazy(()=>import("./Body"))
const Footer=lazy(()=>import("./Footer"))
const Form=lazy(()=>import("./Form"))



function Home() {
    const [user, setUser] = useState(null);
    const [click,setClick] = useState(false);
    useEffect(()=>{
      const cookie=[Cookies.get('jwt'),Cookies.get('mob')]
      // console.log(cookie)
      cookie[1] &&cookie[1].length>=10 && setUser(cookie)
    },[])
    //  console.log(`from home .....${user}`)
  
  return (
    <>
      <section className="header">
        
        <div className="header-content">
            <h3>WELCOME TO</h3>
            <h1>Happie Birthday</h1>
            <h2>Automate Birthday Wishes</h2>
            
            {user&&user[0].length>=10?(  <Suspense>
           <Form user={user}/>
         </Suspense>
            ):(
              
              click ?
              (<Suspense><Login user={user} setUser={setUser}/></Suspense>):(<button className='mybutton' onClick={()=>setClick(true)}>Get Start</button>)
             
            )}

        </div>
    </section> 
    <Suspense>
    <Body/>
    <Footer/>
    </Suspense>
    </>
  )
}

export default Home
