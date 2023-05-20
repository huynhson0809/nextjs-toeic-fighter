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
    const { numpart, partId } = router.query

    const [title, setTitle] = useState()
    const [listPart, setListPart] = useState([]);
    const [resultDetail, setResultDetail] = useState([]);
    const [listResult, setListResult] = useState([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [isTimeup, setIsTimeup] = useState(true);

    const timer = useRef(0);

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
                    const res = response.data.data
                    setTitle(res.name)
                    setListPart(res.parts);
                })
                .catch((err) => {
                    console.log(err);
                });
            axios
                .get(`/api/tests/skill-test/result/part${numpart}/${partId}/detail`, {
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
    }, [numpart, partId]);

    // useEffect(() => {
    //   console.log(111, listResult);
    // }, [listResult]);
    const handleSelectTab = (index: number) => {
        setTabIndex(index);
    };

    const handleClickExit = () => {
        router.push(`/skill-test/${numpart}/${partId}/result`);
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
                                {listPart &&
                                    listPart.length > 0 &&
                                    listPart.map((item: any, index: number) => {
                                        return (
                                            <Tab key={item.id} className={styles.itemLink}>
                                                {item?.name}
                                            </Tab>
                                        );
                                    })}
                            </TabList>
                            {listPart &&
                                listPart.length > 0 &&
                                listPart.map((item: any, index: number) => {
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
                            {listPart &&
                                listPart.map((item: any, index: number) => {
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
