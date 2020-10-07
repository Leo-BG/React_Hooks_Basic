import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import './App.scss';
import Pagination from './components/Pagination/Pagination';
import PostList from './components/PostList/PostList';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ', name: 'NS' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ', name: 'NTS' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ', name: 'NTS' },
  ]);

  const [postlist, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const { filters, setFilters } = useState({
    _limit: 10,
    _page: 1,
  })

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        const { data } = responseJSON;
        setPostList(data);
        console.log(requestUrl);
        console.log(paramsString);
      } catch (error) {
        console.log('lỗi', error);
      }
    }
    fetchPostList();
  }, [filters])

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('form submit:', formValues);
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }
  function handlePageChange(newpage) {
    console.log('New page', newpage);
  }
  return (
    <div className="app">
      <h1>React Hook</h1>


      {/* 
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <TodoList
        todos={todoList}
        onTodoClick={handleTodoClick}
      /> */}
      <PostList posts={postlist} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
