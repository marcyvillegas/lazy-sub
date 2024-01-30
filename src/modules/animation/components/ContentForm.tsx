'use client'

import { Button, Checkbox, Form, Input } from 'antd';

export default function ContentForm() {
    return (
        <div>
            <Form
                className='bg-secondary-background'
                name="basic"
                autoComplete="off"
            >
                <Form.Item
                    name="content"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
            </Form >
        </div>
    )
}