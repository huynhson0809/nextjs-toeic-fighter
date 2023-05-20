import { Button } from "react-bootstrap";
import styles from "./Card.module.scss";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import slugify from "react-slugify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";

export interface CardProps {
  title?: string,
  des?: string,
  time?: number,
  countUser?: number,
  numQues?: number,
  id?: number
}

const Card: FC<CardProps> = ({ ...props }) => {
  const {
    title = "ETS TOEIC 2022 Test 1",
    des = "ETS TOEIC 2022 Test 1",
    time = 120,
    countUser = 999,
    numQues = 200,
    id = 1,
  } = props;
  const router = useRouter()
  const handleClickCard = () => {
    router.push(`/fulltest/${id}/start`);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.itemLink} onClick={handleClickCard}>
        <h2>{title}</h2>
        <div className={styles.testWrapper}>
          <div>
            <span>{des}</span>
          </div>
          <div>
            <span>
              {" "}
              <FontAwesomeIcon icon={faClock} /> {time} phut |{" "}
              <FontAwesomeIcon icon={faUser} />
              &nbsp;{countUser}
            </span>
          </div>
          <div>
            <span>{numQues} cau hoi</span>
          </div>
        </div>
      </div>
      <div className={styles.btnWrapper}>
        <Button variant="outline-primary" onClick={handleClickCard}>
          Chi tiết
        </Button>
      </div>
    </div>
  );
};
export default Card;
