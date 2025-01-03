import { useMemo } from "react";
// import { AI_TITLE } from "components/system/Taskbar/AI/constants";
import { useMenu } from "contexts/menu";
import {
  type ContextMenuCapture,
  type MenuItem,
} from "contexts/menu/useMenuContextState";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import { useViewport } from "contexts/viewport";
import { useProcessesRef } from "hooks/useProcessesRef";
// import { MENU_SEPERATOR } from "utils/constants";
import { toggleShowDesktop } from "utils/functions";
// import { useWebGPUCheck } from "hooks/useWebGPUCheck";
// import { useWindowAI } from "hooks/useWindowAI";

const useTaskbarContextMenu = (onStartButton = false): ContextMenuCapture => {
  const { contextMenu } = useMenu();
  const { minimize, open } = useProcesses();
  const { stackOrder } = useSession();
  const processesRef = useProcessesRef();
  const { fullscreenElement, toggleFullscreen } = useViewport();
  // const hasWebGPU = useWebGPUCheck();
  // const hasWindowAI = useWindowAI();

  return useMemo(
    () =>
      contextMenu?.(() => {
        const processArray = Object.entries(processesRef.current);
        const allWindowsMinimized =
          processArray.length > 0 &&
          !processArray.some(([, { minimized }]) => !minimized);
        const toggleLabel = allWindowsMinimized
          ? "Show open windows"
          : "Show the desktop";
        const menuItems: MenuItem[] = [
          {
            action: () =>
              toggleShowDesktop(processesRef.current, stackOrder, minimize),
            icon: "https://cdn-icons-png.flaticon.com/128/7698/7698943.png",
            label: onStartButton ? "Desktop" : toggleLabel,
          },
        ];

        if (onStartButton) {
          menuItems.unshift(
            {
              action: () => open("Terminal"),
              icon: "https://cdn-icons-png.flaticon.com/128/11230/11230706.png",
              label: "Terminal",
            },
            // MENU_SEPERATOR,
            {
              action: () => open("FileExplorer"),
              icon: "https://cdn-icons-png.flaticon.com/128/8461/8461227.png",
              label: "File Explorer",
            }
            // {
            //   action: () => open("Run"),
            //   icon: "https://cdn-icons-png.flaticon.com/128/10282/10282539.png",
            //   label: "Run",
            // },
            // MENU_SEPERATOR
          );
        } else {
          menuItems.unshift(
            {
              action: () => toggleFullscreen(),
              icon: "https://cdn-icons-png.flaticon.com/128/7888/7888863.png",
              label:
                fullscreenElement === document.documentElement
                  ? "Exit full screen"
                  : "Enter full screen",
            }
            // MENU_SEPERATOR,
            // ...(hasWebGPU && !hasWindowAI
            //   ? [
            //       {
            //         // action: () => setAiEnabled(!aiEnabled),
            //         // checked: aiEnabled,
            //         label: `Show ${AI_TITLE} button`,
            //       },
            //       MENU_SEPERATOR,
            //     ]
            //   : [])
          );
        }

        return menuItems;
      }),
    [
      // aiEnabled,
      contextMenu,
      fullscreenElement,
      // hasWebGPU,
      // hasWindowAI,
      minimize,
      onStartButton,
      open,
      processesRef,
      // setAiEnabled,
      stackOrder,
      toggleFullscreen,
    ]
  );
};

export default useTaskbarContextMenu;
