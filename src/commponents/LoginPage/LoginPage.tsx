import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, Card, Col, Container, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import api, { ApiResponse, saveToken, saveRefreshToken } from "../../api/api";

interface UserLoginPageState{
    email: string;
    password: string;
    errorMessage: string;
    isLogin:boolean;
}

export default class LoginPage extends React.Component{
    state: UserLoginPageState;

    constructor(props: {} | Readonly<{}>){
        super(props);

        this.state = {
            email : "",
            password: "",
            errorMessage: "",
            isLogin: false
        }
    }

    private  formInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const newState = Object.assign(this.state, {
            [event.target.id] : event.target.value
        });

        this.setState(newState);
    }

    private setErrorMessage(message: string){
        const newState = Object.assign(this.state, {
            errorMessage: message
        });

        this.setState(newState);
    }

    private setLoginState(login: boolean){
        const newState = Object.assign(this.state, {
            isLogin: login,
        });

        this.setState(newState);
    }

    private doLogin(){
        api("auth/user/login", "post", { email: this.state.email, password: this.state.password})
            .then((res: ApiResponse) => {
                if(res.status === "error"){
                    console.log("Error: " + res.data);
                    return;
                }

                if(res.status === "ok"){      
                    if(res.data.stautsCode === "login"){
                        let message = "";
                        switch(res.data.stautsCode){
                            case -3001: message = "Bad email"; break;
                            case -3003: message = "Bad password"; break;
                        }
                        console.log(message);
                        this.setErrorMessage(message);
                        return;
                    }

                    saveToken(res.data.token);
                    saveRefreshToken(res.data.refreshToken);
                    this.setLoginState(true);
                }

               
            })
    }
    render(){
        if(this.state.isLogin === true){
            return (
                <Redirect to="/" /> 
            )
        }
        return (
            <Container>
                <Col md={{ span: 6, offset: 3 }} >
                <Card>
                    <Card.Body>
                        <Card.Title>
                        <FontAwesomeIcon icon={faSignIn} /> Login
                        </Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control type="email" id="email" value={ this.state.email } onChange={ event => this.formInputChange(event as any)}/> 
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <Form.Control type="password" id="password"  value={ this.state.password} onChange={ event => this.formInputChange(event as any)}/> 
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" onClick={ () => this.doLogin()}>Login</Button>
                                </Form.Group>
                            </Form>
                            <Alert variant="danger" className={ this.state.errorMessage ? "" : "d-none" }>
                                    { this.state.errorMessage }
                            </Alert>
                    </Card.Body>
                </Card>
               </Col> 
            </Container>
        );
    }
}
//13:28