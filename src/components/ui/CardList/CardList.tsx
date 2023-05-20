import styles from "./CardList.module.scss";
import Card from "../Card/Card";
export interface CardListProps {

}
const CardList = ({ ...props }) => {
  return <div className={styles.wrapper}></div>;
};
export default CardList;
