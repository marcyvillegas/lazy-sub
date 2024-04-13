'use client'

import React, { useState } from 'react';

import { Form, Select } from 'antd';
import { Button } from '@/components';
import { animationTypes } from '../contants/animationTypes';
import { useAnimationProvider } from '@/providers/AnimationProvider';
import { UndoOutlined } from '@ant-design/icons';
import '../styles/animationForm.css';

export default function AnimationForm() {

    const { state, dispatch } = useAnimationProvider()

    const [initialAnimationValue] = useState(state.animationState.animation)

    const [form] = Form.useForm()

    const handleOnClick = () => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), isAnimationStarting: true } } })
    }

    const handleOnReset = () => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), isAnimationStarting: true } } }), 500);
    }

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
                    {
                        state.animationState.isAnimationStarting &&
                        <Form.Item>
                            <Button
                                className='bg-green-button text-white-tab mr-2 hover:!text-white-tab'
                                icon={<UndoOutlined />}
                                onClick={handleOnReset} />
                        </Form.Item>
                    }
                    <Form.Item>
                        <Button
                            className='bg-green-button text-white-tab font-bold hover:!text-white-tab' onClick={handleOnClick}>
                            Play
                        </Button>
                    </Form.Item>
                </div>
            </Form >
        </div >
    )
}