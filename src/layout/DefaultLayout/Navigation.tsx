import { Link } from "@tanstack/react-location";
import clsx from "clsx";
import { MouseEventHandler, useCallback, useState } from "react";
import { BaseIcon } from "../../components/common/BaseIcon";
import { TITLE } from "../../constants/page";
import { getUrl } from "../../utils/site";

export const DefaultNavigation = ({ children }: { children: JSX.Element }): JSX.Element => {
    const defaultState = false;
    const [isOpen, setIsOpen] = useState(defaultState);

    const toggle: MouseEventHandler<HTMLInputElement> = useCallback((e) => {
        setIsOpen(e.currentTarget.checked);
    }, []);

    const isOpenClass = clsx({
        'opacity-0 invisible': !isOpen,
    }, "absolute w-full h-96 overflow-y-scroll opacity-100 transition visible");

    return (
        <>
            <nav className="sp-only w-full z-10 sticky top-0 left-0 bg-base-100 drop-shadow-md">
                <div className="navbar">
                    <label className="btn swap swap-rotate btn-ghost btn-square">
                        <input type="checkbox" onClick={toggle} defaultChecked={defaultState} />
                        <BaseIcon className="swap-off fill-current" name="HAMBURGER" />
                        <BaseIcon className="swap-on fill-current" name="CLOSE" />
                    </label>
                    <Link className="btn btn-ghost normal-case text-xl" to={getUrl('/')}>{TITLE}</Link>
                </div>

                <div className={isOpenClass}>
                    {children}
                </div>
            </nav>

            <nav className='pc-only w-80 flex-none z-10 sticky left-0 top-0 bg-base-100'>
                <div className='flex top-0 items-center px-4 py-2 sticky'>
                    <p className='text-2xl'>
                        <Link to={getUrl('/')}>
                            {TITLE}
                        </Link>
                    </p>
                    <p className='text-xs ml-4'>v1.0.0</p>
                </div>
                {children}
                </nav>
        </>
    )
};
