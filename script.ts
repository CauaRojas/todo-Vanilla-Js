const list = document.querySelector('ul'),
	todoName = document.querySelector('input'),
	addTodoButton = document.querySelector('button'),
	removeTodoButton: HTMLButtonElement =
		//bypassing typescript
		document.querySelector('#clear-button') ?? new HTMLButtonElement();
const trashCan = document.createElement('img');
let countTodos = 0;
const todos: Array<Todo> = [];
interface objTodo {
	todo: string;
	id: number;
}

class Todo {
	constructor(public todo: string) {
		this.id = countTodos;
		this.element = document.createElement('li');

		countTodos++;
		const todosJson: Array<objTodo> = JSON.parse(
			localStorage.getItem('todos') || '[]'
		);
		todosJson.push({ todo, id: this.id as number });
		localStorage.setItem('todos', JSON.stringify(todosJson));
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
				const todosJson: Array<objTodo> = JSON.parse(
					localStorage.getItem('todos') || ''
				);
				if (todosJson.length > 0) {
					const newTodos = todosJson.filter(
						(newTodo) => newTodo.id !== elementId
					);
					localStorage.setItem('todos', JSON.stringify(newTodos));
				}
				list?.removeChild(
					document.getElementById('todo' + elementId) as Node
				);
			});
			this.element.append(removeButton);
		} else {
			this.element.removeChild(
				document.getElementById(this.element.id + 'button') as Node
			);
		}
	}
}

const addTodo = (text: string) => {
	if (text === '') return;
	todos.push(new Todo(text));
};
const clearTodos = (e: MouseEvent) => {
	const completedTodos = [...document.getElementsByClassName('completed')];

	completedTodos.forEach((todo) => {
		const elementId = parseId(undefined, todo as HTMLLIElement);
		const todosJson: Array<objTodo> = JSON.parse(
			localStorage.getItem('todos') || ''
		);
		if (todosJson.length > 0) {
			const newTodos = todosJson.filter(
				(newTodo) => newTodo.id !== elementId
			);
			localStorage.setItem('todos', JSON.stringify(newTodos));
		}
		todo.remove();
	});
};
removeTodoButton.addEventListener('click', clearTodos);
const parseId = (e?: MouseEvent, element?: HTMLLIElement): number => {
	if (e) {
		try {
			return parseInt((e.target as HTMLLIElement).id.split('todo')[1]);
		} catch {
			return parseInt(
				(e.target as HTMLLIElement).id
					.split('todo')[1]
					.split('button')[0]
			);
		}
	}
	//bypassing typescript
	element = element ?? new HTMLLIElement();
	return parseInt(element.id.split('todo')[1]);
};
const retriveTodos = () => {
	const todosJson: Array<objTodo> = JSON.parse(
		localStorage.getItem('todos') || '[]'
	);
	todosJson.forEach((todo) => {
		todos.push(new Todo(todo.todo));
	});
};
retriveTodos();
