import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Container } from "react-bootstrap";

export default class ContactPage extends React.Component{
    render(){
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                        <FontAwesomeIcon icon={faPhone} /> Contact
                        </Card.Title>
                        <Card.Text>
                            Contact...
                        </Card.Text>
                    </Card.Body>
                </Card>
                
            </Container>
        )
    }
}
