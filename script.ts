const list = document.querySelector('ul'),
	todoName = document.querySelector('input'),
	addTodoButton = document.querySelector('button');

let countTodos = 0;
const todos: Array<Todo> = [];
class Todo {
	constructor(public todo: string) {
		this.id = countTodos;
		this.element = document.createElement('li');

		countTodos++;

		this.element.innerText = this.todo;
		this.element.id = `todo${this.id}`;
		this.element.addEventListener('dblclick', (e) => {
			const elementId = parseTodoId(e);
			todos[elementId].toggleTodo();
		});
		list?.append(this.element);
	}
	id: Number;
	element: HTMLLIElement;
	toggleTodo() {
		this.element.classList.toggle('completed');
	}
}

const addTodo = (text: string) => {
	todos.push(new Todo(text));
};

const parseTodoId = (e: MouseEvent): number => {
	return parseInt((e.target as HTMLLIElement).id.split('todo')[1]);
};
