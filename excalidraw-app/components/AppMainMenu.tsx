import React from "react";
import { MainMenu } from "../../src/packages/excalidraw/index";
import { LanguageList } from "./LanguageList";
import { useAuth } from "../pages/AuthContext";
import { ExportIcon, loginIcon, PlusIcon, save } from "../../src/components/icons";

export const AppMainMenu: React.FC<{
  setCollabDialogShown: (toggle: boolean) => any;
  setDashboardSaveDialogShown: (toggle: boolean) => any;
  setProjectDialogShown: (toggle: boolean) => any;
  isCollaborating: boolean;
  isCollabEnabled: boolean;
}> = React.memo((props) => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveToActiveFile />
      {isAuthenticated && (
        <>
        <MainMenu.Item
          onSelect={() => props.setDashboardSaveDialogShown(true)}
          icon={ExportIcon}
        >
          Save to project
        </MainMenu.Item>
        </>
      )}
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.SaveAsImage />
      {props.isCollabEnabled && (
        <MainMenu.DefaultItems.LiveCollaborationTrigger
          isCollaborating={props.isCollaborating}
          onSelect={() => props.setCollabDialogShown(true)}
        />
      )}

      <MainMenu.DefaultItems.Help />
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.Separator />
      {/* <MainMenu.ItemLink
        icon={PlusPromoIcon}
        href={`${
          import.meta.env.VITE_APP_PLUS_LP
        }/plus?utm_source=excalidraw&utm_medium=app&utm_content=hamburger`}
        className="ExcalidrawPlus"
      >
        Excalidraw+
      </MainMenu.ItemLink>
      <MainMenu.DefaultItems.Socials /> */}
      {isAuthenticated && (
        <>
        <MainMenu.Item
          onSelect={() => props.setProjectDialogShown(true)}
          icon={PlusIcon}
        >
          Add new project
        </MainMenu.Item>
        <MainMenu.Item
          onSelect={() => {}}
          icon={loginIcon}
          onClick={logout}
        >
          Logout
        </MainMenu.Item>
        </>
      )}
      <MainMenu.Separator />
      <MainMenu.DefaultItems.ToggleTheme />
      <MainMenu.ItemCustom>
        <LanguageList style={{ width: "100%" }} />
      </MainMenu.ItemCustom>
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
});
