import React, { useCallback } from 'react';
import './App.css';
import ListItem from './ListItem';
function App() {
  const [items, setItems] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState({ text: '', key: null });
  const [status, setStatus] = React.useState('uncompleted');
  const [filteredTodos, setFiltredTodos] = React.useState([]);

  React.useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem('items') === null) {
        localStorage.setItem('items', JSON.stringify([]));
      } else {
        let localTodos = JSON.parse(localStorage.getItem('items'));

        setItems(localTodos);
      }
    };
    getLocalTodos();
  }, []);

  const filterHandler = useCallback(() => {
    switch (status) {
      case 'completed':
        setFiltredTodos(items.filter((item) => item.completed === true));
        break;
      case 'uncompleted':
        setFiltredTodos(items.filter((item) => item.completed === false));
        break;
      default:
        setFiltredTodos(items);
        break;
    }
  }, [items, status]);

  React.useEffect(() => {
    const saveLocalTodos = () => {
      localStorage.setItem('items', JSON.stringify(items));
    };

    filterHandler();
    saveLocalTodos();
  }, [filterHandler, items, status]);

  const handleInput = (e) => {
    const value = e.target.value;
    setCurrentItem((prevState) => ({
      ...prevState,
      text: value,
      key: Date.now(),
      completed: false,
    }));
  };

  const addItem = (e) => {
    e.preventDefault();
    const newItem = currentItem;
    if (currentItem.text !== '') {
      const newItems = [...items, newItem];
      setItems(newItems);
      setCurrentItem((prevState) => ({
        ...prevState,
        text: '',
        key: '',
      }));
    }
  };

  const deleteItem = (key) => {
    const filteredItems = items.filter((item) => item.key !== key);
    setItems(filteredItems);
  };

  const setUpdate = (text, key) => {
    setItems(
      items.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            text: text,
          };
        }
        return item;
      })
    );
  };

  const setCompleted = (completed, key) => {
    setItems(
      items.map((item) => {
        if (item.key === key) {
          return {
            ...item,
            completed: completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className='App'>
      <header>
        <form id='to-do-form' onSubmit={addItem}>
          <input
            type='text'
            value={currentItem.text}
            onChange={handleInput}
            placeholder='Enter your text here...'
          />
          <button type='submit'>Add</button>
          <div className='form-group mt-3 pr-4'>
            <select
              defaultValue={status}
              className='form-control'
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='all'>All</option>
              <option value='completed'>Completed</option>
              <option value='uncompleted'>Uncompleted</option>
            </select>
          </div>
        </form>
        <hr style={{ backgroundColor: 'white' }} />
      </header>
      {filteredTodos.map((item) => {
        return (
          <ListItem
            key={item.key}
            item={item}
            deleteItm={deleteItem}
            updateItem={setUpdate}
            setCompleted={setCompleted}
          />
        );
      })}
    </div>
  );
}

export default App;
