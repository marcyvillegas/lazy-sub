'use client'

import { Button, Checkbox, Form, Input } from 'antd';

export default function AnimationForm() {
    return (
        <div className='bg-secondary-background'>
            < Form
                className='bg-secondary-background'
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }
                }
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
            </Form >
        </div >
    )
}