import { useState } from "react";
import { atom } from "jotai";
import ProjectDialog from "./ProjectDialog";
import { appJotaiStore } from "../app-jotai";
import { ErrorDialog } from "../../src/components/ErrorDialog";

export const projectDialogShownAtom = atom(false);

export const Project = () => {

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    appJotaiStore.set(projectDialogShownAtom, false);
  };

  return (
    <>
      <ProjectDialog
        handleClose={handleClose}
        setErrorMessage={setErrorMessage}
      />
      
      {errorMessage && (
        <ErrorDialog onClose={() => setErrorMessage("")}>
          {errorMessage}
        </ErrorDialog>
      )}
    </>
  )
}
