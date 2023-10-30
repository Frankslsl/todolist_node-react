import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { action } from "../../store/actions";
import { useDispatch } from "react-redux";

import "./index.css";
import { useForm } from "antd/es/form/Form";
const { TextArea } = Input;

function Header() {
	const { insert } = action.task;
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	//使用hook函数来创建表单实例,来操作表单
	const [form] = useForm();

	//*functions
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setIsLoading(() => {
			return false;
		});
	};

	const handleSubmit = async () => {
		setIsLoading(() => {
			return true;
		});
		try {
			const values = await form.validateFields();
			console.log(form.getFieldsValue(true));

			const data = { ...values, time: values.time.$d };

			dispatch(insert(data));
			setIsModalOpen(() => {
				return false;
			});
			setIsLoading(() => {
				return false;
			});
			form.resetFields();
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			setIsLoading(() => {
				return false;
			});
			form.resetFields();
		} finally {
			setIsLoading(() => {
				return false;
			});
			form.resetFields();
		}
	};

	return (
		<div className="header">
			<h2 className="title">TASK OA system</h2>
			<Button type="primary" onClick={showModal}>
				Add new task
			</Button>
			<Modal
				title="Adding a new task"
				open={isModalOpen}
				onOk={handleSubmit}
				onCancel={handleCancel}
				confirmLoading={isLoading}
				keyboard={false}
				maskClosable={false}
				okText="Submit"
				okType="primary"
			>
				<Form form={form} layout="vertical">
					<Form.Item
						label="Task content"
						name="task"
						rules={[{ required: true }, { min: 8 }]}
						validateTrigger="onBlur"
					>
						<TextArea allowClear={true} showCount={true} rows={5} />
					</Form.Item>
					<Form.Item label="Due time" name="time" rules={[{ required: true }]}>
						<DatePicker showTime />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default Header;
