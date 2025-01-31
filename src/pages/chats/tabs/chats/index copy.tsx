import { IndexBar, List, SwipeAction } from 'antd-mobile';
import { Action } from 'antd-mobile/es/components/swipe-action';
import React from 'react';
import { useNavigate } from 'react-router';

// 生成随机字母的函数
const getRandomLetter = (): string => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return letters[Math.floor(Math.random() * letters.length)];
};

// 生成随机单词的函数
const getRandomWord = (length: number): string => {
    let word = '';
    for (let i = 0; i < length; i++) {
        word += getRandomLetter();
    }
    return word;
};

// 生成随机句子的函数
const getRandomSentence = (minWords: number, maxWords: number): string => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    let sentence = '';
    for (let i = 0; i < wordCount; i++) {
        sentence += getRandomWord(Math.floor(Math.random() * 6) + 3) + ' ';
    }
    return sentence.trim();
};

// 根据需要生成随机单词列表
const getRandomList = (min: number, max: number): string[] => {
    return new Array(Math.floor(Math.random() * (max - min) + min)).fill('').map(() => getRandomSentence(2, 5));
};

const charCodeOfA = 'A'.charCodeAt(0);
const groups = Array(26)
    .fill('')
    .map((_, i) => ({
        title: String.fromCharCode(charCodeOfA + i),
        items: getRandomList(3, 10),
    }));


const Chats: React.FC = () => {
    const navigate = useNavigate();
    const leftActions: Action[] = [
        {
            key: 'pin',
            text: '置顶',
            color: 'primary',
        },
    ]
    const rightActions: Action[] = [
        {
            key: 'unsubscribe',
            text: '取消关注',
            color: 'light',
        },
        {
            key: 'mute',
            text: '免打扰',
            color: 'warning',
        },
        {
            key: 'delete',
            text: '删除',
            color: 'danger',
        },
    ]

    const handleListItem = () => {
        navigate('/im/message');
    }


    return (
        <IndexBar style={{ width: '100vw' }}>
            {groups.map((group) => {
                const { title, items } = group;
                return (
                    <IndexBar.Panel index={title} title={`标题${title}`} key={`标题${title}`}>
                        <List>
                            {items.map((item, index) => (
                                <SwipeAction
                                    key={index}
                                    leftActions={leftActions}
                                    rightActions={rightActions}
                                >
                                    <List.Item onClick={handleListItem}>{item}</List.Item>
                                </SwipeAction>
                            ))}
                        </List>
                    </IndexBar.Panel>
                );
            })}
        </IndexBar>
    );
};

export default Chats;