import Image from "next/image";
import React from "react";
const About = () => {
    return (
        <div>
            <h2 className="title-list-test">About</h2>
            <div className="about-image">
                <Image src="https://preview.colorlib.com/theme/clever/img/bg-img/bg1.jpg.webp" alt="about" width={400} height={200} />
            </div>
            <p className="about-des">Founded in 2021, <strong>https://toeicfighter.com</strong> is a website to learn English and prepare for IELTS, TOEIC online where more than 20,000 members share and learn from each other every day.

                We are a group of young, talented and enthusiastic people in education from the US and Vietnam. Our goal is to bring the best educational technology products to learners in Vietnam, helping them learn more effectively, more happily, and save more in terms of time and costs.

                Please feel free to contact us if you have any questions or comments.</p>
        </div>
    )
}
export default About