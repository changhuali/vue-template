const TodoMVC = () => import(/* webpackChunkName: "todoMVC" */ 'containers/TodoMVC');

export default [
  { path: '/', component: TodoMVC },
];
