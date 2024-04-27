'use client'

import React, { useState } from 'react';

import { Form, Select } from 'antd';
import { Button } from '@/components';
import { animationTypes } from '../constants/animationTypes';
import { useAnimationProvider } from '@/providers/AnimationProvider';
import { UndoOutlined } from '@ant-design/icons';
import '../styles/animationForm.css';
import { themes } from '../constants/themes';

export default function AnimationForm() {

    const { state, dispatch } = useAnimationProvider()

    const [initialAnimationValue] = useState(state.animationState.animation)
    const [initialThemeValue] = useState(state.animationState.theme)
    const [isResetClicked, setIsResetClicked] = useState(false)

    const [form] = Form.useForm()

    const handleOnClick = () => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), isAnimationStarting: true } } })
    }

    const handleOnStop = () => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), isAnimationStarting: false } } })
    }

    const handleOnReset = () => {

        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), isAnimationStarting: false } } })
        setIsResetClicked(true)

        setTimeout(() => {
            dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), isAnimationStarting: true } } })
            setIsResetClicked(false)
        }, 500);
    }

    const handleChangeAnimation = (value: any) => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: value, theme: state.animationState.theme, isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: value, theme: state.animationState.theme, isAnimationStarting: true } } }), 200);
    }

    const handleChangeTheme = (value: any) => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: value, isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: value, isAnimationStarting: true } } }), 200);
    }

    return (
        <div className='bg-secondary-background'>
            <Form
                className='bg-secondary-background'
                name='basic'
                autoComplete='off'
                requiredMark={false}
                layout='vertical'
                form={form}
                initialValues={{ animation: initialAnimationValue, theme: initialThemeValue }}
                onChange={handleOnClick}
            >
                <Form.Item
                    label='Animation'
                    name='animation'
                    id='animation-id'
                >
                    <Select onChange={handleChangeAnimation}>
                        {animationTypes.map((item) => (
                            <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label='Theme'
                    name='theme'
                    id='theme-id'
                >
                    <Select onChange={handleChangeTheme}>
                        {themes.map((item) => (
                            <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <div className='flex justify-end'>
                    {state.animationState.isAnimationStarting &&
                        <Form.Item>
                            <Button
                                className='bg-green-button text-white-tab mr-2 hover:!text-white-tab'
                                icon={<UndoOutlined />}
                                onClick={handleOnReset} />
                        </Form.Item>}
                    {!isResetClicked &&
                        <Form.Item>
                            <Button
                                className='bg-green-button text-white-tab font-bold hover:!text-white-tab' onClick={state.animationState.isAnimationStarting && !isResetClicked ? handleOnStop : handleOnClick}>
                                {state.animationState.isAnimationStarting ? "Stop" : "Play"}
                            </Button>
                        </Form.Item>}
                </div>
            </Form >
        </div >
    )
}