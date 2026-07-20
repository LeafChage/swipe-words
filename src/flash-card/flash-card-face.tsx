import type { FC, PropsWithChildren } from "react";

export const FlashCardFace: FC<PropsWithChildren<{
    label: string,
    className?: string,
}>> = (props) => {
    return (
        <div
            className={`absolute inset-0 flex flex-col [backface-visibility:hidden] ${props.className ?? ""}`}
        >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {props.label}
            </p>
            {props.children}
        </div>
    );
};
