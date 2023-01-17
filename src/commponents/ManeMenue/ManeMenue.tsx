import  React from "react";
import { Nav, Container } from "react-bootstrap";

export class MainMenuItem{
    text: string = "";
    link: string = "#";

    constructor(text: string, link: string){
        this.text = text;
        this.link = link;
    }
}

interface MeinMenuProperties{
    items: MainMenuItem[];
}

export class ManeMenue extends React.Component<MeinMenuProperties>{
    render(){
        return(
            <Container>
                 <Nav variant="tabs">
                    { this.props.items.map(this.makeMenuItem) }
                </Nav>
            </Container>
           
        );    
    }

    private makeMenuItem(menuItem: MainMenuItem){
        return (
            <Nav.Link href={ menuItem.link}>{ menuItem.text}</Nav.Link>
        );
    }
}