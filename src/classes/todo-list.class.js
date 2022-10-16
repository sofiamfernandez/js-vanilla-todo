import { Todo } from './todo.class';

export class TodoList {
    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo){
        this.todos.push(todo); //esto va a agregar el todo al final
        this.guardarLocalStorage();
    }

    eliminarTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id); //filter me va a devolver un arreglo con los elementos cuyo id sea diferente al id de la tarea correspondiente
        this.guardarLocalStorage();
    }

    marcarCompletado(id){
        for (const todo of this.todos) {
           if( todo.id == id) {
           todo.completado = !todo.completado;
           this.guardarLocalStorage();
           break;
        }
    }
}

    eliminarCompletados(){
        this.todos = this.todos.filter(todo => !todo.completado); //aca estoy diciendo que me devuelva en un array los que NO están completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [] ;
        this.todos = this.todos.map( Todo.fromJson );
    }
}