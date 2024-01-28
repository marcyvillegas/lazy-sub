'use client'

import { Button, Checkbox, Form, Input, Collapse } from 'antd';

export default function AnimationForm() {
    return (
        <div>
            <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                // onFinish={ }
                // onFinishFailed={ }
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </div>
    )
}