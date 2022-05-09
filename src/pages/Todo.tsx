import React, { FC } from 'react';

interface TodoItem {
    name: string;
    checked: boolean;
}
const TODO_LIST: TodoItem[] = [
    { name: '泡の表現', checked: false },
    { name: '反応拡散方程式のコード化', checked: true },
    { name: '反応拡散方程式の最適化', checked: false },
    { name: 'シーンを用いたスクロール芸', checked: false },
];

const TodoPage: FC = () => {
    return (
        <div className='mx-8 my-4'>
            <h2 className=' text-3xl'>看板ボード</h2>
            <div className='flex'>
                <div>
                    <h3 className=' text-2xl'>未着手</h3>
                    <ul>
                        {
                            TODO_LIST.map((val, index) => (
                                <li className="flex my-4" key={index}>
                                    <input type="checkbox" checked={val.checked} className="checkbox checkbox-accent" />
                                    <p className="ml-4">{val.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h3 className=' text-2xl'>着手中</h3>
                    <ul>
                        {
                            TODO_LIST.map((val, index) => (
                                <li className="flex my-4" key={index}>
                                    <input type="checkbox" checked={val.checked} className="checkbox checkbox-accent" />
                                    <p className="ml-4">{val.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <h3 className=' text-2xl'>完成</h3>
                    <ul>
                        {
                            TODO_LIST.map((val, index) => (
                                <li className="flex my-4" key={index}>
                                    <input type="checkbox" checked={val.checked} className="checkbox checkbox-accent" />
                                    <p className="ml-4">{val.name}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TodoPage;
