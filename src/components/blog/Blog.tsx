import Link from "next/link";
import styles from "./Blog.module.css";
import { BlogProps } from "./Blog.props";
import { Typography, Image } from "antd";

function Blog({ id, image, title, date }: BlogProps) {
  const { Title } = Typography;
  return (
    <Link href={`/posts/${id}`}>
      <div key={id}>
        <div>
          <Image src={image} />
        </div>
        <div>
          <Title>{title}</Title>
          <p>
            {new Date(date).toLocaleString("ru", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default Blog;
