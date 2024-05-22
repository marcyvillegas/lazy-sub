'use client'

import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import { convertArrayToContentString } from '@/utils/convertArrayToContentString';
import { useAnimationStore } from '@/stores/animationStore';


export default function ContentForm() {
    const { contentState, updateContent } = useAnimationStore();

    const [initialSeparatorValue] = useState(contentState.separator)

    const initialContentValue = convertArrayToContentString(contentState.content, contentState.separator)

    const [form] = Form.useForm()

    const onValuesChange = (changedValues: any, allValues: { content: string, separator: string }) => {

        const convertContentStringToArray = (allValues.content.trim()).split(`\n${allValues.separator}\n`)

        updateContent({
            content: convertContentStringToArray,
            separator: allValues.separator
        })
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
                    name='content'
                    id='content-id'
                    rules={[{ required: true, whitespace: true, message: 'A content is required.' }]}
                >
                    <Input.TextArea
                        className='resize-none h-96 max-h-96'
                        style={{ height: 400, maxHeight: 400 }}
                    />
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