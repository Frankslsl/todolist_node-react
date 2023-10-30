import { action } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import "./index.css";
import { Button, Popconfirm, Table, Tag } from "antd";
import axios from "axios";
import moment from "moment";
import _ from "lodash";

function Task() {
	const list = useSelector((state) => state.task.taskList);
	const [color, setColor] = useState("All");
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState([]);
	const { queryAllList, remove, update } = action.task;
	const dispatch = useDispatch();

	useEffect(() => {
		if (!list) {
			const result = dispatch(queryAllList());
		}
	}, [dispatch, queryAllList]);

	//每次list改变,要重新赋值给formData
	useEffect(() => {
		setFormData(() => list);
	}, [list]);
	//* functions
	const handleTagClick = (e) => {
		setColor(() => e.target.textContent);
		if (e.target.textContent === "All") {
			setFormData(list);
		} else if (e.target.textContent === "Unfinished") {
			setFormData(_.filter(list, (item) => !item.isDone));
		} else if (e.target.textContent === "Done") {
			setFormData(_.filter(list, (item) => item.isDone));
		}
	};

	const handleDelete = function (id) {
		return () => {
			setIsLoading(true);
			try {
				dispatch(remove(id));
			} catch (error) {
				console.log("something went wrong when deleting", error);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		};
	};

	const handleFinish = function (id) {
		return () => {
			setIsLoading(true);
			try {
				dispatch(update(id));
			} catch (error) {
				console.error("something went wrong when updateing", error);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		};
	};

	//TODO define the columns for the table
	const columns = [
		{
			title: "#",
			render: (text, record, index) => index + 1,
			width: "8%",
		},
		{ title: "Task", dataIndex: "task", width: "40%" },
		{
			title: "Status",
			dataIndex: "isDone",
			render: (text) => {
				return text ? "It's Done" : "Not Yet";
			},
			width: "12%",
		}, //text是当前这个单元格的值,record是这行的完整数据,index这一行的索引
		{
			title: "Due Time",
			dataIndex: "time",
			render: (
				text,
				record,
				index //要求只要月日,时分,不要秒和年
			) =>
				// record.isDone ? formatTime(record.complete) : formatTime(record.time),
				record.isDone
					? moment(record.complete).format("YYYY-MM-DD HH:mm:ss")
					: moment(record.time).format("YYYY-MM-DD HH:mm:ss"),
			width: "15%",
		},
		{
			title: "Operation",
			render: (_, record, index) => {
				let { isDone } = record;
				return (
					<>
						<Popconfirm
							title="Do you confirm to delete this task?"
							onConfirm={handleDelete(record._id)}
						>
							<Button type="primary" danger>
								Delete
							</Button>
						</Popconfirm>

						{isDone ? null : (
							<Popconfirm
								title="Do you confirm to finish this task?"
								onConfirm={handleFinish(record._id)}
							>
								<Button type="primary">Finish</Button>
							</Popconfirm>
						)}
					</>
				);
			},
			width: "25%",
		},
	];

	return (
		<div className="task-box">
			<div className="tag-box">
				{["All", "Unfinished", "Done"].map((item, index) => {
					return (
						<Tag
							color={color === item ? "#1677ff" : ""}
							onClick={handleTagClick}
							key={index}
						>
							{item}
						</Tag>
					);
				})}
			</div>
			<Table
				dataSource={formData}
				columns={columns}
				loading={isLoading}
				pagination={false}
				rowKey={(record) => {
					return record._id;
				}}
				rowClassName={(record) => {
					return record.isDone ? "finished" : null;
				}}
			></Table>
		</div>
	);
}

export default Task;
