'use client'

import React, { useState } from 'react';

import { Form, Select } from 'antd';
import { Button } from '@/components';
import { animationTypes } from '../constants/animationTypes';
import { useAnimationStore } from '@/stores/animationStore';
import { UndoOutlined } from '@ant-design/icons';
import '../styles/animationForm.css';
import { themes } from '../constants/themes';
import { fontSizes, fonts } from '../constants';

export default function AnimationForm() {
    const { animationState, updateAnimation } = useAnimationStore();

    const [initialAnimationValue] = useState(animationState.animation)
    const [initialThemeValue] = useState(animationState.theme)
    const [initialFontValue] = useState(animationState.font)
    const [initialFontSizeValue] = useState(animationState.fontSize)
    const [isResetClicked, setIsResetClicked] = useState(false)

    const [form] = Form.useForm()

    const handleOnClick = () => {
        updateAnimation({ animation: form.getFieldValue('animation'), theme: form.getFieldValue('theme'), font: form.getFieldValue('font'), fontSize: form.getFieldValue('fontSize'), isAnimationStarting: true })
    }

    const handleOnStop = () => {
        updateAnimation({ isAnimationStarting: false })
    }

    const handleOnReset = () => {
        updateAnimation({ isAnimationStarting: false })
        setIsResetClicked(true)

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
            setIsResetClicked(false)
        }, 500);
    }

    const handleChangeAnimation = (value: any) => {
        updateAnimation({ animation: value, isAnimationStarting: false })

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
        }, 200);
    }

    const handleChangeTheme = (value: any) => {
        updateAnimation({ theme: value, isAnimationStarting: false })

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
        }, 200);
    }

    const handleChangeFontSize = (value: any) => {
        updateAnimation({ fontSize: value, isAnimationStarting: false })

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
        }, 200);
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
                    {animationState.isAnimationStarting &&
                        <Form.Item>
                            <Button
                                className='bg-green-button text-white-tab mr-2 hover:!text-white-tab'
                                icon={<UndoOutlined />}
                                onClick={handleOnReset} />
                        </Form.Item>}
                    {!isResetClicked &&
                        <Form.Item>
                            <Button
                                className='bg-green-button text-white-tab font-bold hover:!text-white-tab' onClick={animationState.isAnimationStarting && !isResetClicked ? handleOnStop : handleOnClick}>
                                {animationState.isAnimationStarting ? "Stop" : "Play"}
                            </Button>
                        </Form.Item>}
                </div>
            </Form >
        </div >
    )
}