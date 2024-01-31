import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../todo/TodoList.module.css";
import { Button, TextField } from "@mui/material";

const url =
	"https://elchocrud.pro/api/v1/7102715d99944ccea4758e0ad0b6ba6f/todo";

const TodoList = () => {
	const [todo, setTodo] = useState([]);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [isEdit, setIsEdit] = useState(null);
	const [titleEdit, setTitleEdit] = useState("");
	const [imageEdit, setImageEdit] = useState("");
	const [descriptionEdit, setDescriptionEdit] = useState("");

	const handleAdd = async () => {
		if (title === "" || image === "" || description === "") {
			alert("Заполните поле!");
		} else {
			const newData = {
				title: title,
				image: image,
				description: description,
			};

			setTitle("");
			setImage("");
			setDescription("");

			const response = await axios.post(url, newData);
			setTodo(response.data);
		}
	};

	const deleteAll = async () => {
		const response = await axios.delete(url);
		setTodo(response.data);
	};

	useEffect(() => {
		getTodos();
	}, []);

	const getTodos = async () => {
		const response = await axios.get(url);
		setTodo(response.data);
	};

	const deleteTodo = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setTodo(response.data);
	};

	const updateTodo = async (id) => {
		const updatedData = {
			title: titleEdit,
			image: imageEdit,
			description: descriptionEdit,
		};

		const response = await axios.put(`${url}/${id}`, updatedData);
		setTodo(response.data);
		setIsEdit(null);
	};

	return (
		<div>
			<h1 className={styles.h1One}>Todo List</h1>
			<div className={styles.todoList}>
				<TextField
					type="text"
					placeholder="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					id="outlined-basic"
					label="title"
					variant="outlined"
				/>

				<TextField
					type="text"
					placeholder="image"
					value={image}
					onChange={(e) => setImage(e.target.value)}
					id="outlined-basic"
					label="image"
					variant="outlined"
				/>

				<TextField
					type="text"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					id="outlined-basic"
					label="Outlined"
					variant="outlined"
				/>

				<div className={styles.buttons}>
					<div>
						<Button onClick={handleAdd} variant="outlined">
							Add
						</Button>
					</div>
					<div>
						<Button onClick={() => deleteAll()} variant="outlined">
							Delete All
						</Button>
					</div>
				</div>
			</div>

			{todo.map((item) => (
				<div className={styles.inputsEdit} key={item._id}>
					<div className={styles.inputs}>
						{isEdit === item._id ? (
							<>
								<TextField
									type="text"
									placeholder="title"
									value={titleEdit}
									onChange={(e) => setTitleEdit(e.target.value)}
									id="filled-basic"
									label="title"
									variant="filled"
								/>
								<TextField
									type="text"
									placeholder="image"
									value={imageEdit}
									onChange={(e) => setImageEdit(e.target.value)}
									id="filled-basic"
									label="image"
									variant="filled"
								/>
								<TextField
									type="text"
									placeholder="description"
									value={descriptionEdit}
									onChange={(e) => setDescriptionEdit(e.target.value)}
									id="filled-basic"
									label="description"
									variant="filled"
								/>

								<Button
									onClick={() => updateTodo(item._id)}
									variant="contained">
									Update
								</Button>
							</>
						) : (
							<>
								<div className={styles.textOne}>
									<img src={item.image} alt={item.title} />
									<div className={styles.text}>
										<h1>{item.title}</h1>
										<p>{item.description}</p>
									</div>
								</div>
							</>
						)}
					</div>
					<Button onClick={() => deleteTodo(item._id)} variant="contained">
						Delete
					</Button>
					<Button
						onClick={() => {
							setIsEdit(item._id);
							setTitleEdit(item.title);
							setImageEdit(item.image);
							setDescriptionEdit(item.description);
						}}
						variant="contained">
						Edit
					</Button>
				</div>
			))}
		</div>
	);
};

export default TodoList;
