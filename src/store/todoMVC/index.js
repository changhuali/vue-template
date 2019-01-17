import { setPathValue } from 'pathval';

export default {
  namespaced: true,
  state: {
    todoInput: '',
    todoList: [
      {
        desc: 'breakfast',
        id: '1111',
        status: 'COMPLETED',
      },
      {
        desc: 'lunch',
        id: '2222',
        status: 'COMPLETED',
      },
      {
        desc: 'dinner',
        id: '3333',
        status: 'ACTIVE',
      },
    ],
    filterStatus: 'ALL',
  },
  getters: {
    allTodosAreCompleted(state) {
      return state.todoList.length > 0 && state.todoList.every(item => item.status === 'COMPLETED');
    },
    hasCompletedTodo(state) {
      return state.todoList.length > 0 && state.todoList.some(item => item.status === 'COMPLETED');
    },
    getLeftTodosCount(state) {
      return state.todoList.filter(item => item.status === 'ACTIVE').length;
    },
  },
  mutations: {
    updateValue(state, { path, value }) {
      setPathValue(state, path, value);
    },
    addTodo(state, { todo }) {
      state.todoList.push(todo);
    },
    removeTodo(state, { id }) {
      state.todoList = state.todoList.filter(item => item.id !== id);
    },
    completeAllTodos(state, { status }) {
      state.todoList.forEach(item => {
        item.status = status ? 'COMPLETED' : 'ACTIVE';
      });
    },
    completeTodo(state, { id, status }) {
      const todo = state.todoList.find(item => item.id === id);
      todo.status = status ? 'COMPLETED' : 'ACTIVE';
    },
    clearCompleted(state) {
      state.todoList = state.todoList.filter(item => item.status !== 'COMPLETED');
    },
  },
  actions: {
    updateValue({ commit }, { path, value }) {
      commit('updateValue', { path, value });
    },
    addTodo({ commit }, payload) {
      commit('addTodo', payload);
    },
    removeTodo({ commit }, payload) {
      commit('removeTodo', payload);
    },
    completeAllTodos({ commit }, payload) {
      commit('completeAllTodos', payload);
    },
    completeTodo({ commit }, payload) {
      commit('completeTodo', payload);
    },
    clearCompleted({ commit }, payload) {
      commit('clearCompleted', payload);
    },
  },
};
