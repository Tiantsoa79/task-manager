import create from 'zustand';

const useTaskManager = create((set) => ({
  tasks: [],

  searchTask: (searchTerm) => {
    set((state) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));
  },

  addTask: (newTask) => {
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (taskId, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

export { useTaskManager };
