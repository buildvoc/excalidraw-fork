import { useEffect, useState } from "react";
import { atom } from "jotai";
import DashboardSaveDialog from "./DashboardSaveDialog";
import { appJotaiStore } from "../app-jotai";
import { ErrorDialog } from "../../src/components/ErrorDialog";

export const dashboardSaveDialogShownAtom = atom(false);

export const DashboardSave = () => {

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    appJotaiStore.set(dashboardSaveDialogShownAtom, false);
  };

  return (
    <>
      <DashboardSaveDialog
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
