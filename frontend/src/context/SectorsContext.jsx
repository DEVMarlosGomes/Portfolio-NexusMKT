import React, { createContext, useContext, useState, useEffect } from 'react';

const SectorsContext = createContext(null);

export const SectorsProvider = ({ children }) => {
  const [sectors, setSectors] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Usuário logado simulado (futuramente virá da auth)
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    name: 'Administrador',
    role: 'admin', // 'admin', 'gerente', 'usuario'
    sector_id: '1'
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  // Fetch Sectors
  const fetchSectors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sectors`);
      if (!response.ok) throw new Error('Erro ao buscar setores');
      const data = await response.json();
      setSectors(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar setores:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
    }
  };

  // Fetch Users by Sector
  const fetchUsersBySector = async (sectorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/sector/${sectorId}`);
      if (!response.ok) throw new Error('Erro ao buscar usuários do setor');
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erro ao buscar usuários do setor:', err);
      return [];
    }
  };

  // Fetch Tasks by Sector
  const fetchTasksBySector = async (sectorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/sector/${sectorId}`);
      if (!response.ok) throw new Error('Erro ao buscar tarefas');
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
      return [];
    }
  };

  // Fetch Tasks by User
  const fetchTasksByUser = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/user/${userId}`);
      if (!response.ok) throw new Error('Erro ao buscar tarefas do usuário');
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Erro ao buscar tarefas do usuário:', err);
      return [];
    }
  };

  // Create Task
  const createTask = async (taskData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks?assigned_by=${currentUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Erro ao criar tarefa');
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setError(null);
      return newTask;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Task
  const updateTask = async (taskId, taskUpdate) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskUpdate)
      });
      if (!response.ok) throw new Error('Erro ao atualizar tarefa');
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      setError(null);
      return updatedTask;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao atualizar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Erro ao deletar tarefa');
      setTasks(tasks.filter(t => t.id !== taskId));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao deletar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create Sector
  const createSector = async (sectorData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/sectors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectorData)
      });
      if (!response.ok) throw new Error('Erro ao criar setor');
      const newSector = await response.json();
      setSectors([...sectors, newSector]);
      setError(null);
      return newSector;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar setor:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create User
  const createUser = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Erro ao criar usuário');
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setError(null);
      return newUser;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao criar usuário:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors();
    fetchUsers();
  }, []);

  const value = {
    sectors,
    tasks,
    users,
    loading,
    error,
    currentUser,
    setCurrentUser,
    fetchSectors,
    fetchUsers,
    fetchUsersBySector,
    fetchTasksBySector,
    fetchTasksByUser,
    createTask,
    updateTask,
    deleteTask,
    createSector,
    createUser
  };

  return (
    <SectorsContext.Provider value={value}>
      {children}
    </SectorsContext.Provider>
  );
};

export const useSectors = () => {
  const context = useContext(SectorsContext);
  if (!context) {
    throw new Error('useSectors deve ser usado dentro de SectorsProvider');
  }
  return context;
};
