'use client'

import React, { useState } from 'react';

import { Form, Select } from 'antd';
import { Button } from '@/components';
import { animationTypes } from '../constants/animationTypes';
import { useAnimationProvider } from '@/providers/AnimationProvider';
import { UndoOutlined } from '@ant-design/icons';
import '../styles/animationForm.css';
import { themes } from '../constants/themes';
import { fontSizes, fonts } from '../constants';

export default function AnimationForm() {

    const { state, dispatch } = useAnimationProvider()

    const [initialAnimationValue] = useState(state.animationState.animation)
    const [initialThemeValue] = useState(state.animationState.theme)
    const [initialFontValue] = useState(state.animationState.font)
    const [initialFontSizeValue] = useState(state.animationState.fontSize)
    const [isResetClicked, setIsResetClicked] = useState(false)

    const [form] = Form.useForm()

    const handleOnClick = () => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), font: form.getFieldValue('font'), fontSize: form.getFieldValue('fontSize'), isAnimationStarting: true } } })
    }

    const handleOnStop = () => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), font: form.getFieldValue('font'), fontSize: form.getFieldValue('fontSize'), isAnimationStarting: false } } })
    }

    const handleOnReset = () => {

        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), font: form.getFieldValue('font'), fontSize: form.getFieldValue('fontSize'), isAnimationStarting: false } } })
        setIsResetClicked(true)

        setTimeout(() => {
            dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), font: form.getFieldValue('font'), fontSize: form.getFieldValue('fontSize'), isAnimationStarting: true } } })
            setIsResetClicked(false)
        }, 500);
    }

    const handleChangeAnimation = (value: any) => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: value, theme: state.animationState.theme, font: state.animationState.font, fontSize: state.animationState.fontSize, isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: value, theme: state.animationState.theme, font: state.animationState.font, fontSize: state.animationState.fontSize, isAnimationStarting: true } } }), 200);
    }

    const handleChangeTheme = (value: any) => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: value, font: state.animationState.font, fontSize: state.animationState.fontSize, isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: value, font: state.animationState.font, fontSize: state.animationState.fontSize, isAnimationStarting: true } } }), 200);
    }

    const handleChangeFont = (value: any) => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: state.animationState.theme, font: value, fontSize: state.animationState.fontSize, isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: state.animationState.theme, font: value, fontSize: state.animationState.fontSize, isAnimationStarting: true } } }), 200);
    }

    const handleChangeFontSize = (value: any) => {
        dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: state.animationState.theme, font: state.animationState.font, fontSize: value, isAnimationStarting: false } } })

        setTimeout(() => dispatch({ type: 'SET_ANIMATION', payload: { animationState: { animation: state.animationState.animation, theme: state.animationState.theme, font: state.animationState.font, fontSize: value, isAnimationStarting: true } } }), 200);
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
                initialValues={{ animation: initialAnimationValue, theme: initialThemeValue, font: initialFontValue, fontSize: initialFontSizeValue }}
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

                <div className='grid lg:grid-cols-4 grid-cols-12 gap-2'>
                    {/* <Form.Item
                        label='Font'
                        name='font'
                        id='font-id'
                        className='col-span-12 lg:col-span-2'
                    >
                        <Select onChange={handleChangeFont} className='w-full'>
                            {fonts.map((item) => (
                                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item> */}

                    <Form.Item
                        label='Size'
                        name='fontSize'
                        id='font-size-id'
                        className='col-span-12'
                    >
                        <Select onChange={handleChangeFontSize} className='w-full'>
                            {fontSizes.map((item) => (
                                <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

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