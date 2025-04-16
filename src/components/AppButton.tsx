import { ReactNode } from "react";
import s from "./appButton.module.scss";
import { fetchCatImage } from "../API/getCat";
type Props = {
  children: ReactNode;
  setCatImage: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isEnabled?: boolean;
};

export default function AppButton({
  children,
  setCatImage,
  setIsLoading,
  isEnabled,
}: Props) {
  const getCat = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCatImage();
      setCatImage(res[0].url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={getCat} className={s.appButton} disabled={!isEnabled}>
      {children}
    </button>
  );
}
