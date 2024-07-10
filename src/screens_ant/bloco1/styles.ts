import { CSSProperties } from "react";

export const Section4Styles = {
  
    main: {
      backgroundColor: '#ECE6F0',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '150rem',
      height: '100%',
    } as CSSProperties,
    progressContainer: {
      marginTop: '2rem'
    } ,
    titleContainer: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      marginTop: "3rem",
      borderBottom: "1px solid #444",
      paddingBottom: "0.5rem", 
    },
    titleText: {
      padding: "0px 4rem",
      color: "black",
      fontSize: "1.25rem",
      margin: 0,
    },
    selectsContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '2rem',
    }as CSSProperties,
    inputsRow1:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2rem'
    },
    inputsRow2:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '4rem',
    }as CSSProperties,
    titleRow2:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '12rem'
    },
    inputsRow3:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '6rem'
    },
    inputsRow4:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1rem'
    },
    buttonContainer: {
      padding: '4rem'
    }
  };