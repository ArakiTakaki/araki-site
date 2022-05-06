import React, { FC } from 'react';
import { Link } from '@tanstack/react-location';
import { getUrl } from '../../utils/site';
import clsx from 'clsx';
import { NAVIGATION } from './constants';
import { BaseIcon } from './BaseIcon';

export const Navigation: FC<{ className?: string }> = ({ className }) => {
    return (
        <nav>
            <div className={clsx('flex top-0 bg-white z-10 items-center', className)}>
                <p className='text-3xl'>
                    <Link to={getUrl('/')}>
                        SAIHATE
                    </Link>
                </p>
                <p className='text-xs ml-4'>v1.0.0</p>
            </div>

            <ul className='menu p-4'>
                {
                    NAVIGATION.map((value, index) => {
                        if (value.name === 'divider') return (<li key={index} />);
                        if (value.name === 'header') return (
                            <li className="menu-title" key={index}>
                                <span>{value.text}</span>
                            </li>
                        );
                        return (
                            <li>
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