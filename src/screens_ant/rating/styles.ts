import { CSSProperties } from "react";

export const SectionRatingStyles = {
  main: {
    backgroundColor: "#FEF7FF",
    width: "60rem",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  } as CSSProperties,

  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflowY: "scroll",
  } as CSSProperties,

  progressContainer: {
    marginTop: "2rem",
  },
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
  inputsContainer: {
    display: "flex",
    paddingTop: "2rem",
    alignItems: "center",
    flexDirection: "column",
    height: "53vh",
  } as CSSProperties,
  inputsRowWithSubTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  inputsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2.78rem",
    gap: "1rem",
  },
  ratingBox: {
    marginBottom: "1rem",
  },
  subtitleBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hugRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.01rem",
  },
  buttonContainer: {
    padding: "4rem",
  },
  buttonBox: {
    marginTop: '2.7rem',
    marginBottom: '1rem',
  }
};