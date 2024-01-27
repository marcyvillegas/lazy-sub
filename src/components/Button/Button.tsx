import { Button as ButtonAntd, ButtonProps as ButtonPropsAntd } from 'antd';

interface ButtonProps extends ButtonPropsAntd {
    className?: string
}

export default function Button({
    className,
    icon,
    type,
    onClick,
    onBlur
}: ButtonProps) {
    return <ButtonAntd
        className={className}
        icon={icon}
        type={type}
        onClick={onClick}
        onBlur={onBlur}
    />
}