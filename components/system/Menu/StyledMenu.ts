import { m as motion } from "motion/react";
import styled from "styled-components";

type StyledMenuProps = {
  $isSubMenu: boolean;
  $x: number;
  $y: number;
};

const StyledMenu = styled(motion.nav).attrs<StyledMenuProps>(({ $x, $y }) => ({
  style: {
    transform: `translate(${$x}px, ${$y}px)`,
  },
}))<StyledMenuProps>`
  background-color: rgb(50, 50, 50);
  border: 1px solid rgba(255, 255, 255, 10%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 20%);
  color: rgb(220, 220, 220);
  contain: layout;
  font-size: 13px;
  max-height: fit-content;
  max-width: fit-content;
  padding: 6px 4px;
  pointer-events: none;
  position: fixed;
  width: max-content;
  z-index: ${({ $isSubMenu }) => ($isSubMenu ? 1 : 10)};

  ol {
    pointer-events: all;

    li.disabled {
      color: rgb(130, 130, 130);
      pointer-events: none;
    }

    hr {
      background-color: rgba(255, 255, 255, 10%); /* Thin separator line */
      height: 1px;
      margin: 6px 8px;
    }

    li > div {
      border-radius: 4px;
      display: flex;
      padding: 4px 6px;

      &:hover,
      &.active {
        background-color: #3886d9;
        color: #fff;
      }

      figcaption {
        display: flex;
        height: 18px;
        line-height: 18px;
        margin-left: 24px;
        margin-right: 48px;
        place-items: center;
        position: relative;
        top: 0;
        white-space: nowrap;
        width: max-content;

        &.primary {
          font-weight: bold;
        }
      }

      picture {
        margin: 0 4px;
      }

      span {
        margin: 0 4px;
      }

      svg {
        fill: #fff;
        height: 14px;
        position: absolute;
        width: 14px;

        &.left {
          left: 8px;
        }

        &.right {
          right: 8px;
        }
      }

      .icon > svg {
        height: 16px;
        left: 10px;
        width: 16px;
      }
    }
  }
`;

export default StyledMenu;
