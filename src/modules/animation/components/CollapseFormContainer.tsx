'use client'

import { Button, Checkbox, Form, Input, Collapse } from 'antd';
import AnimationForm from './AnimationForm';

export default function CollapseFormContainer() {
    return (
        <div className='bg-secondary-background col-span-12 mt-2 lg:mt-0 lg:col-span-4 rounded-md p-5 text-logo-grey'>
            <Collapse
                defaultActiveKey={'1'}
                size="large"
                items={[{
                    key: '1', label: 'Subtitle',
                    children: <AnimationForm />
                }]}
            />

        </div>
    )
}