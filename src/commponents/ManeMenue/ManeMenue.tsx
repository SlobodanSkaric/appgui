import  React from "react";
import { Nav, Container } from "react-bootstrap";
import { HashRouter,Link,Routes,Route } from 'react-router-dom';
import ContactPage from "../ContanctPage/ContactPage";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";

export class MainMenuItem{
    text: string = "";
    link: string = "";

    constructor(text: string, link: string){
        this.text = text;
        this.link = link;
    }
}

interface MeinMenuProperties{
    items: MainMenuItem[];
}
interface MainMenuState{
    items: MainMenuItem[];
}
export class ManeMenue extends React.Component<MeinMenuProperties>{
    state: MainMenuState;
    constructor(props: MeinMenuProperties | Readonly<MeinMenuProperties>){
        super(props);

        this.state = {
            items: props.items,
        }
    }

    setItems(itemss: MainMenuItem[]){
        this.setState({
            items: itemss
        })
    }
    render(){
        return(
            
            <Container>
                 <Nav variant="tabs">
                    <HashRouter>
                        { this.state.items.map(this.makeMenuItem) }

                        <Routes>
                            <Route index  path="/" element={<HomePage/>} />
                            <Route path="/page/contact" element={<ContactPage/>} />
                            <Route path="/user/login" element={<LoginPage/>}/>
                        </Routes>
                    </HashRouter>
                </Nav>
            </Container>
           
        );    
    }

    private makeMenuItem(menuItem: MainMenuItem){
        return (
            <Link to={menuItem.link} className="nav-link">{menuItem.text}</Link> 
           // <Nav.Link href={ menuItem.link}>{ menuItem.text}</Nav.Link>
        );
    }
}

/*<HashRouter >
    <ul>
     <li>
        <Link to={"/"}>Home</Link>
     </li>
     <li>
        <Link to={"/contact"}>Contact</Link>
     </li>
     <li>
        <Link to={"/login"}>Login</Link>
     </li>
   </ul> 
   
</HashRouter> */