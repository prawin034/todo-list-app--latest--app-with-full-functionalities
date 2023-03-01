import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
const Lists = ({ items, deleteItem, editItem }) => {
  return (
    <div className="list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="list_items">
            <div>
              <p className="list_items_title">{title}</p>
            </div>

            <div>
              <button onClick={() => editItem(id)} className="btn_edit">
                <FaEdit />
              </button>
              <button onClick={() => deleteItem(id)} className="btn_trash">
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Lists;
