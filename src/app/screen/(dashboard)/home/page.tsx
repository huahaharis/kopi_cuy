'use client'
import { useState } from "react"
import MenuDivider from "@/app/screen/(dashboard)/home/menuDivider"
import { motion, AnimatePresence } from 'framer-motion'
import { DetailMenuProps, ShowType } from "@/type/menuType"
import Menu from "@/app/screen/(dashboard)/home/menu"
import { CoffeeOutlined, HomeOutlined, PercentageOutlined } from "@ant-design/icons"
import HorizontalMenuSlider from "@/component/slider/sliderMenu"



function Home() {
    const [detailMenu, setDetailMenu] = useState<DetailMenuProps>({
        title: "Ice Coffee Americano",
        review: 3.8,
        price: 18000,
        description: `Americano Special Beans make a smooth and rich coffee with a bold flavor
                    The beans are carefully picked from high places where they grow slowly and develop great taste.
                    Roasted to bring out chocolate and light caramel notes,
                    these beans are perfect for making a strong but balanced Americano.
                    Whether you drink it plain or with a little milk, it always gives a clean,
                    tasty coffee that feels fresh and satisfying.`,
        image: "/images/ice_americano.png"

    });
    const [show, setShow] = useState<ShowType>({
        coffee: true,
        tea: false,
        juices: false,
        soda: false,
    });
    let ListMenu = [
        "coffee",
        "tea",
        "juices",
        "soda",
    ]


    const handleMenu = (type: keyof ShowType) => {
        console.log(type);

        if (type == "coffee") {
            setDetailMenu({
                title: "Ice Coffee Americano",
                review: 3.8,
                price: 18000,
                description: `Americano Special Beans make a smooth and rich coffee with a bold flavor
                    The beans are carefully picked from high places where they grow slowly and develop great taste.
                    Roasted to bring out chocolate and light caramel notes,
                    these beans are perfect for making a strong but balanced Americano.
                    Whether you drink it plain or with a little milk, it always gives a clean,
                    tasty coffee that feels fresh and satisfying.`,
                image: "/images/ice_americano.png"
            })
        } else if (type == "tea") {
            setDetailMenu({
                title: "Ice Tea Jumbo",
                review: 4.5,
                price: 15000,
                description: `Refreshing iced tea made from quality tea leaves, served cold with a light, smooth taste. 
                Perfect for cooling down on a warm day, with just the right balance of flavor and sweetness.`,
                image: "/images/ice_tea.png"
            })
        } else if (type == "juices") {
            console.log("sini");

            setDetailMenu({
                title: "Orange Juice",
                review: 4,
                price: 25000,
                description: `Refreshing iced tea made from quality tea leaves, served cold with a light, smooth taste. 
                            Perfect for cooling down on a warm day, with just the right balance of flavor and sweetness.`,
                image: "/images/juice_orange.png"
            })
        }
        setShow((prev) => {
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key as keyof ShowType] = false;
                return acc;
            }, {} as ShowType);
            return {
                ...newState,
                [type]: true,
            };
        });
    }

    const activeMenu = Object.keys(show).find((key) => show[key as keyof typeof show]) as keyof typeof show | "";


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <MenuDivider menus={ListMenu} selectMenu={handleMenu} activeMenu={activeMenu} />
            {/* menu on mid */}
            <AnimatePresence>
                {show.coffee && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="p-4 text-white rounded"
                    >
                        <Menu detail={detailMenu} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {show.tea && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="p-4 text-white rounded"
                    >
                        <Menu detail={detailMenu} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {show.juices && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="p-4 text-white rounded"
                    >
                        <Menu detail={detailMenu} />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {show.soda && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="p-4 text-white rounded"
                    >
                        <Menu detail={detailMenu} />
                    </motion.div>
                )}
            </AnimatePresence>
            {/* method of bind */}
            <div className="bg-[#efe0d2] h-[65vh] p-6 font-serif text-black">
                <div className="flex flex-row justify-between px-10 pt-10">
                    <div className="font-bold text-3xl w-2xs h-40">
                        The Best taste From The Process
                    </div>
                    <div className="w-lg h-40">
                        Coffee goes from cherry on a tree to cup in three steps; pick & process the fruit, roast the beans for the favor, and brew the grounds for that perfect cup
                    </div>
                </div>
                <div className="flex flex-row justify-evenly">
                    <div className="flex w-2xl h-40 justify-center items-center">
                        <div className="bg-[#62230e] text-amber-50 h-40 w-65 rounded-xl flex flex-col items-center justify-center">
                            <PercentageOutlined style={{ fontSize: 52 }} />
                            <div className="text-md mt-2">
                                Hand Roasted
                            </div>
                        </div>
                    </div>
                    <div className="flex w-2xl h-40 justify-center items-center">
                        <div className="bg-[#eba77b] h-40 w-65 rounded-xl flex flex-col items-center justify-center">
                            <CoffeeOutlined style={{ fontSize: 52 }} />
                            <div className="text-md mt-2">
                                Direct Trade
                            </div>
                        </div>
                    </div>
                    <div className="flex w-2xl h-40 justify-center items-center">
                        <div className="bg-[#62230e] text-amber-50 h-40 w-65 rounded-xl flex flex-col items-center justify-center">
                            <HomeOutlined style={{ fontSize: 52 }} />
                            <div className="text-md mt-2">
                                Organic Taste
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* popular */}
            <div className="min-h-screen">
                <HorizontalMenuSlider listData={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
            </div>
            <div className="bg-red-300 h-screen">
                GET NEW UPDATE AND DISCOUNT
            </div>
        </div>
    )
}

export default Home