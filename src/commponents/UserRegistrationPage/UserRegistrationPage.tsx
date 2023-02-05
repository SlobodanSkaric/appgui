import { faSignIn, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import  api, { ApiResponse } from "../../api/api"

interface UserRegistratonPageState{
    formData:{
        email: string,
        password: string,
        forname: string,
        surname: string,
        phoneNumber: string,
        postalAddress: string
    }

    message?: string;

    isRegistrationComplite: boolean;
}

export class UserRegistratonPage extends React.Component{
    state: UserRegistratonPageState;

    constructor(props: {} | Readonly<{}>){
        super(props);

        this.state = {
            formData:{
            email: "",
            password: "",
            forname: "",
            surname: "",
            phoneNumber: "",
            postalAddress: "",
           },

          /* message: "", */
           isRegistrationComplite: false
        }
    }
    private  formInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const newFormData = Object.assign(this.state.formData,{
            [event.target.id] : event.target.value
        });

        const newState = Object.assign(this.state, {
            formData: newFormData
        });

        this.setState(newState);
    }
    render() {
        return (
            <Container>
                <Col md={{ span: 8, offset: 2 }} >
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={faUserPlus} />Registration
                            </Card.Title>
                               { (this.state.isRegistrationComplite === false) ? this.renderForm() : this.renderRegistrationCompliteMessage() }
                        </Card.Body>
                    </Card>
                </Col>
            </Container>

        );
        }

        private renderForm(){
            return (
                <>
                <Form>
                            <Row>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="email">Email</Form.Label>
                                        <Form.Control type="email" id="email" value={ this.state.formData.email } onChange={ event => this.formInputChange(event as any)}/> 
                                    </Form.Group>
                                </Col>

                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="password">Password</Form.Label>
                                        <Form.Control type="password" id="password"  value={ this.state.formData.password} onChange={ event => this.formInputChange(event as any)}/> 
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="forname">Forname</Form.Label>
                                        <Form.Control type="text" id="forname" value={ this.state.formData.forname } onChange={ event => this.formInputChange(event as any)}/> 
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="surname">Surname</Form.Label>
                                        <Form.Control type="text" id="surname" value={ this.state.formData.surname } onChange={ event => this.formInputChange(event as any)}/> 
                                    </Form.Group>
                                </Col>
                            </Row>


                                <Form.Group>
                                    <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                                    <Form.Control type="phone" id="phoneNumber" value={ this.state.formData.phoneNumber } onChange={ event => this.formInputChange(event as any)}/> 
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="postalAddress">Postal Address</Form.Label>
                                    <Form.Control as="textarea" rows={4} id="postalAddress" value={ this.state.formData.postalAddress } onChange={ event => this.formInputChange(event as any)}/> 
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" onClick={() => {this.doRegistration()}}>Register</Button>
                                </Form.Group>
                            </Form>
                            <Alert variant="danger" className={ this.state.message ? "" : "d-none" }>
                                    { this.state.message }
                            </Alert>
                </>
            )
        }
    
        private renderRegistrationCompliteMessage(){
            return (
                <p>
                    The acount has be registred <br />
                    <Link to="/user/login">
                        Click here
                    </Link>to the go to Lgon page.
                </p>
            )
        }

        private doRegistration(){
            const data = {
                email: this.state.formData.email,
                password: this.state.formData.password,
                forname: this.state.formData.forname,
                surname: this.state.formData.surname,
                phoneNumber: this.state.formData.phoneNumber,
                postalAddress: this.state.formData.postalAddress
            }

            api("auth/user/register", "post", data)
                .then((res: ApiResponse) => {
                    if(res.status === "error"){
                        this.setErrorMessage("System error...try again");
                        return;
                    }

                    if(res.status === "ok"){
                        if(res.data.stautsCode !== undefined){
                            this.handleErrors(res.data);
                            return;
                        }
                    }

                    this.registrationComplite();
                })
        }

        private setErrorMessage(message: string){
            const newState = Object.assign(this.state, {
                message: message
            });
    
            this.setState(newState);
        }

        private handleErrors(data: any){
            let message = "";

            switch(data.stautsCode){
                case -6000: message = "This account alrady existes"; break;
            }

            this.setErrorMessage(message);
        }

        private registrationComplite(){
            const newState = Object.assign(this.state, {
                isRegistrationComplite: true
            });

            this.setState(newState);
        }
}