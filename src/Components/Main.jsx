  import React, { useState } from 'react'
  import { FaRegTrashAlt } from "react-icons/fa";
  import { CiEdit, CiLock } from "react-icons/ci";

  const Main = () => {

      let [name , setName] = useState([
      { id:"1" ,Name:"Mikey"  , Checked : true} ,
      { id:"2",Name:"Draken"  ,  Checked : false} ,
      {id :"3" , Name : "Baji" , Checked : false}
    ])

    let [click , setClick] = useState(false) 

    let [details,setDetails] = useState("")

    let [currentID , setCurrentID] = useState(null)

    let HandleClick = (id) =>{

      let NewListItem = name.find(item =>
         item.id === id 
      )
      setDetails(NewListItem.Name);
      
      setClick(true); 

      setCurrentID(id)
  
    }

    let HandleText = (e)=>{
      setDetails(e.target.value);
      
    }
  
  let HandleCheck = (id) => {
  let NewItem = name.map((item) => {
    return item.id === id ? 
    { ...item, Checked: !item.Checked }: item;});
      setName(NewItem);

  };
  let HandleUpdate = () => {

    if(click){

      let NewItems = name.map(item => {
        return item.id === currentID ? {...item ,Name :details} : item
      })
      
      setName(NewItems)
      setDetails("")
      setCurrentID(null)
      setClick(false)
    }
    
    else{
      
      setName([...name , {id : name.length+1 , Name :details    , Checked  : false }])
      setDetails("")
    }

    //hadleDel = 3 
    // item = 1  =>> 1 !== 3

  }
  
  let HandleDelete = (id) =>{

    let DelelteItem = name.filter(item =>
       item.id !== id
    )
    .map((item,index) =>{
      return {...item , id : index + 1}
    })
  
    
    setName(DelelteItem)

  }
  return (
        <main>
      <div>
        <input type="text"  value={details }
        placeholder='Add a Item'
        onChange={HandleText}  
    />
        <button onClick={() => HandleUpdate()}>{click ? "Save" : "Add"}</button>

          {name.map((item) =>{
            return(
        <ul key={item.id}>
          <li >

              <input type="checkbox" checked = {item.Checked} onChange={ () => HandleCheck(item.id)}/>

            {item.Name} 
            <CiEdit role='button' tabIndex={0} onClick={ () =>HandleClick(item.id)}/>
            <FaRegTrashAlt  role='button' tabIndex={0}  onClick={() =>HandleDelete(item.id)}/>

          </li>
        </ul>

            )
              
          })}

      </div>
        </main>
    )

  }

  export default Main
