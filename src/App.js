import { useEffect, useState } from 'react';
import Alert from './components/Alert';
import Lists from './components/Lists';

const getLocalStoraga = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [Name, setName] = useState('');
  const [List, setList] = useState(getLocalStoraga());
  const [isEditing, setisEditing] = useState(false);
  const [EditID, setEditId] = useState(null);
  const [alert, setalert] = useState({
    show: false,
    msg: '',
    type: '',
  });

  //FORM SUBMISSION

  const submithandler = (e) => {
    e.preventDefault();

    if (Name === '') {
      //DISPLAY ALERT
      alerthandler(true, 'danger', 'PLEASE ENTER A VALUE');
    } else if (Name && isEditing) {
      setList(
        List.map((item) => {
          if (item.id === EditID) {
            return { ...item, title: Name };
          }
          return item;
        })
      );

      setName('');
      setEditId(null);
      setisEditing(false);
      alerthandler(true, 'success', 'ITEM VALUE CHANGED');
    } else {
      //ADD ITEM TO LIST AND SPREAD TO COMPONENTS

      alerthandler(true, 'success', 'ITEM ADDED TO LIST');
      let newItem = { id: new Date().getTime().toString(), title: Name };

      setList([...List, newItem]);
      setName('');
    }
  };

  //alert function

  const alerthandler = (show = false, type = '', msg = '') => {
    setalert({ show, type, msg });
  };

  //CLEAR LIST

  const clearList = () => {
    alerthandler(true, 'danger', 'empty list ');
    setList([]);
  };

  const removeItem = (id) => {
    alerthandler(true, 'danger', 'item removed');

    let filterItems = List.filter((item) => item.id !== id);
    setList(filterItems);
  };

  const editHandler = (id) => {
    const showItem = List.find((item) => item.id === id);

    setisEditing(true);
    setEditId(id);
    setName(showItem.title);
  };

  //STORING DATA TO LOCAL STORAGE

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(List));
  }, [List]);
  return (
    <section className="section">
      {/**ALERT */}
      {alert.show && <Alert {...alert} removeAlert={alerthandler} />}
      <h1 className="section_heading">TODO-LIST-APP</h1>

      <form onSubmit={submithandler} className="section_form">
        <div className="section_form_box">
          <input
            value={Name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="section_form_input"
            placeholder="eg: REACT LEARNING "
          />
          <button type="submit" className="btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {/* LIST COMPONENT */}
      {List.length > 0 && (
        <div className="listed">
          <Lists items={List} deleteItem={removeItem} editItem={editHandler} />
          <button type="button" className="list_clear" onClick={clearList}>
            clear items
          </button>
          <p className="list_total">😁{List.length} items in box</p>
        </div>
      )}
    </section>
  );
}

export default App;
