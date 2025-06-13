import { useState } from "react";
import { useCartStore } from "@/store/cartStore"
import formatCurrency from "@/lib/formatCurrency"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Rate } from "antd"
import { DetailMenuProps } from "@/type/menuType"


const Menu = ({ detail }: { detail: DetailMenuProps }) => {
    const [items, setItems] = useState<number>(1);
    const addToCart = useCartStore((state) => state.addToCart);
    const handleIncrement = (type: string) => {
        if (type == "+") {
            setItems(items + 1)
        } else {
            if (items > 1) {
                setItems(items - 1)
            }
        }
    }
    return (
        <div className="flex flex-row justify-evenly mt-4">
            <div className="pl-36 w-[50%]">
                <img
                    src={detail.image}
                    className="h-lg w-lg p-4"
                />
            </div>
            <div className="text-black font-serif p-4 pt-5 w-[50%]">
                <p className="text-4xl font-bold mb-4">{detail.title}</p>
                <div className="flex flex-row justify-between"><Rate allowHalf defaultValue={detail.review} /> <div>{formatCurrency({ amount: detail.price })}</div></div>
                <div className="text-justify mt-4">
                   {detail.description}
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row mt-10 w-[25%] pl-4" onMouseDown={(e) => e.preventDefault()}>
                        <div
                            className="w-[30%] cursor-pointer bg-stone-800 hover:bg-stone-900 text-white px-3 py-1 rounded "
                            onClick={() => handleIncrement("-")}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <MinusOutlined />
                        </div>
                        <input
                            onMouseDown={(e) => e.preventDefault()}
                            type="text"
                            value={items}
                            readOnly
                            className="flex w-[30%] justify-center text-center text-lg font-semibold bg-white border border-gray-300 rounded select-none"
                        />
                        <div
                            className="w-[30%] cursor-pointer bg-stone-800 hover:bg-stone-900 text-white px-3 py-1 rounded"
                            onClick={() => handleIncrement("+")}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <PlusOutlined />
                        </div>
                    </div>
                    <div
                        className="flex justify-center justify-items-center mt-10 pt-1 w-[25%] bg-stone-800 hover:bg-stone-900 text-white rounded cursor-pointer"
                        onClick={() => [addToCart(items), window.scrollTo({ top: 0, behavior: 'smooth' })]}
                    >
                        ADD TO CART
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu