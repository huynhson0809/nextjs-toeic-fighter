
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/router";
import images from "@/assets/images";
import styles from "./CardFeedback.module.scss";
import Image from "next/image";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export interface CardFeedbackProps {
    name?: string,
    username?: string,
    time?: any,
    feedback?: string
}

const CardFeedback: FC<CardFeedbackProps> = ({ ...props }) => {
    const {
        name = "Huynh Ngoc Son",
        username = "huynhson89",
        time = "Sep 4, 2019",
        feedback
    } = props;

    return (
        <a className={styles.wrapper}>
            <span>
                <FontAwesomeIcon icon={faUser} />
            </span>
            <div className={styles.content}>
                <div className={styles.user}>
                    <span style={{ display: "block" }}>{name}</span>
                    <span>{username} - {time}</span>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html:
                            feedback || ""
                    }}
                ></div>
                {/* <p className={styles.userContent}>People throw React component libraries and design systems at me regularly. <br></br> This might be the best one I've seen. The APIs are simple but composable and the accessibility on the couple components I looked is complete. <br></br> Great work @thesegunadebayo, really inspiring work</p> */}
            </div>
        </a>
    );
};
export default CardFeedback;
