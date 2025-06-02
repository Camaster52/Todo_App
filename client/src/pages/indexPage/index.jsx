import CursorHighlight from "../../components/layout/CursorHighlight"
import Header from "../../components/layout/index/header"
import Main from "../../components/layout/index/main"
import Footer from "../../components/layout/index/footer"

const Index = ({ setIsLoggedIn }) => {
    return(
        <>
            <CursorHighlight/>
            <Header setIsLoggedIn={setIsLoggedIn}/>
            <Main/>
            <Footer/>
        </>
    )
}
export default Index