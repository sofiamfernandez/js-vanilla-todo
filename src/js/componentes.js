
import { Todo } from "../classes";
import { todoList } from "../index";

//Referencias al html
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFiltros   = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')



export const crearTodoHtml =(todo)=>{
    const htmlTodo = `
    <li class="${(todo.completado) ? "completed" : ""}" data-id= ${todo.id}>
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? "checked" : ""}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

//Eventos
//TxtInput es una variable que almacena lo que se escriba en el input
//el evento va a escuchar keyup que es cuando la tecla se suelta
//le enviamos por parámetro el evento
//Hacemos una condición que evalua si el codigo de tecla es igual a 13 que es enter, entonces crea un nuevo objeto de clase Todo y añado la condición si la cantidad de caracteres es mayor a 0 se cumple, si no no, eso evita que la tarea esté vacía. 

txtInput.addEventListener('keyup',(e)=>{
    if(e.key === "Enter" && txtInput.value.length > 0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( nuevoTodo);
        crearTodoHtml(nuevoTodo); //inyecta el contenido del nuevo todo en el html
        txtInput.value = '';
    }
});
divTodoList.addEventListener('click', (e)=> {
    //aca estoy guardando en una variable el nombre de la etiqueta que hizo click el usuario
    const nombreElemento = e.target.localName; //label, input, etc. 
    const todoElemento   = e.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id'); // me trae el atributo
    if( nombreElemento.includes('input')) { //si el elemento en el que se hace click es el check
        todoList.marcarCompletado( todoId); //entonces marcar a ese como completado
        todoElemento.classList.toggle('completed'); //el toggle agrega la clase si no existe o la quita si ya está 
    }else if (nombreElemento.includes('button')){ //si el elemento seleccionado es la cruz, o sea el button
        todoList.eliminarTodo( todoId); //elimina el todo
        divTodoList.removeChild(todoElemento); //elimina el html que se crea con la tarea indicada
    }
});

btnBorrar.addEventListener('click',()=> {

    todoList.eliminarCompletados(); //Este método elimina los todos pero no del html
    for(let i = divTodoList.children.length-1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
    //este bucle for permite recorrer de atrás para adelante los elementos html de la lista. Va de atrás para adelante para que los índices no cambien. El i -1 es el último elemento del array
});
ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;

        }


    }



});