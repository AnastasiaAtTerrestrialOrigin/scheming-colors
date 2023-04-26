import  { ReactNode }  from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

interface ButtonParams {
    icon?: any,
    value?: string,
    hoverText?: string,
    routePath?: string,
    href?: string,
    className?: string,
    active?: boolean,
    onClick?: (e: any) => any | void,
    children?: ReactNode
}

export const Button: React.FC<ButtonParams> = ({icon, value, hoverText, onClick, 
        routePath, href, children, className, active}) => {
        
    // got to capitalize
    const Icon = icon;
    
    const ButtonSpan = (
        <span className={`button ${className} ${active ? 'active' : ""}`} 
                title={hoverText || value} 
                onClick={onClick}>
            { icon &&
                <Icon className="icon" />
            }
            { value &&
                <label>{value}</label>
            }
            {children}
        </span>)
    
    if(routePath) 
        return (
            <Link to={routePath!}>
                {ButtonSpan}
            </Link>
        )
    else if(href)
        return (
            <a href={href}>
                {ButtonSpan}
            </a>
        )
    else
        return ButtonSpan;
}

export default Button;