'use client'
import {
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Badge } from 'antd';
import Image from "next/image";
import { useCartStore } from "@/store/cartStore"

interface PopOverProps {
    loading?: boolean;
    openHover?: boolean;
    closeHover?: any;
    dataList?: any[];
    searchAnime?: (id: string, name: string) => void;
}

const Header: React.FC<PopOverProps> = ({ openHover, closeHover, loading, dataList, searchAnime }) => {
    const totalItems = useCartStore((state) => state.totalItems);
    return (
        <div className="lg:h-[70%] h-[40%]">
            <div className="grid justify-end w-full h-full relative">
                <Image
                    src="/images/bg_coffee.jpg"
                    alt="Coffee Background"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
                <div className='flex flex-row z-20 justify-center align-middle justify-items-center p-4 h-20 font-serif'>
                    <div className='mt-1 text-black mx-2 cursor-pointer text-2xl'>
                        Home
                    </div>
                    <div className='mt-1 text-black mx-2 cursor-pointer text-2xl'>
                        Menu
                    </div>
                    <div className='mt-1 text-black mx-2 cursor-pointer text-2xl'>
                        Deals
                    </div>
                    <div className='mt-1 text-black mx-2 cursor-pointer text-2xl'>
                        Favourite
                    </div>
                    <Badge count={totalItems}>
                        <div className="text-2xl lg:text-3xl text-black font-bold cursor-pointer">
                            <ShoppingCartOutlined />
                        </div>
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header