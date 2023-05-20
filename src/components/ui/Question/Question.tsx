import { faL } from "@fortawesome/free-solid-svg-icons";
import { FC, useRef, useState } from "react";
import styles from "./Question.module.scss";
export interface QuestionProps {
  part?: string,
  number?: number,
  text?: string,
  listRes?: any,
  answers?: any,
  onSet?: any,
  isTimeup?: boolean
}
const Question: FC<QuestionProps> = ({ ...props }) => {
  const answersEx = [
    {
      value: "A",
      title: "A move to a new a city",
      name: "question-38131",
      id: "question-38131-A",
      checked: "A",
    },
    {
      value: "B",
      title: "A move to a new a city",
      name: "question-38131",
      id: "question-38131-B",
      checked: "B",
    },
    {
      value: "C",
      title: "A move to a new a city",
      name: "question-38131",
      id: "question-38131-C",
      checked: "C",
    },
    {
      value: "D",
      title: "A move to a new a city",
      name: "question-38131",
      id: "question-38131-D",
      checked: "D",
    },
  ];
  const ex = [
    {
      "id": 13,
      "value": "A",
      "content": "The passengers are boarding the aircraft."
    },
    {
      "id": 14,
      "value": "B",
      "content": "The flight is departing for the destination."
    },
    {
      "id": 15,
      "value": "C",
      "content": "The plane has landed at the airport for a time."
    },
    {
      "id": 16,
      "value": "D",
      "content": "The surface of the plane is damaged."
    }
  ]
  const ques = {
    "id": 4,
    "content": null,
    "numQuestion": 1,
    "correctAnswer": "D",
    "optionAnswers": [
      {
        "id": 13,
        "value": "A",
        "content": "The passengers are boarding the aircraft."
      },
      {
        "id": 14,
        "value": "B",
        "content": "The flight is departing for the destination."
      },
      {
        "id": 15,
        "value": "C",
        "content": ")The plane has landed at the airport for a time."
      },
      {
        "id": 16,
        "value": "D",
        "content": "The surface of the plane is damaged."
      }
    ],
    "assets": [
      {
        "type": "IMAGE",
        "url": "https://storage.googleapis.com/kslearning/images/418922160-1620725865601-pic1.png"
      }
    ]
  }
  const {
    part,
    number = "32",
    text = "What is the woman preparing for?",
    listRes = [],
    answers = answersEx,
    onSet,
    isTimeup,
  } = props;

  const res = useRef(null);
  const handleChangeRadio = (e: any) => {
    // console.log(e.target.value);
    // setRes(e.target.value);
    res.current = e.target.value;
    const result = e.target.value;
    const temp = [...listRes];

    let check = false;
    listRes.forEach((item: any, index: number) => {
      if (item.number === number) {
        temp[index].result = result;
        onSet([...temp]);
        check = true;
      }
    });
    if (check === false) {
      onSet([...listRes, { number, result }]);
    }
  };

  const handleChecked = (value: any) => {
    let temp;
    if (listRes && listRes.length > 0) {
      temp = listRes.find((item: any, index: number) => {
        return item.number === number;
      });
    }
    if (temp) {
      if (temp.result === value) {
        return true;
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.number}>
        <strong>{number}</strong>
      </div>
      <div className={styles.content}>
        <div className={styles.text}>{text}</div>
        <div className={styles.answers}>
          {answers &&
            answers.map((answer: any, index: number) => {
              return (
                <div className={styles.answerItem} key={index}>
                  <input
                    type="radio"
                    id={answer?.id}
                    name={answer?.name}
                    value={answer?.value}
                    onChange={handleChangeRadio}
                    checked={handleChecked(answer?.value) || false}
                    disabled={isTimeup}
                  />
                  <label htmlFor={answer?.id}>
                    {answer?.value}.
                    <span>
                      {part === "Part 1" || part === "Part 2"
                        ? ""
                        : answer?.title || answer?.content}
                    </span>
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default Question;
