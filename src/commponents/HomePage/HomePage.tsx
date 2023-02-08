import React from 'react';
import './App.css';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { faHome, faListAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CategoryType from '../../types/CategiryType';
import {  Link, Redirect } from 'react-router-dom';
import api, { ApiResponse } from "../../api/api";

interface HomePageState{
  isUserLogin: boolean;
  categories: CategoryType[];
}

interface ApiCategoryDto {
  categoryId: number;
  name: string;
}


class HomePage extends React.Component{
  state: HomePageState;
  constructor(props: {} | Readonly<{}>){
    super(props);

    this.state = {
      isUserLogin: true,
      categories: []
    }
  }

  private getCategories(){
    api("api/category", "get", {})
       .then((res: ApiResponse) => {
        console.log(res);
          if(res.status === "error" || res.status === "login"){
            this.setLoginState(false);
            return;
          }

          this.putCategoriesInState(res.data);

       })
  }


  private putCategoriesInState(data: ApiCategoryDto[]){
    const categoriesList: CategoryType[] = data.map(category => {
      return {
        cateoryId: category.categoryId,
        name: category.name,
        items: []
      }
    });

    const newState = Object.assign(this.state, {
      categories: categoriesList
    });

    this.setState(newState);
  }

  private setLoginState(isLoggedIn: boolean){
    const newState = Object.assign(this.state, {
      isUserLogin: isLoggedIn
    });

    this.setState(newState);
  }

  componentDidMount(): void {
    this.getCategories();
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    this.getCategories();
  }

 
  render(){
    if(this.state.isUserLogin === false){
      return(
        <Redirect to="/user/login" />
      );
    }
      return (
        <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                        <FontAwesomeIcon icon={ faListAlt } /> Category
                        </Card.Title>
                          <Row>
                            { this.state.categories.map(this.singleCategory)}
                          </Row>
                    </Card.Body>
                </Card>
                
            </Container>
      );
  }

  

  private singleCategory(category: CategoryType){
    return(
      <Col lg="3" md="4" sm="6" xs="12">
        <Card className='mb-3'>
          <Card.Body>
            <Card.Title as="p">{ category.name }</Card.Title>
            <Link to={`/category/${ category.cateoryId }`} className="btn btn-primary btn-block btn-sm">Open Category</Link>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

export default HomePage;
