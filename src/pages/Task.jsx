import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);


  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      description: task.description
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
    else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <MainLayout>
        <form className="m-auto my-16 max-w-[700px] bg-white p-8 border-2 shadow-lg rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">
                {mode === "add" ? "Add New Task" : "Edit Task"}
              </h2>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <Textarea
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write here..."
                  onChange={handleChange}
                  className="w-full h-28 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
                {fieldError("description")}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  className="bg-primary text-white px-6 py-2 font-medium rounded-md hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:outline-none transition duration-300"
                  onClick={handleSubmit}
                >
                  {mode === "add" ? "Add Task" : "Update Task"}
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-2 font-medium rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none transition duration-300"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                {mode === "update" && (
                  <button
                    className="bg-blue-500 text-white px-6 py-2 font-medium rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </MainLayout>

    </>
  )
}

export default Task