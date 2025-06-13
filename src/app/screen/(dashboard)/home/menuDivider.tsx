'use client'
import React from "react"
import { ShowType } from "@/type/menuType"
import { AnimatePresence, motion } from "framer-motion"

interface MenuDividerProps {
    menus: any[]
    activeMenu: string
    selectMenu: (title: any) => void
}

const MenuDivider: React.FC<MenuDividerProps> = ({ menus, selectMenu, activeMenu }) => {
    return (
        <div className="flex flex-row font-serif text-black text-4xl justify-center mt-8">
            {menus.map((res: string, index: number) => (
                <React.Fragment key={index}>
                    <div
                        onClick={() => selectMenu(res as keyof ShowType)}
                        className="relative mr-6 ml-6 cursor-pointer capitalize flex items-center justify-center"
                    >
                        <AnimatePresence>
                            {res === activeMenu && (
                                <motion.img
                                    src="/images/unsplash.png"
                                    alt="splash"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none z-0"
                                />
                            )}
                        </AnimatePresence>
                        <span className={`transition-all duration-300 ${res === activeMenu ? 'font-bold text-black z-10' : 'text-gray-500 hover:text-black z-10'}`}>
                            {res}
                        </span>
                    </div>
                    {index != menus.length - 1 && ("|")}
                </React.Fragment>
            ))}
        </div>
    )
}

export default MenuDivider