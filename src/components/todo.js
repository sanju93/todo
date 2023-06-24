import { useState } from 'react';
import style from './todo.module.css';
import { useEffect ,useRef} from 'react';

export default function ToDo(){

    let [todo,setTodo] = useState([]);
    let [data,setData] = useState({});
    let input = useRef(null);
    let id = useRef(20);



    useEffect(()=> {
        input.current.focus();
    } ,[todo])


   


    useEffect(() => {
        async function data(){
          var res = await fetch('https://jsonplaceholder.typicode.com/users/1/todos');
          var data = await res.json();
            setTodo(data);
         }
         data();

         input.current.focus();
    },[]);


    function handleCheckBox(e,index){
        

   

       var temp = [...todo];
 
       var data = [];
      
    temp[index].completed = true;

    for (let i = 0; i < index; i++){
        data.push(temp[i]);
    }

    data.push(temp[index]);

     if (index !== temp.length){
        for(let i = index + 1; i < temp.length; i++){
            data.push(temp[i]);
        }
     }

        alert("completed");

        setTodo(data);

    }

    function handleDelete(i){

        setTodo(todo.filter((item,index) => index !== i));

    }


    function handleAddToDo(){

      if (Object.keys(data).length !== 0){

        if (data.title !== ""){

            setTodo([data,...todo]);
            id.current = id.current + 1;
             input.current.value = "";
    
        }else{
            alert("please fill the title of todo");
        }

      }else{
        alert("please fill the title of todo");
      }

        setData({});
     


        

        

       
        
        
    }






    return (<>

    <span>To Do App</span>

    <div className= {style.container}>

    <div className = {style.containerChild}>

    <div className = {style.todo}>

 
    
       <div className = {style.todoDocument}>
        
        <img src = "https://cdn-icons-png.flaticon.com/128/1358/1358533.png"  alt= "document" className= {style.documentImage}></img> 
       
       </div>


       <div> 
       
        <input type = "text" placeholder="enter your todo" ref={input} onChange={(e) => {setData({userId :1,id : id.current + 1 , title : e.target.value,completed : false})}}/>

       </div>
         <div className = {style.todoAdd}>
          
          <img src = "https://cdn-icons-png.flaticon.com/128/399/399271.png" alt='plus' onClick={() => handleAddToDo()} className= {style.plusImage}></img>
          
          </div>
         

   


     </div>
     <hr/>

     {todo.map((item,index) => {
           return (
           <div className = {style.itemContainer} key={item.id}> 
           
            
            {item.completed ?
            <>
            
             <p><input type = "checkbox" checked disabled className = {style.checkbox}></input></p>
             <p key={index} style={{textDecoration : "line-through"}}>{item.title}</p>

             </> :
             <>

             <p>
             <input type = "checkbox" className= {style.checkbox} onClick={(e) => handleCheckBox(e,index)}></input>
             </p>
             <p>{item.title}</p>

             </>}  
            <p>
              <img src = "https://cdn-icons-png.flaticon.com/128/6861/6861362.png" alt = "delete" style={{cursor : "pointer"}} onClick={() => handleDelete(index)}></img>
            </p>
             <br/>

             </div>
             )
     })} 

     </div>
     </div>
    
    </>)
}