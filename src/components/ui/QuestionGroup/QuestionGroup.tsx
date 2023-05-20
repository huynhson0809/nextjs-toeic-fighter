/* eslint-disable react/no-danger-with-children */
import styles from "./QuestionGroup.module.scss";
import Question from "../Question/Question";
import { Image } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Audio from "../Audio";
const QuestionGroup = ({ ...props }) => {
  const {
    part,
    isListening,
    isTwoCols,
    data,
    listResult,
    onSetListResult,
    isFullTest,
    indexTab,
    onSelectTab,
    isTimeup,
    isShowResult,
    resultDetail,
  } = props;

  const handleClickNext = () => {
    onSelectTab(indexTab + 1);
  };

  const dataHaveResultDetail =
    data &&
    data.length > 0 &&
    data.map((item: any) => {
      const temp =
        resultDetail &&
        resultDetail.find((res: any) => res?.number === item?.numQuestion);
      if (item?.numQuestion === temp?.number) {
        return {
          ...item,
          detail: temp?.detail,
          result: temp?.result,
          transcript: temp?.transcript,
        };
      } else return item;
    });

  return (
    <div className={styles.wrapper}>
      {isTwoCols ? (
        <>
          {dataHaveResultDetail &&
            dataHaveResultDetail.length > 0 &&
            dataHaveResultDetail.map((item: any, index: number) => {
              return (
                <div className={styles.inner} key={item.id}>
                  <div className={styles.twoCols}>
                    <div className={styles.left}>
                      <div className={styles.contextWrapper}>
                        <div className={styles.contextContent}>
                          {part === "Part 6" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  (index + 4) % 4 === 0
                                    ? item?.contentQuestion
                                    : "",
                              }}
                            >
                              {/* {item?.detail} */}
                            </div>
                          ) : (
                            <></>
                          )}
                          {part === "Part 7" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item?.contentQuestion,
                              }}
                            >
                              {/* {item?.detail} */}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.questionsWrapper}>
                        <Question
                          part={part}
                          text={item?.content}
                          answers={item?.optionAnswers}
                          number={item?.numQuestion}
                          listRes={listResult}
                          onSet={onSetListResult}
                          isTimeup={isTimeup}
                        />
                      </div>
                      {isShowResult ? (
                        <div className={styles.detail}>
                          <div className={styles.textSuccess}>
                            Đáp án: {item?.result}
                          </div>
                          <div className={styles.resultDetail}>
                            {item?.detail ? (
                              <>
                                <p>Giải thích chi tiết đáp án:</p>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item?.detail ||
                                      `<p>Hi&#7879;n t&#7841;i ch&#432;a c&oacute; l&#7901;i gi&#7843;i chi ti&#7871;t cho c&acirc;u h&#7887;i n&agrave;y</p>`,
                                  }}
                                >
                                  {/* {item?.detail} */}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <div className={styles.contentImageWrapper}>
          {dataHaveResultDetail &&
            dataHaveResultDetail.length > 0 &&
            dataHaveResultDetail.map((ques: any, index: number) => {
              return (
                <div key={index}>
                  <div className={styles.contextWrapper}>
                    <div className={styles.contextContent}>
                      {!isFullTest && ques?.isListening ? (
                        <Audio />
                      ) : (
                        <></>
                      )}
                      {ques?.assets?.[0]?.url ? (
                        <Image src={ques?.assets?.[0]?.url} alt="image" className={styles.imageQuestion} />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={styles.contextTranscript}>
                      {isShowResult && isListening ? (
                        <div className={styles.transcriptContent}>
                          {ques?.transcript ? <p>Transcript:</p> : <></>}
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                ques?.transcript ||
                                `<i><p>Hi&#7879;n t&#7841;i ch&#432;a c&oacute; transcript</p></i>`,
                            }}
                          >
                            {/* {ques?.detail} */}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className={styles.questionsWrapper}>
                    <Question
                      part={part}
                      text={
                        part === "Part 1" || part === "Part 2"
                          ? ""
                          : ques?.content
                      }
                      answers={ques?.optionAnswers}
                      number={ques?.numQuestion}
                      listRes={listResult}
                      onSet={onSetListResult}
                      isTimeup={isTimeup}
                    />
                  </div>
                  {isShowResult ? (
                    <div className={styles.detail}>
                      <div className={styles.textSuccess}>
                        Đáp án: {ques?.result}
                      </div>
                      <div className={styles.resultDetail}>
                        {ques?.detail ? (
                          <>
                            <p>Giải thích chi tiết đáp án:</p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  ques?.detail ||
                                  `<p>Hi&#7879;n t&#7841;i ch&#432;a c&oacute; l&#7901;i gi&#7843;i chi ti&#7871;t cho c&acirc;u h&#7887;i n&agrave;y</p>`,
                              }}
                            >
                              {/* {ques?.detail} */}
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {isFullTest && indexTab !== 6 ? (
        <div className={styles.nextBtn}>
          <div onClick={handleClickNext}>TIẾP THEO</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default QuestionGroup;
