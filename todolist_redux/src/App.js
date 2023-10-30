import { useEffect } from "react";
import Task from "./components/Task";
import Header from "./components/Header";
import "./App.less";
import { useDispatch } from "react-redux";
import { action } from "./store/actions";

function App() {
	const dispatch = useDispatch();
	const { queryAllList } = action.task;

	useEffect(() => {
		dispatch(queryAllList());
	}, [dispatch, queryAllList]);

	return (
		<div className="task-box">
			<Header />
			<Task />
		</div>
	);
}

export default App;
