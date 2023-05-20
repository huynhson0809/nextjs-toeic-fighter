import styles from "./ListPart.module.scss";
import classNames from "classnames/bind";
import { FC, useEffect, useRef, useState } from "react";
import _ from "lodash";

const cx = classNames.bind(styles);

export interface ListPartProps {
  title?: string,
  data?: any,
  listRes?: any,
  isShowResult?: boolean,
  userResult?: any,
  resultDetail?: any
}

const ListPart: FC<ListPartProps> = ({ ...props }) => {
  const {
    title = "Part 1",
    data,
    listRes,
    isShowResult,
    userResult,
    resultDetail,
  } = props;

  const handleClickItem = () => { };

  const handleColorQues = (value: number) => {
    const temp = listRes.find((item: any) => {
      return item.number === value;
    });
    if (temp) {
      return true;
    } else return false;
  };
  // console.log(listQues);
  const handleCheckResult = (number: number) => {
    const user = listRes.find((item: any) => {
      return item.number === number;
    });
    const system = resultDetail.find((item: any) => {
      return item.number === number;
    });
    if (
      user?.result === system?.result &&
      user?.result &&
      system?.result !== undefined
    ) {
      return true;
    } else return false;
  };
  const handleCheckResultInCorrect = (number: number) => {
    const user = listRes.find((item: any) => {
      return item.number === number;
    });
    const system = resultDetail.find((item: any) => {
      return item.number === number;
    });
    if (user?.result === system?.result) {
      return false;
    } else return true;
  };
  const handleCheckResultSkip = (number: number) => {
    const user = listRes.find((item: any) => {
      return item.number === number;
    });
    const system = resultDetail.find((item: any) => {
      return item.number === number;
    });
    if ((user?.result && system?.result) === undefined || (user?.result && system?.result) === null) {
      return true;
    } else return false;
  };
  return (
    <div className={styles.wrapper}>
      <h6>{title}</h6>
      <div className={styles.inner}>
        {data &&
          data.map((item: any, index: number) => {
            if (isShowResult && listRes && resultDetail) {
              return (
                <span
                  key={index}
                  className={cx(
                    "list-part-item",
                    {
                      isCorrect: handleCheckResult(item?.numQuestion),
                    },
                    {
                      isInCorrect: handleCheckResultInCorrect(
                        item?.numQuestion
                      ),
                    },
                    {
                      isSkip: handleCheckResultSkip(item?.numQuestion),
                    }
                  )}
                  onClick={handleClickItem}
                >
                  {item?.numQuestion}
                </span>
              );
            } else {
              return (
                <span
                  key={index}
                  className={cx("list-part-item", {
                    done: handleColorQues(item?.numQuestion),
                  })}
                  onClick={handleClickItem}
                >
                  {item?.numQuestion}
                </span>
              );
            }
          })}
      </div>
    </div>
  );
};
export default ListPart;
