import { useState } from 'react';

const useForm = (callback) => {

  const [values, setUser] = useState({ email: '', password: '' });

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (event) => {
    event.persist();
    setUser(user => ({ ...user, [event.target.name]: event.target.value }));
};

  return {
    handleChange,
    handleSubmit,
    values,
  }
};

export default useForm;