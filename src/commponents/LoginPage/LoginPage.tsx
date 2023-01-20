import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Container } from "react-bootstrap";

export default class LoginPage extends React.Component{
    render(){
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                        <FontAwesomeIcon icon={faSignIn} /> Login
                        </Card.Title>
                        <Card.Text>
                            Login Form
                        </Card.Text>
                    </Card.Body>
                </Card>
                
            </Container>
        );
    }
}