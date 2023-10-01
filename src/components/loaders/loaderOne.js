import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../utilities/utilities";
import styles from "./loaderOne.module.css";
export const LoaderOne = () => {
      return (
            <div className={styles["loader"]}>
                  <ColorRing {...colorRingOptions} />
            </div>
      );
};
