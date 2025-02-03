import { Input, Card, List, Image, Space } from "antd-mobile";
import {
  AddCircleOutline,
  AudioOutline,
  SmileOutline,
  LeftOutline,
  LocationOutline,
  MoreOutline,
 ScanningOutline,
 HandPayCircleOutline, 
 TransportQRcodeOutline,
  AntOutline

} from "antd-mobile-icons";
import { Action } from 'antd-mobile/es/components/popover'
import { useNavigate } from "react-router";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/zh.json";

import styles from "./index.module.less";
import { JSX, useState, useRef, useEffect  } from "react";

interface Item {
  id: string;
  position: string;
  avatar: string;
  description: string;
  name: string;
}

export const user = [
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

const actions: Action[] = [
    { key: 'scan', icon: <ScanningOutline />, text: '扫一扫' },
    { key: 'payment', icon: <HandPayCircleOutline />, text: '付钱/收钱' },
    { key: 'bus', icon: <TransportQRcodeOutline />, text: '乘车码' },
    { key: 'assistant', icon: <AntOutline />, text: '智能助理' },
  ]



export default function Message() {
  const navigate = useNavigate();

  const onLeftClick = () => {
    console.log("点击了卡片左区域");
    navigate(-1);
  };

  const onRightClick = () => {
    console.log("点击了卡片右区域");
  };

  const renderPrefixOrExtra = (_item: Item, isIndex: boolean): JSX.Element => (
    <Image
      className="image"
      src={isIndex ? user[0].avatar : user[1].avatar}
      fit="cover"
      width={50}
      height={50}
    />
  );

  const [messaged, setMessaged] = useState<string>("");

  const handleOnChangeInput = (value: string) => {
    console.log(event);
    setMessaged(value);
    
  }

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
        title={<div style={{ fontWeight: "normal" }}>卡片标题</div>}
        extra={
          <MoreOutline
            onClick={onRightClick}
            style={{ fontSize: 25, marginRight: 12 }}
          />
        }
        style={{ borderRadius: 16, padding: 0 }}
      >
        <div className={"content"}>
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
        <div 
            className={"footer"} 
            onClick={(e) => e.stopPropagation()}
        >
          {/* <Picker data={data} i18n={i18n} onEmojiSelect={console.log} /> */}
          <Space style={{ '--gap': '24px' }} >
            <AddCircleOutline fontSize={30} />
            <Input
                style={{width: 200}}
                placeholder='请输入内容'
                value={messaged}
                clearable
                onChange={handleOnChangeInput}
            />
            <SmileOutline fontSize={30} />
            {messaged ?  <LocationOutline fontSize={30}/> : <AudioOutline fontSize={30} />}
          </Space>
        </div>
      </Card>
    </div>
  );
}
