'use client'

import { Form, Input, Select } from 'antd';

export default function ContentForm() {

    const [form] = Form.useForm()

    return (
        <div>
            <Form
                className='bg-secondary-background'
                name='basic'
                autoComplete='off'
                requiredMark={false}
                layout='vertical'
            >
                <Form.Item
                    name="content"
                    id="content-id"
                    rules={[{ required: true, message: 'A content is required.' }]}
                >
                    <Input.TextArea className='resize-none h-96 max-h-96' />
                </Form.Item>

                <Form.Item
                    label='Separator'
                    name='seperator'
                    id='seperator-id'
                    rules={[{ required: true, message: 'A seperator is required.' }]}
                >
                    <Select>
                        <Select.Option value="=">=</Select.Option>
                        <Select.Option value="-">-</Select.Option>
                    </Select>
                </Form.Item>
            </Form >
        </div>
    )
}