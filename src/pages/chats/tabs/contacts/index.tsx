import { IndexBar, List } from 'antd-mobile';
import React from 'react';

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

const Contacts: React.FC = () => {
    return (
        <IndexBar style={{ width: '100vw' }}>
            {groups.map((group) => {
                const { title, items } = group;
                return (
                    <IndexBar.Panel index={title} title={`标题${title}`} key={`标题${title}`}>
                        <List>
                            {items.map((item, index) => (
                                <List.Item key={index}>{item}</List.Item>
                            ))}
                        </List>
                    </IndexBar.Panel>
                );
            })}
        </IndexBar>
    );
};

export default Contacts;