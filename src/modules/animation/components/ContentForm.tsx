'use client'

import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useAnimationProvider } from '@/providers/AnimationProvider';
import { convertContent } from '@/utils/convertContent';

export default function ContentForm() {

    const [fieldValue] = useState("=");

    const { state, dispatch } = useAnimationProvider()

    const initialValue = convertContent(state.content)

    const [form] = Form.useForm()

    const onSubmit = (values: any) => {
        dispatch({ type: 'SET_CONTENT', payload: values })
    }

    return (
        <div>
            <Form
                className='bg-secondary-background'
                name='basic'
                autoComplete='off'
                requiredMark={false}
                layout='vertical'
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item
                    name="content"
                    id="content-id"
                    rules={[{ required: true, message: 'A content is required.' }]}
                >
                    <Input.TextArea
                        defaultValue={initialValue}
                        className='resize-none h-96 max-h-96'
                        style={{ height: 400, maxHeight: 400 }} />
                </Form.Item>

                <Form.Item
                    label='Separator'
                    name='seperator'
                    id='seperator-id'
                    rules={[{ required: true, message: 'A seperator is required.' }]}
                >
                    <Select defaultValue={fieldValue}>
                        <Select.Option value="=">=</Select.Option>
                        <Select.Option value="-">-</Select.Option>
                    </Select>
                </Form.Item>

                <Button htmlType="submit">
                    Sample
                </Button>
            </Form >
        </div>
    )
}