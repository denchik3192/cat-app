import { ReactNode } from "react";
import s from "./appButton.module.scss";

type Props = {
  children: ReactNode;
  isEnabled?: boolean;
  getCat: () => void;
};

export default function AppButton({ children, isEnabled, getCat }: Props) {
  return (
    <button onClick={getCat} className={s.appButton} disabled={!isEnabled}>
      {children}
    </button>
  );
}
