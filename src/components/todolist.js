import React, { Component } from "react";
import ReactTooltip from "react-tooltip";

export default class todolist extends Component {
  state = {
    inputValue: "",
    todos: [],
    id:[],
    
  };

   


  
  inputChange = (e) => {
    
    this.setState({
      inputValue: e.target.value,
    });
  };

  removeItem=(props)=>{
    
    this.delete(props);
    this.state.todos.splice(props, 1)
    this.setState({todos: this.state.todos})
};

  buttonSubmit = (e) => {
    window.location.reload();
    
    this.insert(e);
    e.preventDefault();
    if (this.state.inputValue !== "") {
      this.setState({
        // todos: [this.state.inputValue],
        todos: [this.state.inputValue, ...this.state.todos],
        inputValue: "", // input field clearing on submitting
      });
  
     }
   
  };


   //***********************the below code fpor api connections of select insert delete*********************//
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
      fetch(
"http://localhost/riksontodo/API/selectTodo.php")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                todos: json["todos"],
                id:json["id"]
                
              });
          })
  }

    insert(e){
    e.preventDefault();
   var fd = new FormData();
   fd.append("todos",this.state.inputValue);
   console.log(fd);
    // var wrk = document.getElementById("workInput").value;
 
      // creates entity
    fetch("http://localhost/riksontodo/API/insertTodo.php", {
      // "mode": 'no-cors',
      "method": "POST",
      "headers": {
        "accept": "application/json"
      },
      "body":fd
    })
    .then((res) => res.json())
    .then((json) => {
        this.setState({
        
          id:json["id"]
          
        });
    })
    // .then(response => console.log(response))

    // .then(response => {
    //   console.log(response)
    // })
    .catch(err => {
      console.log(err);
    });

    
  }

  delete(id){
   
    var fd = new FormData();
    fd.append("id" ,this.state.id[id]);
    console.log(fd);
    fetch("http://localhost/riksontodo/API/deleteTodo.php", {
      // "mode": 'no-cors',
      "method": "POST",
      "headers": {
        "accept": "application/json"
      },
      "body":fd
    })
    .then(response => console.log(response))

    .then(response => {
      console.log(response)
    })
    .catch(err => {
      console.log(err);
    });

}



//***********************the api connections of select insert delete end*********************//

  render() {

    return (
      <div className="inputouter">
      <form onSubmit={this.buttonSubmit}>
        <br/>
     
        <input type="text" value={this.state.inputValue}  className="input" placeholder="Enter task..." onChange={this.inputChange} autoFocus/>
        &nbsp;<button disabled={this.state.inputValue < 1} onClick={this.buttonSubmit} id="hid"className="inputbutton" style={{cursor:"pointer"}}  target="_blank" data-tip="Add Todo">Add task</button>
        <ReactTooltip globalEventOff="click" />
       
        <br/>
        
        <div className="inputinner" >
        
            {this.state.todos.sort((a, b) => a - b).map((todo,id) => (
                // console.log(index);
            
               <ol>

                    <br/>

                    <p style={{color:"white",
                    fontFamily: 'Helvetica',
                    fontSize:"20px"}}>

                       <p key={id}>{id+1}. {todo}&nbsp;&nbsp;

                          <span onClick={()=>this.removeItem(id)} 
                          target="_blank" data-tip="Delete Todo"
                          style={{cursor:"pointer",
                          color:" rgb(132 235 204 / 89%)",
                          fontWeight:"bold",
                          textShadow:" 0 0 15px #fff"}} >x
                          </span> 
                          <ReactTooltip globalEventOff="click" />
                      </p> 
                    </p>

            </ol>

          ))}

        
        </div>

 
      </form>
      </div>

    );
  }
}
