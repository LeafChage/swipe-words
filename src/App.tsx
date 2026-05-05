import { useState } from "react";
import { FlashCardStack } from "./flash-card-stack";
import "./index.css";
import type { FlashCardProps } from "./flash-card/flash-card";

export function App() {
    const [cards, setCards] = useState<FlashCardProps[]>([
        {
            id: "1",
            front: "the most + noun",
            answer: "最も〜な名詞",
        },
        {
            id: "2",
            front: "used to + verb",
            answer: "以前は〜していた",
        },
        {
            id: "3",
            front: "be supposed to",
            answer: "〜することになっている",
        },
    ]);

    const onAction = (remember: boolean, id: string) => {
        console.log(`${remember ? "remember" : "forgot"}: ${id}`);
        setCards([...cards.slice(1)])
    }

    return (
        <div className="app">
            <FlashCardStack cards={cards} onAction={onAction} />
        </div>
    );
}

export default App;
