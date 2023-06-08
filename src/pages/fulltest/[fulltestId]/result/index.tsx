import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "@/components/ui";
import styles from '@/styles/Result.module.scss'
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { faBan, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const Result = () => {

    const title = "ETS TOEIC 2022 Test 1";
    const router = useRouter();
    const { asPath } = router
    const { fulltestId } = router.query
    const [cookies, setCookie, removeCookie] = useCookies(["idFullTest"]);

    const [result, setResult] = useState<any>();
    useEffect(() => {
        if (cookies) {
            axios
                .get(`/api/tests/full-test/result/${cookies.idFullTest}`, {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "*/*",
                    },
                })
                .then((response) => {
                    setResult(response.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [fulltestId]);

    const handleClickDetail = () => {
        if (asPath.includes('fulltest')) {
            router.push(`/fulltest/${fulltestId}/result/detail`);
        }
        else {
            // router.push(`/minitest/${numpart}/${titletest}/result/detail`);
        }
    };

    return (
        <Container fluid="lg">
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h2>Kết quả luyện tập: {title} </h2>
                    <div>
                        <Button variant="primary" onClick={handleClickDetail}>
                            Xem đáp án
                        </Button>
                        {/* <Link to="/datcauhoi" /> */}
                    </div>
                    <div className={styles.scoreDetail}>
                        <div className={styles.statusBox}>
                            <div className={styles.statusRes}>
                                <span>Kết quả làm bài</span>
                                <span>
                                    {result?.totalCorrect} /{" "}
                                    {result?.totalCorrect + result?.totalIncorrect + result?.totalSkipped || 200}
                                </span>
                            </div>
                            <div className={styles.statusPercent}>
                                <span>Độ chính xác (#đúng/#tổng)</span>
                                <span>{result?.percentageCorrect}%</span>
                            </div>
                            <div className={styles.statusTimer}>
                                <span>Thời gian hoàn thành</span>
                                <span>{result?.timeDoing}</span>
                            </div>
                        </div>
                        <div className={styles.rightContainer}>
                            <div className={styles.scoreBox2}>
                                <div className={styles.correct}>
                                    <div>
                                        <FontAwesomeIcon icon={faFlag} />
                                    </div>
                                    <div>Điểm</div>
                                    <div>{result?.totalScore}</div>
                                </div>
                            </div>
                            <div className={styles.scoreBox}>
                                <div className={styles.correct}>
                                    <div>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </div>
                                    <div>Trả lời đúng</div>
                                    <div>{result?.totalCorrect}</div>
                                    <div>câu hỏi</div>
                                </div>
                                <div className={styles.incorrect}>
                                    <div>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                    <div>Trả lời sai</div>
                                    <div>{result?.totalIncorrect}</div>
                                    <div>câu hỏi</div>
                                </div>
                                <div className={styles.skip}>
                                    <div>
                                        <FontAwesomeIcon icon={faBan} />
                                    </div>
                                    <div>Bỏ qua</div>
                                    <div>{result?.totalSkipped}</div>
                                    <div>câu hỏi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
export default Result;
