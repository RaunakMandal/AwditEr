import { useState } from 'react';
import { T_User } from '../../types/user';
import { loginUser } from '../../utils/functions/user';
import { useAuth } from '../../AuthContext';

export const useLoginPage = () => {
  const { login } = useAuth();

  const [form, setForm] = useState<
    Pick<T_User, 'email' | 'password' | 'roles'>
  >({
    email: '',
    password: '',
    roles: ['viewer'], // Default role
  });
  const [errorMessage, setShowErrorMessage] = useState<string>('');

  const handleFormChange = (field: keyof T_User, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
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
  };
};
