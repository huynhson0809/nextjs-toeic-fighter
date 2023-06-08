import Container from "react-bootstrap/Container";
import "react-tabs/style/react-tabs.css";
import styles from "@/styles/DoMiniTest.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import {
    Audio,
    CountDownTimer,
    ListPart,
    QuestionGroup,
} from "@/components/ui";

import axios from "axios";
import { useCookies } from "react-cookie";

const DoMiniTest = () => {
    const router = useRouter()
    const { numpart, partId } = router.query

    const [title, setTitle] = useState('')
    const [listResult, setListResult] = useState([]);
    const [isTimeup, setIsTimeup] = useState(false);
    const timer = useRef(0);
    const [idPart, setIdPart] = useState()
    const [listPart, setListPart] = useState([]);
    const timeStart = useRef<any>();
    const timeEnd = useRef<any>();
    const [cookies, setCookie, removeCookie] = useCookies(["idMiniTest", "user"]);

    useEffect(() => {
        if (numpart && partId) {
            axios
                .get(
                    `/api/tests/skill-test/part${numpart}/${partId}`,
                    {
                        headers: {
                            accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    const res = response?.data?.data[0];
                    console.log(response?.data?.data[0]);
                    setIdPart(res?.parts[0]?.id)
                    setListPart(res?.parts);
                    setTitle(response?.data?.data[0]?.name)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [numpart, partId]);


    const handleClickSubmit = async () => {
        if (window.confirm("Bạn có chắc chắn muốn nộp bài?") === true) {
            const userId = cookies.user?.userId
            timeEnd.current = new Date().toUTCString();
            const dataSubmit = {
                type: "SKILL_TEST",
                idTest: idPart,
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
                        router.push(`/minitest/${numpart}/${partId}/result`);
                        if (cookies.idMiniTest) {
                            removeCookie("idMiniTest");
                        }
                        setCookie("idMiniTest", res.data.testId);
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
            router.push("/minitest");
        }
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
    const handleMinDoMiniTest = (namepart: string) => {
        if (namepart === "part1") {
            return 300000;
        } else if (namepart === "part2") {
            return 420000;
        } else if (namepart === "part3") {
            return 1200000;
        } else if (namepart === "part 4") {
            return 900000;
        } else if (namepart === "part 5") {
            return 900000;
        } else if (namepart === "part 6") {
            return 900000;
        } else if (namepart === "part 7") {
            return 3300000;
        }
    };
    return (
        <Container fluid>
            <div className={styles.heading}>
                <h2 className="title-list-test">PART {numpart} - {title}</h2>
                <Button variant="outline-primary" onClick={handleClickExit}>
                    Thoát
                </Button>
            </div>
            <div className={styles.testWrapper}>
                <div className={styles.testContent}>
                    <QuestionGroup
                        part={"Part " + numpart}
                        iuFullTest={false}
                        data={
                            handleDataQuestionGroup(listPart)
                        }
                        isTwoCols={numpart === '6' || numpart === '7' ? true : false}
                        listResult={listResult}
                        onSetListResult={setListResult}
                        isTimeup={isTimeup}
                    />
                </div>
                <div className={styles.naviWrapper}>
                    <div className={styles.naviInner}>
                        <div className={styles.navMain}>
                            <div>Thời gian còn lại:</div>
                            <CountDownTimer onComplete={handleTimeup} timer={timer.current} milliseconds={handleMinDoMiniTest("part" + numpart)} />
                            <Button
                                variant="outline-primary"
                                size="lg"
                                onClick={handleClickSubmit}
                            >
                                {" "}
                                NỘP BÀI
                            </Button>
                            <ListPart
                                data={
                                    handleDataQuestionGroup(listPart)
                                }
                                title={"Part " + numpart}
                                listRes={listResult}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};
export default DoMiniTest;
