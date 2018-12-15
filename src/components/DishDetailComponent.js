import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (length) => (value) => !(value) || (value.length <= length);
const minLength = (length) => (value) => (value) && (value.length >= length);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  handleComment(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value + " Remember: " + this.remember.checked);
  }
  
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return(
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"> Submit Comment</span>
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={10}>
                  <Control.select model=".rating" id="rating" name="rating" className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" md={2}>Your Name</Label>
                <Col md={10}>
                  <Control.text model=".name" id="name" name="name" placeholder="Your Name" 
                  className="form-control" 
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15)
                  }}/>
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={2}>Comment</Label>
                <Col md={10}>
                <Control.textarea model=".message" id="message" name="message" rows="6" className="form-control">
                </Control.textarea>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size:10, offset:2}}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({dish}) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle heading>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({comments}) {
  if (comments != null) {
    const commentList = comments.map(com => {
      return (
        <li>
          <p> {com.comment} </p>
          <p>-- {com.author}, {new Intl.DateTimeFormat('en-US', 
            { year: 'numeric', month: 'short', day: '2-digit'})
            .format(new Date(Date.parse(com.date)))}</p>
        </li>
      );
    });

    return (
      <div className="text-left">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {commentList}
        </ul>
        <div>
          <CommentForm />
        </div>
      </div>
    );
  }
  else {
    return (
      <div>empty</div>
    );
  }
}

const DishDetail = (props) => {

  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to ='/home'>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to ='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div></div>
    );
  }
}


export default DishDetail;