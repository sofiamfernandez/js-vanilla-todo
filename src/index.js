import './styles.css';

import { Todo, TodoList } from './classes'
import { crearTodoHtml } from './js/componentes';



//Así creo instancias
export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml); //esto hace que al actualizar el navegador los cambios se mantengan
console.log('todos', todoList.todos);