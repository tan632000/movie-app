import Link from "next/link";
import { deviceType } from "../../utils/checkDeviceUser";
import { useEffect, useState } from "react";
import styles from "./text.module.scss";

interface TextProps {
  size?: string;
  option?: string;
  href?: string;
  content?: string;
  color?: string;
  font?: string;
  align?: string;
  classStyles?: string;
}

const Text: React.FC<TextProps> = ({
  option,
  href,
  size,
  content,
  color,
  font,
  align,
  classStyles,
}) => {
  const [device, setDevice] = useState("");
  useEffect(() => {
    setDevice(deviceType());
  }, []);
  return (
    <>
      {!option && (
        <div
          className={`
        ${styles.container}
        ${styles[`${classStyles}`]}
        ${size ? styles[`text-${size}`] : ""}
        ${color ? styles[`text-${color}`] : styles[`text-blue`]}
        ${font ? styles[`text-${font}`] : ""}
        ${align ? styles[`text-${align}`] : ""}
        ${styles[`text-${device}`]}
        `}
        >
          {content}
        </div>
      )}
      {option === "link" && <Link href={href || "/"}>{content}</Link>}
    </>
  );
};

export default Text;
