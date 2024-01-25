import Button from '@/components/Button/Button'
import { MenuOutlined } from '@ant-design/icons';

export default function Menu() {
    return (
        <div className='me-5'>

            <div>

            </div>

            <div className='md:hidden'>
                <Button
                    type='text'
                    icon={<MenuOutlined
                        className='text-logo-grey'
                    />}
                />
            </div>
        </div>
    );
}