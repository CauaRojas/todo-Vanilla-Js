const list = document.querySelector('ul'),
	todoName = document.querySelector('input'),
	addTodoButton = document.querySelector('button');

const addTodo = (text: string) => {
	const todo = document.createElement('li');
	todo.innerText = text;
	list?.append(todo);
};
