import tw, { styled } from "twin.macro";
import NavTop from "./components/NavTop/NavTop";
const Children = styled.div`
  ${[`background-color:#F8F8F8;`, tw`pt-16 mb-16`]}
`;

const Layout = ({ children }) => {
    return (
        <>
            <NavTop />
            <Children>
                {children}
            </Children>
        </>
    )

}
export default Layout