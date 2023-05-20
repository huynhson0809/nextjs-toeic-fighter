
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/router";
import images from "@/assets/images";
import styles from "./CardChoosePart.module.scss";
import Image from "next/image";
import { FC } from "react";

export interface CardChoosePartProps {
  title?: string,
  des?: string,
  part?: number,
  image?: any,
}

const CardChoosePart: FC<CardChoosePartProps> = ({ ...props }) => {
  const {
    title = "Mô tả tranh",
    part = "1",
    des = "Thí sinh sẽ nghe 1 lần duy nhất 4 câu mô tả về một bức tranh. Sau đó chọn 1 đáp án mô tả đúng nhất bức tranh đó.",
    image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAulBMVEX///8AAAD/tmY6AAAAAGa2/////9v/25CQOgBmtv86kNsAZrYAADq2ZgCQ2//b/////7ZmAAAAOmY6Ojq22/8AOpAAOjo6ZpDbkDq229vbtma2kGbb2///27bbtpBmOgA6OgCQZjq2ZjpmkLbb27ZmZmY6OmaQttvbkGa2tpD/29tmOjo6ZrZmkNu2kDqQkLbb29uQtrZmZjpmttuQZmY6ZmaQkJCQ29tmkJC2tts6kLaQtv+QtpCQkGYHVbbPAAADxklEQVR4nO2a6XaiMBhAYWxxZoq1Ix2tdXS67/vs2/u/1ogKhJCEBCnqOff+6qlJ+G5CQvKB5wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQHDsS/Sj88fhqsMqEJy05uFd7Kt/fyt7LOhdNhypmcNWGtk7ZYE3Go8p4ZeGg9UzFrvbWWQ6KupRbJpg1BKjqiDih7u1R3UVzVruD7q2NSaf80FVEanfJLvee7sKwYkcUyURf2u7RgvPXeSwVQipmohtx9niJqJcU8tEFn0fPF3n7smah8RNpKPqWkuRmIk4nvUOiZOI+iHnIOK1BZOP1suLDU4iex+Swr3nzMlFRJw69d5blUR6Q3FwnETEQZUq3lx/jY5mP4TRt8dPJbEEk9tpyf5pUq7CrdUb5gNyEvEO1CJnx75EeCffelczzf59/Pc4WTimN+iBXHXRgP5RFUffGwpOFUSEeyvtOmmrkEZyn2sxmV9xgNlc29rWbk8NQzP+nmyS6hRpKzVi7jQiQo1wN5u5Ejt6kYwaRbQ9KnVqJiKGvg4ii4raQKTGU5EfovnKRIqTXX9n+bmHTSryIhZYlYhQL1lVUpHw5zBeTOcLq1RIKxzuVpnsy4sI0SSdvejRgXDYOlRFoxaZtq5Zfu0euFVFhN1aMvKzpgb5M2OnUKogEp8yb0ZRIup8HllOROy8tN6bVuHomwWdTZK8iBxuoyK5Q5lxz5g1n9VuG7fOzYkEZ8cWR/2EjlRbEikuSA2IqCnZxJtFFPN4VSJlS4pZRHHJFYmUJlGMIqrRXI1IeTLIKKJ6ZK9ERJNDO7s+jyL5qbfGIsosdjA6UpdeW5GB6sVCMeu3ziL96PxZfRJXZP3WUaR08yZsETdaxHge2SAR8TgRDn49zf+7jstviYgwmX5ny/IGinSUDW2eSNZQbuOxeSJZ6iAX3hIiVjmH+kWy8HI96Sxi/rUBEfWIiClRVxG3LP8riAjllGcos4iQ3XKaJK8w2f2dxWwPHnxfUdtaJDztxun96I/+quaHcK4nrJdfIbHSu+zGKZ7cPthWRPFa0DAyyneI6oitRcydYy9STNPpZ70pb+5L5z77vZZt75SIFFPATYsok9Dh35ajSHFImhZR3Vy9/bazSCG6ynNEI1L+Gnosfd3i33U9dxFvz+ojGQuR/PuD0TyP0B9YfNIU5M6I80zww7y68B4x/f5H12LwIDZj+kzIYfl1ZfzvNm48vDgtezFtIpi8zF/9LtcMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwKvxH3ESNu7xkkxaAAAAAElFTkSuQmCC",
  } = props;
  const router = useRouter()
  const handleClickMiniTest = () => {
    router.push(`/minitest/${part}`);
  };
  return (
    <div className={styles.wrapper}>
      <Card className={styles.content} onClick={handleClickMiniTest}>
        <Image src={image} alt="part 1" />
        <div className={styles.body}>
          <div className={styles.title}>
            <h3>Phần {part}</h3>
            <h4>{title}</h4>
          </div>
          <div className={styles.des}>{des}</div>
          <div className={styles.btnWrapper}>
            <Button variant="primary" size="lg" onClick={handleClickMiniTest}>
              Test
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default CardChoosePart;
