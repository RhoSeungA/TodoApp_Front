import React from 'react';
import Todo from './Todo';
import { Paper, List ,Container,AppBar,Toolbar,Typography ,Grid,Button} from "@material-ui/core";
import './App.css';
import {call,signout} from "./service/ApiService"
import AddTodo from './AddTodo';
class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      items:[
      ]
      ,
      loading : true,
    }
  }

  componentDidMount(){
    call("/todo","GET",null).then((response)=>this.setState({items:response.data,loading:false}));
    // const requestOptions = {
    //   method: "GET",
    //   headers:{"Content-Type":"application/json"},
    // }

    // fetch("http://localhost:8080/todo",requestOptions)
    // .then((response)=> response.json())
    // .then(
    //   (response)=>{ this.setState({ items:response.data,}); },
    //   (error)=>{ this.setState({error,}); }
    // );
  }
  add = (item) => {
    call("/todo","POST",item).then((response)=> this.setState({items : response.data}));
    // const thisItems = this.state.items;
    // item.id='ID-'+thisItems.length;
    // item.done=false;
    // thisItems.push(item);
    // this.setState({items:thisItems});
    // console.log("items : ",this.state.items);
  }



  delete = (item) =>{
    call("/todo","DELETE",item).then((response)=> this.setState({items : response.data}));
    // console.log("delete called");
    // const thisItems = this.state.items;
    // console.log("before : ",this.state.items);
    // const newItems = thisItems.filter((e)=>e.id !== item.id);
    // this.setState({items:newItems}, ()=>{
    //   console.log("update items :",this.state.items)
    // });
  }

  update = (item) => {
    call("/todo","PUT" , item).then((response)=>
    this.setState({items:response.data}));
  }


  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx)=>(<Todo item={item} key={item.id} delete={this.delete} update={this.update}/>))}
        </List>
      </Paper>
    )
    var navigationBar= (
      <AppBar position = "static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할 일</Typography>
            </Grid>
          </Grid>
          <Button color="inherit" onClick={signout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
    )
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
        <AddTodo add={this.add}/>
        <div className='TodoList'>{todoItems}</div>
      </Container>
      </div>
    )
    var loadingPage=<h1>로딩중..</h1>
    var content = loadingPage;

    if(!this.state.loading){
      content=todoListPage;
    }
    return (
      <div className="App">{content}</div>
    )
    // return (
    // <div className='App'>
    //   {navigationBar}
    //   <Container maxWidth="md">
    //     <AddTodo add={this.add}/>
    //     <div className='TodoList'>{todoItems}</div>
    //   </Container>
    // </div>
    // )
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
