import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';

interface InputProps extends InputPropsAntd {
    className?: string,
}

export default function Input({
    className,
    type
}: InputProps) {
    return <InputAntd
        className={className}
        type={type}
    />
}