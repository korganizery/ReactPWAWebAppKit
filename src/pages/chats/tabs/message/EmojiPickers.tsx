import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import i18n from "@emoji-mart/data/i18n/zh.json";


// 定义 Emoji 对象的类型
export interface Emoji {
    id: string;
    name: string;
    native: string;
    unified: string;
    keywords: string[];
    shortcodes: string[];
  }
  
  // 组件的 props 类型
  export interface EmojiPickersProps {
    change: (emojiMsg: string) => void;
  }


const EmojiPickers = (props: EmojiPickersProps) => {
  const handleOnEmojiSelect = (emojiMsg: Emoji) => {
    props.change(emojiMsg.native);
  };

  return (
    <>
      <div
        style={{
          height: 450,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Picker data={data} i18n={i18n} onEmojiSelect={handleOnEmojiSelect} />
      </div>
    </>
  );
};

export default EmojiPickers;
