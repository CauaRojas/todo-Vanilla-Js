const list = document.querySelector('ul'),
	todoName = document.querySelector('input'),
	addTodoButton = document.querySelector('button');
const trashCan = document.createElement('img');
let countTodos = 0;
const todos: Array<Todo> = [];

class Todo {
	constructor(public todo: string) {
		this.id = countTodos;
		this.element = document.createElement('li');

		countTodos++;

		this.element.innerText = this.todo;
		this.element.id = `todo${this.id}`;
		this.element.className = 'todo';
		this.element.addEventListener('dblclick', (e) => {
			const elementId = parseId(e);
			todos[elementId].toggleTodo();
		});
		list?.append(this.element);
	}
	id: Number;
	element: HTMLLIElement;
	toggleTodo() {
		if (this.element.classList.toggle('completed')) {
			const removeButton = document.createElement('button');
			removeButton.className = 'remove-button';
			removeButton.id = this.element.id + 'button';
			removeButton.addEventListener('click', (e) => {
				const elementId = parseId(e);
				list?.removeChild(
					document.getElementById('todo' + elementId) as Node
				);
			});
			this.element.append(removeButton);
		} else {
			this.element.removeChild(
				document.getElementById(this.element.id + 'button') as Node
			);
			console.log('tirei butão');
		}
	}
}

const addTodo = (text: string) => {
	if (text === '') return;
	todos.push(new Todo(text));
};
const clearTodos = () => {
	const completedTodos = [...document.getElementsByClassName('completed')];
	completedTodos.forEach((todo) => {
		todo.remove();
	});
};
const parseId = (e: MouseEvent): number => {
	try {
		return parseInt((e.target as HTMLLIElement).id.split('todo')[1]);
	} catch {
		return parseInt(
			(e.target as HTMLLIElement).id.split('todo')[1].split('button')[0]
		);
	}
};
