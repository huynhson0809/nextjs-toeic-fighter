import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import slugify from "react-slugify";
import { Col, Container, Row } from "react-bootstrap";
import images from "@/assets/images";
import styles from "@/styles/ChooseMiniTest.module.scss";
import axios from "axios";

const ChooseMiniTest = () => {

    const router = useRouter()
    const { numpart } = router.query
    const [miniTest, setMiniTest] = useState([]);

    const handleClickChooseMiniTest = (id: number) => {
        router.push(`/minitest/${numpart}/${id}/start`);
    };

    useEffect(() => {
        if (numpart) {
            axios
                .get(`/api/tests/skill-test/part${numpart}`)
                .then((response) => {
                    console.log(response.data);
                    setMiniTest(response.data.data);
                })
                .catch((err) => {
                    console.log(err);

                })
        }
    }, [numpart]);


    return (
        <Container>
            <div className={styles.wrapper}>
                <h2>Mini Test - Part {numpart}</h2>
                <div className={styles.content}>
                    <ul className={styles.list}>
                        {miniTest &&
                            miniTest.length > 0 &&
                            miniTest.map((item: any) => {
                                return (
                                    <li
                                        key={item?.id}
                                        onClick={() =>
                                            handleClickChooseMiniTest(item?.id)
                                        }
                                    >
                                        {item?.name}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </Container>
    );
};
export default ChooseMiniTest;
