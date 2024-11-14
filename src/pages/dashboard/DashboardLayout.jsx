import {useEffect, useState} from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import {Outlet} from "react-router-dom";

function DashboardLayout() {
    const [isOpen, setIsOpen] = useState(true);

    const handleResize = () => {

        if (window.innerWidth >= 1024) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.addEventListener('resize', handleResize)
        }
    });

    return (
        <div className="w-full flex">
            <Sidebar
                isOpen={isOpen}
                onToggle={handleToggle}/>
            <main
                className={`${isOpen && "pl-[21rem]"} w-full px-8 min-h-dvh ease-in-out duration-300 relative`}>
                <Header onToggle={handleToggle}/>
                {/*  Page  */}
                {/* Dibawah ini sudah menjadi representasi dari children dari Router parent dashboard */}
                <Outlet/>
            </main>
        </div>
    )
}

export default DashboardLayout;