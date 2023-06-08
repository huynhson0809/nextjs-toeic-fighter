
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/router";
import images from "@/assets/images";
import styles from "./CardFeature.module.scss";
import Image from "next/image";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export interface CardFeatureProps {
    icon?: any,
    title?: string,
    des?: string
}

const CardFeature: FC<CardFeatureProps> = ({ ...props }) => {
    const {
        icon = faUser,
        title = "Accessible",
        des = "Chakra UI strictly follows WAI-ARIA standards for all components.",
    } = props;

    return (
        <div className={styles.expItem}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={icon} />
            </div>
            <h3>{title}</h3>
            <p>{des}</p>
        </div>
    );
};
export default CardFeature;
