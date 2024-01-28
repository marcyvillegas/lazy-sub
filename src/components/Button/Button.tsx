import { Button as ButtonAntd, ButtonProps as ButtonPropsAntd } from 'antd';

interface ButtonProps extends ButtonPropsAntd {
    className?: string,
    key?: string
}

export default function Button({
    className,
    icon,
    type,
    onClick,
    onBlur,
    key
}: ButtonProps) {
    return <ButtonAntd
        key={key}
        className={className}
        icon={icon}
        type={type}
        onClick={onClick}
        onBlur={onBlur}
    />
}