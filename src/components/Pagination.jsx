 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { listPosts } from '../actions/postsActions';
import useStyles from './Styles';

export const Paginatetion = ({ page }) => {
  const { numOfPages } = useSelector((state) => state.postsLists);
  const dispatch = useDispatch();

  

  const classes = useStyles();

  
  useEffect(() => {
    if (page) {
      dispatch(listPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

 