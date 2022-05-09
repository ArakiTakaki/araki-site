import { FC } from 'react';
import { Link } from '@tanstack/react-location';
import { getUrl } from '../../utils/site';
import { NAVIGATION } from './constants';
import { BaseIcon } from './BaseIcon';

export const Navigation: FC = () => {
    return (
        <nav>
            <ul className='menu p-4 bg-base-100'>
                {
                    NAVIGATION.map((value, index) => {
                        if (value.name === 'divider') return (<li key={index} />);
                        if (value.name === 'header') return (
                            <li className="menu-title" key={index}>
                                <span>{value.text}</span>
                            </li>
                        );
                        return (
                            <li key={index}>
                                <Link to={getUrl(...value.path)}>
                                    {value.icon && <BaseIcon name={value.icon} />}
                                    <span>
                                        {value.text}
                                    </span>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
};