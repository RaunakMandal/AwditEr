import { useState } from 'react';
import { T_User } from '../../types/user';
import { loginUser } from '../../utils/functions/user';
import { useUserContext } from '../../UserContext';

export const useLoginPage = () => {
  const { login } = useUserContext();

  const [form, setForm] = useState<
    Pick<T_User, 'email' | 'password' | 'roles'>
  >({
    email: '',
    password: '',
    roles: ['viewer'], // Default role
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [errorMessage, setShowErrorMessage] = useState<string>('');

  const handleFormChange = (field: keyof T_User, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormErrors = () => {
    const newErrors: string[] = [];
    if (!form.email) {
      newErrors.push('email');
    }
    if (!form.password) {
      newErrors.push('password');
    }

    setFormErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleFormSubmit = () => {
    if (!handleFormErrors()) {
      setTimeout(() => {
        setFormErrors([]);
      }, 3000);
      return;
    }

    const response = loginUser(form);
    if (response.success) {
      login(response.user as T_User);
    } else {
      setShowErrorMessage(response.message);
    }
  };

  return {
    form,
    handleFormChange,
    handleFormSubmit,
    errorMessage,
    setShowErrorMessage,
    formErrors,
  };
};
