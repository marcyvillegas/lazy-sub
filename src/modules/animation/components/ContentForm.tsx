'use client'

import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { convertArrayToContentString } from '@/utils/convertArrayToContentString';
import { useAnimationStore } from '@/stores/animationStore';


export default function ContentForm() {
    const { contentState, updateContent } = useAnimationStore();

    const [initialSeparatorValue, setInitialSeparatorValue] = useState<any>(null)
    const [initialContentValue, setInitialContentValue] = useState<any>(null)

    const [form] = Form.useForm()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const existingState = localStorage.getItem('content-animation-state')
                ? JSON.parse(localStorage.getItem('content-animation-state')!)
                : null;

            const initialState = existingState.contentState || contentState;

            form.resetFields();
            setInitialSeparatorValue(initialState.separator);
            setInitialContentValue(convertArrayToContentString(initialState.content, initialState.separator));
        }

    }, []);

    useEffect(() => {
        form.setFieldsValue({
            content: initialContentValue,
            separator: initialSeparatorValue,
        });

        if (contentState.startEditing) {
            form.setFieldsValue({
                content: convertArrayToContentString(contentState.content, contentState.separator),
                separator: contentState.separator,
            });
            setInitialSeparatorValue(contentState.separator);
            setInitialContentValue(convertArrayToContentString(contentState.content, contentState.separator));
        }
    }, [form, initialContentValue, initialSeparatorValue, contentState.startEditing]);


    const onValuesChange = (changedValues: any, allValues: { content: string, separator: string }) => {

        const convertContentStringToArray = (allValues.content.trim()).split(`\n${allValues.separator}\n`)

        updateContent({
            content: convertContentStringToArray,
            separator: allValues.separator,
            startEditing: true
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