'use client'

import React, { useState } from 'react';

import { Form, Select } from 'antd';
import { Button } from '@/components';
import { animationTypes } from '../contants/animationTypes';
import { useAnimationProvider } from '@/providers/AnimationProvider';
import '../styles/animationForm.css';

export default function AnimationForm() {

    const { state } = useAnimationProvider()

    const [initialAnimationValue] = useState(state.animationState.animation)

    const [form] = Form.useForm()

    return (
        <div className='bg-secondary-background'>
            < Form
                className='bg-secondary-background'
                name='basic'
                autoComplete='off'
                requiredMark={false}
                layout='vertical'
                form={form}
                initialValues={{ animation: initialAnimationValue }}
            // onFinish={ }
            >
                <Form.Item
                    label='Animation'
                    name='animation'
                    id='animation-id'
                    rules={[{ required: true, message: 'A separator is required.' }]}
                >
                    <Select>
                        {animationTypes.map((item) => (
                            <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <div className='flex justify-end'>
                    <Button className='bg-green-button text-white-tab font-bold'>
                        Generate
                    </Button>
                </div>
            </Form >
        </div >
    )
}