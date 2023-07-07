import React from 'react';
import "./home.css";
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import labguruImage from '../../assets/images/welcome_to_labguru.png';

const useStyles = makeStyles(() => ({
  home: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin : "100px"
  },
  image: {
    width: '37%',
    height: '50%',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className='home'>
    <Box className={classes.home}>
      <img src={labguruImage} alt='labguru' className={classes.image} />
    </Box>
    </div>
  );
};

export default Home;
