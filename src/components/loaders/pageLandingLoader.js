import { ColorRing } from "react-loader-spinner";
import { colorRingOptions } from "../../utilities/utilities";
import styles from "./pageLandingLoader.module.css";
export const PageLandingLoader = () => {
      return (
            <div className={styles["loader"]}>
                  <ColorRing {...colorRingOptions} />
            </div>
      );
};
