import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card, Container } from 'react-bootstrap';
import CategoryType from '../../types/CategiryType';

interface CategoryPageProperties{
      match:{
        params:{
            id:number
        }
      }
}

interface CategoryPageState{
    category?: CategoryType;
}

export default class CategoryPage extends React.Component<CategoryPageProperties>{
    state: CategoryPageState;
    constructor(props: CategoryPageProperties | Readonly<CategoryPageProperties>){
        super(props);

        this.state = {}
    }

    render(){
        return(
            <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faListAlt} /> { this.state.category?.name}
                    </Card.Title>
                    <Card.Text>
                           This is semple page ... { this.state.category?.cateoryId }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
        )
    }

    componentDidMount(): void {
        this.getCategoryData();
    }


    componentDidUpdate(prevProps: Readonly<CategoryPageProperties>): void {
        if(prevProps.match.params.id === this.props.match.params.id){
            return;
        }
        this.getCategoryData();
    }

    private getCategoryData(){
        setTimeout(() => {
            const data: CategoryType = {
                name : "Category " + this.props.match.params.id,
                cateoryId: this.props.match.params.id,
                items: []
            }

            this.setState({
                category: data
            })
        }, 1000);
    }
}