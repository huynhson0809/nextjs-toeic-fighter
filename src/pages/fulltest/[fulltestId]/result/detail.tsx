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
const ResultDetail = () => {
    const router = useRouter();
    const { fulltestId } = router.query

    const [title, setTitle] = useState()
    const [listParts, setListParts] = useState([]);
    const [resultDetail, setResultDetail] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [isTimeup, setIsTimeup] = useState(true);

    const timer = useRef(0);

    useEffect(() => {
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
            axios
                .get(`/api/tests/full-test/result/${fulltestId}/detail`, {
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const userRes = response.data.data?.cleanedDataPartsInResult;
                    const resDetail = response.data.data?.cleanedDataResultDetail;
                    setListResult(userRes);
                    setResultDetail(resDetail);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [fulltestId]);

    // useEffect(() => {
    //   console.log(111, listResult);
    // }, [listResult]);
    const handleSelectTab = (index: number) => {
        setTabIndex(index);
    };

    const handleClickExit = () => {
        router.push(`/fulltest/${fulltestId}/result`);
    };

    const handleDataQuestionGroup = (data: any) => {
        if (data) {
            if (
                data?.name === "Part 1" ||
                data?.name === "Part 2" ||
                data?.name === "Part 3" ||
                data?.name === "Part 4"
            ) {
                data.isListening = true;
            } else data.isListening = false;
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
            <div className={styles.heading}>
                <h2>{title}</h2>
                <Button variant="outline-primary" onClick={handleClickExit}>
                    Quay về trang kết quả
                </Button>
            </div>
            <div className={styles.testWrapper}>
                <div className={styles.testContent}>
                    <Audio />
                    <div className={styles.nav}>
                        <Tabs selectedIndex={tabIndex} onSelect={(i) => handleSelectTab(i)}>
                            <TabList>
                                {listParts &&
                                    listParts.length > 0 &&
                                    listParts.map((item: any, index: number) => {
                                        return (
                                            <Tab key={item.id} className={styles.itemLink}>
                                                {item?.name}
                                            </Tab>
                                        );
                                    })}
                            </TabList>
                            {listParts &&
                                listParts.length > 0 &&
                                listParts.map((item: any, index: number) => {
                                    // console.log(2222, item);
                                    return (
                                        <TabPanel key={item.id}>
                                            <div className={styles.content}>
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
                                                    isListening={item?.isListening}
                                                    indexTab={tabIndex}
                                                    onSelectTab={handleSelectTab}
                                                    isTimeup={isTimeup}
                                                    isShowResult={true}
                                                    resultDetail={resultDetail}
                                                />
                                            </div>
                                        </TabPanel>
                                    );
                                })}
                        </Tabs>
                    </div>
                </div>
                <div className={styles.naviWrapper}>
                    <div className={styles.naviInner}>
                        <div className={styles.navMain}>
                            {listParts &&
                                listParts.map((item: any, index: number) => {
                                    return (
                                        <ListPart
                                            key={index}
                                            data={
                                                handleDataQuestionGroup(item)
                                            }
                                            title={item?.name}
                                            listRes={listResult}
                                            isShowResult={true}
                                            userResult={listResult}
                                            resultDetail={resultDetail}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
export default ResultDetail;
