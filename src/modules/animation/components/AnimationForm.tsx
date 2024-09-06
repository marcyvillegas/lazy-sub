'use client'

import React, { useEffect, useState } from 'react'

import { Form, Select, message } from 'antd'
import { Button } from '@/components'
import { animationTypes } from '../constants/animationTypes'
import {
    AnimationStateInterface,
    ContentStateInterface,
    useAnimationStore,
} from '@/stores/animationStore'
import { UndoOutlined } from '@ant-design/icons'
import '../styles/animationForm.css'
import { themes } from '../constants/themes'
import { fontSizes, fonts } from '../constants'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function AnimationForm() {
    const { contentState, animationState, updateAnimation } =
        useAnimationStore()
    const { setContentAnimationState } = useLocalStorage()

    const [initialAnimationValue, setInitialAnimationValue] = useState(
        animationState.animation
    )
    const [initialThemeValue, setInitialThemeValue] = useState(
        animationState.theme
    )
    const [initialFontValue, setInitialFontValue] = useState(
        animationState.font
    )
    const [initialFontSizeValue, setInitialFontSizeValue] = useState(
        animationState.fontSize
    )
    const [isResetClicked, setIsResetClicked] = useState(false)

    const [existingLocalStorage, setExistingLocalStorage] =
        useState<boolean>(false)

    const [form] = Form.useForm()

    console.log('test')

    let test = 'fasd'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const existingState = localStorage.getItem(
                'content-animation-state'
            )
                ? JSON.parse(localStorage.getItem('content-animation-state')!)
                : false

            if (existingState) setExistingLocalStorage(true)

            const initialState = existingState?.animationState || animationState

            if (!animationState.startEditing) {
                updateAnimation({
                    animation: initialState.animation,
                    theme: initialState.theme,
                    font: initialState.font,
                    fontSize: initialState.fontSize,
                })

                form.resetFields()
                setInitialAnimationValue(initialState.animation)
                setInitialThemeValue(initialState.theme)
                setInitialFontValue(initialState.font)
                setInitialFontSizeValue(initialState.fontSize)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            animation: initialAnimationValue,
            theme: initialThemeValue,
            font: initialFontValue,
            fontSize: initialFontSizeValue,
        })

        if (animationState.startEditing && !existingLocalStorage) {
            form.setFieldsValue({
                animation: animationState.animation,
                theme: animationState.theme,
                font: animationState.font,
                fontSize: animationState.fontSize,
            })
            setInitialAnimationValue(animationState.animation)
            setInitialThemeValue(animationState.theme)
            setInitialFontValue(animationState.font)
            setInitialFontSizeValue(animationState.fontSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        form,
        initialAnimationValue,
        initialThemeValue,
        initialFontValue,
        initialFontSizeValue,
        animationState.startEditing,
    ])

    const [messageApi, contextHolder] = message.useMessage()
    const showSuccessMessage = () => {
        messageApi.open({
            type: 'success',
            content: 'Saved in local storage!',
        })
    }

    const handleSave = (
        contentState: ContentStateInterface,
        animationState: AnimationStateInterface
    ) => {
        setContentAnimationState(contentState, animationState)
        showSuccessMessage()
    }

    const handleOnClick = () => {
        updateAnimation({
            animation: form.getFieldValue('animation'),
            theme: form.getFieldValue('theme'),
            font: form.getFieldValue('font'),
            fontSize: form.getFieldValue('fontSize'),
            isAnimationStarting: true,
        })
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
        }, 500)
    }

    const handleChangeAnimation = (value: any) => {
        updateAnimation({ animation: value, isAnimationStarting: false })

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
        }, 200)
    }

    const handleChangeTheme = (value: any) => {
        updateAnimation({ theme: value, isAnimationStarting: false })

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
        }, 200)
    }

    const handleChangeFontSize = (value: any) => {
        updateAnimation({ fontSize: value, isAnimationStarting: false })

        setTimeout(() => {
            updateAnimation({ isAnimationStarting: true })
        }, 200)
    }

    const handleOnClickForm = () => {
        updateAnimation({ startEditing: true })
    }

    return (
        <>
            {contextHolder}
            <div className="bg-secondary-background">
                <Form
                    className="bg-secondary-background"
                    name="basic"
                    autoComplete="off"
                    requiredMark={false}
                    layout="vertical"
                    form={form}
                    onChange={handleOnClick}
                    onClick={handleOnClickForm}
                >
                    <Form.Item
                        label={
                            <label
                                style={{
                                    color: '#DEDEDE',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Animation
                            </label>
                        }
                        name="animation"
                        id="animation-id"
                    >
                        <Select onChange={handleChangeAnimation}>
                            {animationTypes.map((item) => (
                                <Select.Option
                                    key={item.name}
                                    value={item.name}
                                >
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={
                            <label
                                style={{
                                    color: '#DEDEDE',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Theme
                            </label>
                        }
                        name="theme"
                        id="theme-id"
                    >
                        <Select onChange={handleChangeTheme}>
                            {themes.map((item) => (
                                <Select.Option
                                    key={item.name}
                                    value={item.name}
                                >
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label={
                            <label
                                style={{
                                    color: '#DEDEDE',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                }}
                            >
                                Size
                            </label>
                        }
                        name="fontSize"
                        id="font-size-id"
                        className="col-span-12"
                    >
                        <Select
                            onChange={handleChangeFontSize}
                            className="w-full"
                        >
                            {fontSizes.map((item) => (
                                <Select.Option
                                    key={item.name}
                                    value={item.name}
                                >
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div className="flex justify-between">
                        <div>
                            <Form.Item>
                                <Button
                                    className="bg-green-button text-white-tab font-bold mr-2 hover:!text-white-tab"
                                    onClick={() =>
                                        handleSave(contentState, animationState)
                                    }
                                >
                                    Save
                                </Button>
                            </Form.Item>
                        </div>

                        <div className="flex">
                            {animationState.isAnimationStarting && (
                                <Form.Item>
                                    <Button
                                        className="bg-green-button text-white-tab mr-2 hover:!text-white-tab"
                                        icon={<UndoOutlined />}
                                        onClick={handleOnReset}
                                    />
                                </Form.Item>
                            )}
                            {!isResetClicked && (
                                <Form.Item>
                                    <Button
                                        className="bg-green-button text-white-tab font-bold hover:!text-white-tab"
                                        onClick={
                                            animationState.isAnimationStarting &&
                                                !isResetClicked
                                                ? handleOnStop
                                                : handleOnClick
                                        }
                                    >
                                        {animationState.isAnimationStarting
                                            ? 'Stop'
                                            : 'Play'}
                                    </Button>
                                </Form.Item>
                            )}
                        </div>
                    </div>
                </Form>
            </div>
        </>
    )
}
