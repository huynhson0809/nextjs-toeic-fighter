import Container from "react-bootstrap/Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from '@/styles/ResultDetail.module.scss'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "@/components/ui";
import { Button, Nav } from "react-bootstrap";
import {
    Audio,
    CountDownTimer,
    ListPart,
    Question,
    QuestionGroup,
} from "@/components/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
const ResultDetail = () => {
    const router = useRouter();
    const { numpart, partId } = router.query

    const [title, setTitle] = useState()
    const [listPart, setListPart] = useState<any>([]);
    const [resultDetail, setResultDetail] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [isTimeup, setIsTimeup] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(["idMiniTest"]);

    useEffect(() => {
        if (numpart && partId) {
            axios
                .get(`/api/tests/skill-test/part${numpart}/${partId}`, {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const res = response?.data?.data[0];
                    setTitle(res.name)
                    setListPart(res.parts);
                })
                .catch((err) => {
                    console.log(err);
                });
            if (cookies) {
                axios
                    .get(
                        `/api/tests/skill-test/result/${cookies.idMiniTest}/detail`,
                        {
                            headers: {
                                accept: "application/json",
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        const userRes = response.data.data?.studentAnswer;
                        const resDetail = response.data.data?.answer;
                        setListResult(userRes);
                        setResultDetail(resDetail);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, [cookies, numpart, partId]);

    const handleSelectTab = (index: number) => {
        setTabIndex(index);
    };

    const handleClickExit = () => {
        router.push(`/minitest/${numpart}/${partId}/result`);
    };
    const handleIsListening = (data: any) => {
        data.forEach((item: any) => {
            item.isListening = true
        });
    }

    const handleDataQuestionGroup = (data: any) => {
        if (data) {
            if (data[0]?.name === "Part 1" || data[0]?.name === "Part 2") {
                handleIsListening(data[0]?.partQuestions[0]?.questions)
            }
            if (
                data[0]?.name === "Part 1" ||
                data[0]?.name === "Part 2" ||
                data[0]?.name === "Part 5"
            ) {
                return data[0]?.partQuestions[0]?.questions;
            } else {
                const tempQuestionGroup = data[0]?.partParagraphs[0]?.paragraphs;
                const listQues: any = [];
                tempQuestionGroup &&
                    tempQuestionGroup.forEach((item: any) => {
                        let temp: any = [];
                        temp = [...temp, ...item.questions];
                        temp[0].contentQuestion = item.content;
                        temp[0].assets = item.assets;
                        if (data[0]?.name === "Part 3" || data[0]?.name === "Part 4") {
                            temp[0].isListening = true;
                        }
                        listQues.push(...temp);
                    });
                return listQues;
            }
        }
    };

    return (
        <Container fluid>
            <div className={styles.heading}>
                <h2 className="title-list-test">{title}</h2>
                <Button variant="outline-primary" onClick={handleClickExit}>
                    Quay về trang kết quả
                </Button>
            </div>
            <div className={styles.testWrapper}>
                <div className={styles.testContent}>
                    <QuestionGroup
                        part={"Part " + numpart}
                        data={
                            handleDataQuestionGroup(listPart)
                        }
                        isTwoCols={numpart === "6" || numpart === "7" ? true : false}
                        listResult={listResult}
                        onSetListResult={setListResult}
                        isFullTest={false}
                        isListening={listPart?.parts?.[0]?.isListening}
                        indexTab={tabIndex}
                        onSelectTab={handleSelectTab}
                        isTimeup={isTimeup}
                        isShowResult={true}
                        resultDetail={resultDetail}
                    />
                </div>
                <div className={styles.naviWrapper}>
                    <div className={styles.naviInner}>
                        <div className={styles.navMain}>
                            <ListPart
                                data={
                                    handleDataQuestionGroup(listPart)
                                }
                                title={"Part " + numpart}
                                listRes={listResult}
                                isShowResult={true}
                                userResult={listResult}
                                resultDetail={resultDetail}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ResultDetail;
