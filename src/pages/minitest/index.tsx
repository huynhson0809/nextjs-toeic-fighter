import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import images from "../../assets/images";
import { CardChoosePart } from "@/components/ui";
const MiniTest = () => {
    const listMiniTest = [
        {
            part: 1,
            title: "Mô tả tranh",
            des: "Thí sinh sẽ nghe 1 lần duy nhất 4 câu mô tả về một bức tranh. Sau đó chọn 1 đáp án mô tả đúng nhất bức tranh đó.",
            image: images.part1,
        },
        {
            part: 2,
            title: "Hỏi - Đáp",
            des: "Thí sinh sẽ nghe 1 lần duy nhất 4 câu mô tả về một bức tranh. Sau đó chọn 1 đáp án mô tả đúng nhất bức tranh đó.",
            image: images.part2,
        },
        {
            part: 3,
            title: "Đoạn hội thoại",
            des: "Thí sinh sẽ nghe 1 lần duy nhất các đoạn hội thoại giữa 2 hoặc 3 người. Mỗi đoạn hội thoại sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất.",
            image: images.part3,
        },
        {
            part: 4,
            title: "Bài nói ngắn",
            des: "Thí sinh sẽ nghe 1 lần duy nhất các bài nói ngắn. Mỗi bài sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất.",
            image: images.part4,
        },
        {
            part: 5,
            title: "Hoàn thành câu",
            des: "Thí sinh sẽ nghe 1 lần duy nhất 4 câu mô tả về một bức tranh. Sau đó chọn 1 đáp án mô tả đúng nhất bức tranh đó.",
            image: images.part5,
        },
        {
            part: 6,
            title: "Hoàn thành đoạn văn",
            des: "Chọn đáp án đúng nhất trong 4 đáp án (từ, cụm từ hoặc câu) để hoàn thành đoạn văn. Mỗi đoạn văn sẽ có 4 câu hỏi.",
            image: images.part6,
        },
        {
            part: 7,
            title: "Đọc hiểu",
            des: "Thí sinh sẽ đọc các bài đọc hiểu sau đó chọn đáp án đúng nhất cho các câu hỏi. Mỗi bài đọc sẽ bao gồm 2 - 5 câu hỏi.",
            image: images.part7,
        },
    ];
    return (
        <Container>
            <h2 className="headingMiniTest">Mini Test</h2>
            <Row>
                {listMiniTest &&
                    listMiniTest.map((item, index) => {
                        return (
                            <Col md={3} key={index}>
                                <CardChoosePart
                                    title={item.title}
                                    des={item.des}
                                    part={item.part}
                                    image={item.image}
                                />
                            </Col>
                        );
                    })}
            </Row>
        </Container>
    );
};
export default MiniTest;
