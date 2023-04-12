import React from 'react';
import Todo from './Todo';
import { Paper, List ,Container} from "@material-ui/core";
import './App.css';
import AddTodo from './AddTodo';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items:[
        { id:0, title:"hello1", done : true },
        { id:1, title:"hello2", done : false },
        { id:2, title:"hello3", done : false }]
    }
  }

  add = (item) => {
    const thisItems = this.state.items;
    item.id='ID-'+thisItems.length;
    item.done=false;
    thisItems.push(item);
    this.setState({items:thisItems});
    console.log("items : ",this.state.items);
  }
  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx)=>(<Todo item={item} key={item.id}/>))}
        </List>
      </Paper>
    )
    return (
    <div className='App'>
    <Container maxWidth="md">
        <AddTodo add={this.add}/>
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
      )
  }
}
// function App() {
//   return (
//     <div className="App">
//       <Todo/>
//       <Todo/>
//     </div>
//   );
// }

export default App;
