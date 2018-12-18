import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';
import { database } from '../firebase/firebase';


/*****************
*     Feedback   *
******************/

export const postFeedback = (feedback) => (dispatch) => {

  feedback.date = new Date().toISOString();

  return database.ref('/feedback').push().set(feedback) 
  .then(() => {
    console.log("Feedback successfully posted");
    alert('Your feedback has been posted');
  })
  .catch(error => { 
    console.log("Error: feedback couldn't be posted");
    alert('Your feedback could not be posted\nError: ');
  });
};

/*****************
*     Comments   *
******************/

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };

  newComment.date = new Date().toISOString();

  return database.ref('/comments').push()
  .then(ref => {
    newComment.id = ref.key;

    return ref.set(newComment)
    .then(() => ref.once("value"))
    .then((comment) => dispatch(addComment(comment.val())))
    .catch(error => { 
      console.log('Post comments ',error.message);
      alert('Your comment could not be posted\nError: ' + error.message);
    });
  });
};

export const fetchComments = () => (dispatch) => {
  return database.ref('/comments').once('value')
    .then(comments => dispatch(addComments(comments.val())))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

/******************
*     Dishes      *
******************/

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return database.ref('/dishes').once('value')
    .then(dishes => dispatch(addDishes(dishes.val())))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

/******************
*    Promotions   *
******************/
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return database.ref('/promotions').once('value')
    .then(promotions => dispatch(addPromos(promotions.val())))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
});

/******************
*    Leaders      *
******************/
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));

  return database.ref('/leaders').once('value')
    .then(leaders => dispatch(addLeaders(leaders.val())))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});