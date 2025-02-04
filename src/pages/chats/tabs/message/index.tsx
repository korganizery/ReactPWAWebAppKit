import {
  JSX,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input, Card, List, Image, Space } from "antd-mobile";
import {
  AddSquareOutline,
  AudioOutline,
  SmileOutline,
  LeftOutline,
  LocationOutline,
  MoreOutline,
} from "antd-mobile-icons";
import { useNavigate } from "react-router";

import useWindowSize from "../../../../hooks/useWindowSize"; // 请替换为实际的路径
import EmojiPickers from "./EmojiPickers";

import styles from "./index.module.less";

interface Item {
  id: string;
  position: string;
  avatar: string;
  description: string;
  name: string;
}

const userList = [
  {
    id: "1",
    position: "itemLeft",
    avatar:
      "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    name: "Novalee Spicer",
    description:
      "Used alongside an alignment keyword. RegarUsed alongside an alignment keyword. RegarUsed alongside an alignment keyword. RegarUsed alongside an alignment keyword. RegarUsed alongside an alignment keyword. Regar",
  },
  {
    id: "2",
    position: "itemRight",
    avatar:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9",
    name: "Sara Koivisto",
    description: "Animi eius expedita, explicabo",
  },
];

const rowCount = 1000;

const item = {
  avatar:
    "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  name: "Novalee Spicer",
  description:
    "Used alongside an alignment keyword. RegarUsed alongside an alignment keyword. RegarUsed alongside an alignment keyword. RegarUsed alongside an alignment keyword. RegarUsed alongside an alignment keyword. Regar",
};

const datas = Array(rowCount).fill(item);

export default function Message() {
  const refContent = useRef<HTMLDivElement>(null);
  const refContentBox = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>(""); // 消息内容
  const [visibleEmoji, setVisibleEmoji] = useState(false);
 

  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // 返回事件
  const onLeftClick = () => {
    navigate(-1);
  };

  // 点击右边的事件
  const onRightClick = () => {
    console.log("点击了卡片右区域");
  };

  // 渲染头像图
  const renderPrefixOrExtra = (_item: Item, isIndex: boolean): JSX.Element => (
    <Image
      className="image"
      src={isIndex ? userList[0].avatar : userList[1].avatar}
      fit="cover"
      width={50}
      height={50}
    />
  );

  ////输入内容 start////////////
  const handleInputChange = (value: string) => {
    setInputValue(value);
  };
  const handleInsertEmoji = (emoji: string) => {
    if (refContentBox.current) {
      const inputElement = refContentBox.current.querySelector<HTMLElement>(
        ".refInput .adm-input-element"
      ) as HTMLInputElement;
      if (inputElement) {
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;
        const newText =
          inputValue.slice(0, start!) + emoji + inputValue.slice(end!);
        setInputValue(newText);
        // 将光标位置设置到插入内容之后
        inputElement.selectionStart = inputElement.selectionEnd =
          start! + emoji.length;
        inputElement.focus();
      }
    }
  };
  /////输入内容 end///////////

  // 点击表情图标按钮事件
  const handleSmileOutlineClick = () => {
    setVisibleEmoji(!visibleEmoji);
    // getDivElement(!visibleEmoji ? 340: 106);
  };

  // 获取聊天信息列表的内容区域
  const getDivElement = (num: number) => {
    if (refContent.current) {
      const divElement = refContent.current.querySelector<HTMLElement>(
        ".adm-list-body-inner"
      );
      if (divElement) {
        // 在这里进行操作，例如更改文本内容
        divElement.style.height = `${height - num}px`;
        console.log("divElement:", divElement);
      }
    }
  };

  // 获取表情图的事件
  const handleGetEmojiPickers = (emojiMsg: string) => {
    console.log("emojiMsg", emojiMsg);
    handleInsertEmoji(emojiMsg );
  };

  const handleOnAddEvent = () => {
    setVisibleEmoji(false);
  };

  const handleChangeOtherEvent = () => {
    setVisibleEmoji(!visibleEmoji);
    getDivElement(106);
  }

  useEffect(() => {
    getDivElement(106);
  }, []);


  useEffect(() => {
    getDivElement(visibleEmoji ? 340: 106 );
  }, [visibleEmoji]);


  return (
    <div className={styles.message}>
      <Card
        className="admCardBox"
        icon={
          <LeftOutline
            onClick={onLeftClick}
            style={{ fontSize: 25, marginLeft: 12 }}
          />
        }
        title={<div style={{ fontWeight: "normal" }}>《Novalee Spicer》</div>}
        extra={
          <MoreOutline
            onClick={onRightClick}
            style={{ fontSize: 25, marginRight: 12 }}
          />
        }
        style={{ borderRadius: 16, padding: 0 }}
      >
        {/* 聊天内容渲染 */}
        <div className={"content"} ref={refContent} onClick={handleChangeOtherEvent}>
          <List>
            {datas.map((item, index) => {
              const isIndex = index % 2;
              return (
                <List.Item
                  key={index}
                  className={!isIndex ? "itemLeft" : "itemRight"}
                  {...(!isIndex
                    ? { prefix: renderPrefixOrExtra(item, !isIndex) }
                    : { extra: renderPrefixOrExtra(item, !isIndex) })}
                  description={
                    <Card>
                      <p>{item.description}</p>
                    </Card>
                  }
                >
                  <div className="userName">{item.name}</div>
                </List.Item>
              );
            })}
          </List>
        </div>
        {/* 底部操作的按钮 */}
        <div className={"footer"} onClick={(e) => e.stopPropagation()}>
          <Space style={{ "--gap": "30px" }}>
            {/* 左边的按钮 */}
            <div className="leftBox" onClick={handleOnAddEvent}>
              <AddSquareOutline fontSize={30} />
            </div>
            {/* 输入的内容 */}
            <div className="contentBox" ref={refContentBox}>
              <Input
                className="refInput"
                value={inputValue}
                clearable
                placeholder="请输入内容"
                onChange={handleInputChange}
                style={{ width: width - 186 }}
              />
            </div>
            {/* 右边的按钮操作 */}
            <div className="rightBox">
              <SmileOutline
                onClick={handleSmileOutlineClick}
                fontSize={30}
                style={{ marginRight: 15 }}
              />

              {inputValue ? (
                <LocationOutline
                  fontSize={30}
                  style={{ transform: "rotate(90deg)" }}
                />
              ) : (
                <AudioOutline fontSize={30} />
              )}
            </div>
          </Space>
          {/* 表情图 */}
          {visibleEmoji ? (
            <EmojiPickers change={handleGetEmojiPickers} />
          ) : null}
        </div>
      </Card>
        
    </div>
  );
}
