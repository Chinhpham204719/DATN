import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import navTopConfigs from '../../../configs/navTopConfigs';
import NavUser from './NavUser';
import './style.css';

const ItemContainer = styled.div`
  ${`height:78px; padding-top:16px;font-size: 30px`}
`
const LinkItem = styled.span((props) => [
    tw`cursor-pointer font-medium hover:(text-blue-400 text-lg) text-base justify-around `,
    props.isActive && tw`text-blue-400 font-bold`
])
const Dropdown = styled(motion.div)(() => [
    tw`h-auto w-48 border-t-default border-blue-400 shadow-md bg-gray-100 mt-4 absolute flex flex-col `,
])
const DropdownItem = tw.div`w-full p-2 cursor-pointer my-1 text-lg text-black border-b-default transform transition-all duration-75 hover:bg-gray-200`
const HeaderContainer = tw.div`h-20 w-full shadow-md fixed top-0 animate-bounce z-40 flex justify-between`
const BorderContainer = tw.div`w-full flex xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mx-auto`
const LogoHeader = tw.img`cursor-pointer ml-auto sm:ml-0 h-full`
const NavBar = tw.div`text-left gap-10 ml-5 mr-10 text-xl hidden md:flex transition-all duration-300 lg:w-1/2 lg:translate-x-0 -translate-x-12 opacity-0 lg:opacity-100 w-1/3  `
const RightContainer = tw.div`self-center m-2`


const RenderNavItems = () => {
    const params = useLocation();
    const pathName = params.pathname
    const [isOpen, setIsOpen] = useState(false)
    const [isIndex, setisIndex] = useState(0)
    const handleMouseMove = useCallback((index, isOpen) => {
        setisIndex(index)
        setIsOpen(isOpen)
    }, [])
    const history = useNavigate();
    return (navTopConfigs.map((x, index) => {
            const isActive = !!x.item.find(x => pathName.indexOf(x.navLink) >= 0)
            return (
                <ItemContainer className="group" onMouseMove={() => handleMouseMove(index, true)} onMouseLeave={() => handleMouseMove(index, false)} key={index}>
                    <LinkItem isActive={isActive || !pathName.indexOf(x.navLink)} onClick={() => x.item.length === 0 && history(x.navLink)}  >{x.id}</LinkItem>
                    {Array.isArray(x.item) && x.item.length > 0 &&
                        <Dropdown
                            className="bg-memu-bar"
                            variants={{
                                current: {
                                    opacity: 1,
                                    y: 2,
                                    display: "",
                                },
                                hidden: {
                                    opacity: 0,
                                    y: 30,
                                    display: "none",
                                },
                            }}
                            transition={{ duration: 0.2 }}
                            initial={'hidden'}
                            animate={(isOpen && isIndex === index) ? 'current' : 'hidden'}
                        >
                            {(x.item || []).map(({ id, navLink }) =>
                                <DropdownItem

                                    onClick={() => navLink && history.navigate(navLink)}
                                    key={id}>
                                    {id}
                                </DropdownItem>)}
                        </Dropdown>
                    }
                </ItemContainer>
            )
        })
    )
}
const NavTop = ({ OpenClick }) => {
    const history = useNavigate();
    const Open = () => {
        OpenClick && OpenClick()
    }
    return (
        <HeaderContainer className="bg-memu-bar">
            <BorderContainer>
                <LogoHeader src="hot-weather-logo.png" alt="Logo" onClick={() => history('/')} />
                <NavBar>
                    <RenderNavItems />
                </NavBar>
                <NavUser />
            </BorderContainer>
            <RightContainer>
            </RightContainer>
            {}
        </HeaderContainer>
    )
}
export default NavTop
