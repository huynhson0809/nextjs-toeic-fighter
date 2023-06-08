import Container from "react-bootstrap/Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from '@/styles/DoFullTest.module.scss'
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
} from "@/components/ui"
import { useCallback, useEffect, useRef, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
const DoFullTest = () => {
    const router = useRouter()
    const { fulltestId } = router.query

    const [title, setTitle] = useState()
    const [listParts, setListParts] = useState<any>([]);
    const [listResult, setListResult] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [isTimeup, setIsTimeup] = useState(false);

    const timeStart = useRef<any>();
    const timeEnd = useRef<any>();
    const timer = useRef<any>(0);
    const [cookies, setCookie, removeCookie] = useCookies(["idFullTest", "user"]);

    // useEffect(() => {
    //     const userId = cookies.user?.userId
    //     if (!userId) {
    //         router.push('/login')
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    useEffect(() => {
        timeStart.current = new Date().toUTCString();
        if (fulltestId) {
            axios
                .get(`/api/tests/full-test/${fulltestId}`, {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const res = response.data.data
                    setTitle(res.name)
                    setListParts(res.parts);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [fulltestId]);
    const handleSelectTab = (index: number) => {
        setTabIndex(index);
    };

    const handleClickSubmit = async () => {
        if (window.confirm("Bạn có chắc chắn muốn nộp bài?") === true) {
            const userId = cookies.user?.userId
            timeEnd.current = new Date().toUTCString();
            const dataSubmit = {
                type: "FULL_TEST",
                idTest: fulltestId,
                userResult: listResult,
                timeStart: timeStart.current,
                timeEnd: timeEnd.current,
            };
            await axios
                .post(
                    `/api/tests/result/${userId}`,
                    dataSubmit
                )
                .then((res) => {
                    console.log("res", res.data);
                    if (res.data.statusCode !== 500) {
                        router.push(`/fulltest/${fulltestId}/result`);
                        if (cookies.idFullTest) {
                            removeCookie("idFullTest");
                        }
                        setCookie("idFullTest", res.data.testId);
                    }
                })
                .catch((err) => {
                    console.log("error in request", err);
                });
        }
    };
    const handleTimeup = useCallback(() => {
        setIsTimeup(true);
    }, []);
    const handleClickExit = () => {
        if (
            window.confirm(
                "Bạn có thực sự muốn thoát, kết quả làm bài của bạn sẽ không được lưu?"
            ) === true
        ) {
            router.push("/fulltest");
        }
    };
    const handleDataQuestionGroup = (data: any) => {
        if (data) {
            if (data.name === "Part 1" || data.name === "Part 2" || data.name === "Part 5") {
                return data?.partQuestions[0]?.questions
            }
            else {
                const tempQuestionGroup = data?.partParagraphs[0]?.paragraphs
                const listQues: any = []
                tempQuestionGroup && tempQuestionGroup.forEach((item: any) => {
                    let temp: any = []
                    temp = [...temp, ...item.questions]
                    temp[0].contentQuestion = item.content
                    listQues.push(...temp)
                });
                return listQues
            }
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <div className={styles.heading}>
                        <h2>{title}</h2>
                        <Button variant="outline-primary" onClick={handleClickExit}>
                            Thoát
                        </Button>
                    </div>
                </Col>
            </Row>
            <div className={styles.testWrapper}>
                <Row>
                    <Col sm={9} md={10}>
                        <div className={styles.testContent}>
                            <Audio
                                source={
                                    listParts[0]?.partQuestions[0]?.questions[0]?.assets[1]?.url
                                }
                            />
                            <div className={styles.nav}>
                                <Tabs selectedIndex={tabIndex} onSelect={(i) => handleSelectTab(i)}>
                                    <TabList>
                                        {listParts &&
                                            listParts.map((item: any, index: number) => {
                                                return (
                                                    <Tab key={`${item.id} + ${index}`} className={styles.itemLink}>
                                                        {item?.name}
                                                    </Tab>
                                                );
                                            })}
                                    </TabList>
                                    {
                                        listParts && listParts.length > 0 && listParts.map((item: any, index: number) => {
                                            return (
                                                <TabPanel key={`${item.id} + ${index}`} >
                                                    <div className={styles.content}>
                                                        {/* <QuestionGroup data={listParts[6]} /> */}
                                                        <QuestionGroup
                                                            part={item?.name}
                                                            data={
                                                                handleDataQuestionGroup(item)
                                                            }
                                                            isTwoCols={
                                                                item?.name === "Part 6" || item?.name === "Part 7"
                                                                    ? true
                                                                    : false
                                                            }
                                                            listResult={listResult}
                                                            onSetListResult={setListResult}
                                                            isFullTest={true}
                                                            // isFullTest={false}
                                                            indexTab={tabIndex}
                                                            onSelectTab={handleSelectTab}
                                                            isTimeup={isTimeup}
                                                        />
                                                    </div>
                                                </TabPanel>
                                            )
                                        })
                                    }
                                </Tabs>
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} md={2}>
                        <div className={styles.naviWrapper}>
                            <div className={styles.naviInner}>
                                <div className={styles.navMain}>
                                    <div>Thời gian còn lại:</div>
                                    <CountDownTimer onComplete={handleTimeup} timer={timer.current} milliseconds={7200000} />
                                    <Button
                                        variant="outline-primary"
                                        size="lg"
                                        onClick={handleClickSubmit}
                                    >
                                        {" "}
                                        NỘP BÀI
                                    </Button>
                                    {
                                        listParts && listParts.length > 0 && listParts.map((item: any, index: number) => {
                                            return (
                                                <ListPart
                                                    key={`${item.id} + ${index}`}
                                                    data={
                                                        handleDataQuestionGroup(item)
                                                    }
                                                    title={item?.name}
                                                    listRes={listResult}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};
export default DoFullTest;
