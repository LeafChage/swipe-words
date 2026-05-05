import type { ComponentProps, FC } from "react";

const buttonStyleMap: Record<"forgot" | "remember" | "show" | "hide", string> = {
    forgot:
        "bg-rose-50 text-rose-600 ring-rose-100 hover:bg-rose-100 hover:ring-rose-200",
    remember:
        "bg-emerald-50 text-emerald-600 ring-emerald-100 hover:bg-emerald-100 hover:ring-emerald-200",
    show:
        "bg-sky-50 text-sky-600 ring-sky-100 hover:bg-sky-100 hover:ring-sky-200",
    hide:
        "bg-slate-100 text-slate-600 ring-slate-200 hover:bg-slate-200 hover:ring-slate-300",
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

export const ForgotButton = generateFlashCardButton("forgot");
export const RememberButton = generateFlashCardButton("remember");
export const ShowButton = generateFlashCardButton("show");
export const HideButton = generateFlashCardButton("hide");

