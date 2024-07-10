import create from "zustand";

interface IIdSections {
  pacienteValue: string;
  setPacienteValue: (value: string) => void;
  section1Value: string;
  setSection1Value: (value: string) => void;
  section2Value: string;
  setSection2Value: (value: string) => void;
  section3Value: string;
  setSection3Value: (value: string) => void;
  section4Value: string;
  setSection4Value: (value: string) => void;
  section5Value: string;
  setSection5Value: (value: string) => void;
  section6Value: string;
  setSection6Value: (value: string) => void;
  section7Value: string;
  setSection7Value: (value: string) => void;
}

export const useIsIdsSections = create<IIdSections>((set) => ({
    pacienteValue: "",
    setPacienteValue: (value) => set({ pacienteValue: value }),
    section1Value: "",
    setSection1Value: (value) => set({ section1Value: value }),
    section2Value: "",
    setSection2Value: (value) => set({ section2Value: value }),
    section3Value: "",
    setSection3Value: (value) => set({ section3Value: value }),
    section4Value: "",
    setSection4Value: (value) => set({ section4Value: value }),
    section5Value: "",
    setSection5Value: (value) => set({ section5Value: value }),
    section6Value: "",
    setSection6Value: (value) => set({ section6Value: value }),
    section7Value: "",
    setSection7Value: (value) => set({ section7Value: value }),
  }));
