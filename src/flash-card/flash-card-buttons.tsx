import type { ComponentProps, FC } from "react";

const buttonStyleMap: Record<"again" | "hard" | "good" | "easy" | "show", string> = {
    again:
        "bg-rose-50 text-rose-600 ring-rose-100 hover:bg-rose-100 hover:ring-rose-200",
    hard:
        "bg-amber-50 text-amber-600 ring-amber-100 hover:bg-amber-100 hover:ring-amber-200",
    good:
        "bg-emerald-50 text-emerald-600 ring-emerald-100 hover:bg-emerald-100 hover:ring-emerald-200",
    easy:
        "bg-teal-50 text-teal-600 ring-teal-100 hover:bg-teal-100 hover:ring-teal-200",
    show:
        "bg-sky-50 text-sky-600 ring-sky-100 hover:bg-sky-100 hover:ring-sky-200",
};

const generateFlashCardButton = (kind: keyof typeof buttonStyleMap):
    FC<
        Pick<
            ComponentProps<"button">,
            "onClick" | "children"
        >
    > => ({ onClick, children }) => {
        return (
            <button
                className={`flex h-14 flex-1 items-center justify-center rounded-2xl px-4 text-sm font-bold shadow-sm ring-1 transition duration-150 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 ${buttonStyleMap[kind]}`}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

export const AgainButton = generateFlashCardButton("again");
export const HardButton = generateFlashCardButton("hard");
export const GoodButton = generateFlashCardButton("good");
export const EasyButton = generateFlashCardButton("easy");
export const ShowButton = generateFlashCardButton("show");

