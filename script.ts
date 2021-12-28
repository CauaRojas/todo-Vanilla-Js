//saving the DOM elements for later use
const list = document.querySelector('ul'),
	todoName = document.querySelector('input'),
	addTodoButton = document.querySelector('button'),
	removeTodoButton: HTMLButtonElement =
		//bypassing typescript
		document.querySelector('#clear-button') ?? new HTMLButtonElement();

//A count how many todos are created
//its used to create a id for every todo
let countTodos = 0;

//array of every todo in the page
const todos: Array<Todo> = [];

//Interface of the Todos stored in the localStorage
interface objTodo {
	todo: string;
	id: number;
	isDone?: boolean;
}

//Main Class of the file
class Todo {
	id: Number;
	element: HTMLLIElement;
	// Constructor recives a string to be the text of the todo
	constructor(public todo: string) {
		this.id = countTodos;
		this.element = document.createElement('li');

		countTodos++;

		//Get the todos from local storage
		const todosJson: Array<objTodo> = JSON.parse(
			localStorage.getItem('todos') || '[]'
		);
		//Add a new todo to the array
		todosJson.push({ todo, id: this.id as number });
		//Push the old todos plus the new one to the local storage
		localStorage.setItem('todos', JSON.stringify(todosJson));

		//Setup the todo LI element on the DOM
		this.element.innerText = this.todo;
		this.element.id = `todo${this.id}`;
		this.element.className = 'todo';
		this.element.addEventListener('dblclick', (e) => {
			//When the todo gets double clicked it triggers the toggle todo method
			const elementId = parseId(e);
			todos[elementId].toggleTodo();
		});
		list?.append(this.element);
	}

	toggleTodo() {
		if (this.element.classList.toggle('completed')) {
			//If the todo has been assigned to completed it adds a button to remove the todo
			// On its side
			const removeButton = document.createElement('button');
			removeButton.className = 'remove-button';
			removeButton.id = this.element.id + 'button';
			removeButton.addEventListener('click', (e) => {
				const elementId = parseId(e);
				const todosJson: Array<objTodo> = JSON.parse(
					localStorage.getItem('todos') || ''
				);
				if (todosJson.length > 0) {
					//If the localStorage has the todo stored on it, it removes the todo from
					//the array and them pushes the todo to the localStorage
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
			//If the todo was completed and them you click to undo the todo
			//It removes the remove button
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
