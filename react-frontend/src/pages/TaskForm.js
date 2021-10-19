import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uidv4 } from 'uuid';
import axios from 'axios';
import Layout from '../components/Layout';

const TaskForm = (props) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskToDoDescription, setTaskToDoDescription] = useState('');
  const [taskRate, setTaskRate] = useState(0);
  const [taskItems, setTaskItems] = useState([]);
  const [taskItemsToCommit, setTaskItemsToCommit] = useState([]);
  const [redirect, setRedirect] = useState(false);

  // Load data if I'm in edit mode
  useEffect(() => {
    if (props.match.params.id) {
      async function loadTask() {
        const { data } = await axios.get(`tasks/${props.match.params.id}`);
        setTaskDescription(data.taskDescription);
        setTaskItems(data.taskItems);
      }

      loadTask();
    }
  }, [props]);

  // Add item to my task items
  async function addItem(e) {
    e.preventDefault();

    let items = taskItems;
    items.push({ _id: uidv4(), todo: taskToDoDescription, rate: taskRate });

    setTaskItems(items);
    setTaskToDoDescription('');
    setTaskRate(0);

    cleanUpArray();
  }

  // Take of the _id from my current list
  async function cleanUpArray() {
    let items = [];

    taskItems.forEach(({ todo, rate }) => {
      items.push({ todo, rate: parseInt(rate, 16) });
    });

    setTaskItemsToCommit(items);
  }

  // Delete item by id
  async function deleteItem(id) {
    if (window.confirm('Are you sure?')) {
      let items = taskItems.filter((t) => t._id !== id);
      setTaskItems(items);
    }
  }

  // Submit form
  async function submit(e) {
    e.preventDefault();

    const data = {
      taskDescription,
      taskItems: taskItemsToCommit,
    };

    // Treat if is new or editing
    if (props.match.params.id) {
      await axios.put(`tasks/${props.match.params.id}`, data);
    } else {
      await axios.post('tasks', data);
    }

    setRedirect(true);
  }

  // Redirect to tasks screen
  if (redirect) {
    return <Redirect to={'/tasks'} />;
  }

  return (
    <Layout>
      <h3>Task (Form)</h3>
      <p>
        <code>*= required fields</code>
      </p>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Task Description *</label>
          <input
            type="text"
            className="form-control"
            required
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        <div className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">Items</h5>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="TODO Description"
                    value={taskToDoDescription}
                    onChange={(e) => setTaskToDoDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Rate"
                    max="5"
                    value={taskRate}
                    onChange={(e) => setTaskRate(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-outline-dark mb-2" onClick={addItem}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>ToDo</th>
                  <th>Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {taskItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.todo}</td>
                    <td>{item.rate}</td>
                    <td style={{ width: '50px' }}>
                      <div className="btn-group btn-group-sm">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => deleteItem(item._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          <i className="far fa-save"></i>
        </button>
      </form>
    </Layout>
  );
};

export default TaskForm;
