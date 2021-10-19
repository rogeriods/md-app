import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Layout from '../components/Layout';

const TaskGrid = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const { data } = await axios.get('tasks');
    setTasks(data);
  }

  async function deleteTask(id) {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    }
  }

  return (
    <Layout>
      <h3>Task(s)</h3>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <a href="/tasks/new" className="btn btn-primary">
          <i className="fas fa-plus"></i>
        </a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{Moment(task.createdAt).format('DD/MM/yyyy hh:mm')}</td>
              <td>{Moment(task.updatedAt).format('DD/MM/yyyy hh:mm')}</td>
              <td>{task.taskDescription}</td>
              <td style={{ width: '50px' }}>
                <div className="btn-group btn-group-sm">
                  <a className="btn btn-outline-dark" href={`/tasks/${task._id}/edit`}>
                    <i className="fas fa-pencil-alt"></i>
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => deleteTask(task._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default TaskGrid;
