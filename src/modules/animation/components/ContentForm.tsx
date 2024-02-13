'use client'

import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { ContentPayloadInterface } from '../interfaces/ContentPayloadInteface';
import { useAnimationProvider } from '@/providers/AnimationProvider';
import { convertContent } from '@/utils/convertContent';

type PropsType = {
    setContentPayload: (values: ContentPayloadInterface) => void
}

export default function ContentForm({ setContentPayload }: PropsType) {

    const { state } = useAnimationProvider()

    const [initialSeparatorValue] = useState(state.separator)

    const initialContentValue = convertContent(state.content)

    const [form] = Form.useForm()

    const onValuesChange = (values: ContentPayloadInterface) => {
        setContentPayload(values)
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
                onValuesChange={onValuesChange}
                initialValues={{ content: initialContentValue, separator: initialSeparatorValue }}
            >
                <Form.Item
                    name="content"
                    id="content-id"
                    rules={[{ required: true, message: 'A content is required.' }]}
                >
                    <Input.TextArea

                        className='resize-none h-96 max-h-96'
                        style={{ height: 400, maxHeight: 400 }} />
                </Form.Item>

                <Form.Item
                    label='Separator'
                    name='separator'
                    id='seperator-id'
                    rules={[{ required: true, message: 'A separator is required.' }]}
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