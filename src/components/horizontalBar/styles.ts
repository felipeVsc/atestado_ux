import { CSSProperties } from "react";

export const HorizontalBarStyles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginRight: "17px",
  } as CSSProperties,
  text: {
    fontSize: "14px",
    color: "#49454F"
  } as CSSProperties,
  section: {
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    width: "10rem",
    height: "0.688rem",
    textAlign: "center",
    lineHeight: "30px",
    background: "#FFFFFF",
    borderRadius: "5px",
    fontWeight: "bold",
    color: "#1D1B20",
    border: "none",
  } as CSSProperties,
  selectedSection: {
    background: "#6750A4",
    borderRadius: "5px",
  } as CSSProperties,
  completedSection: {
    background: "#B0AFAC",
    borderRadius: "5px",
  } as CSSProperties,
};