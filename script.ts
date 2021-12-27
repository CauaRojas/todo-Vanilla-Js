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
			removeButton.innerText = 'X';
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
	todos.push(new Todo(text));
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
