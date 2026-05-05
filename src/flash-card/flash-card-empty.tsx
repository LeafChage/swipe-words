import type { FC } from "react"

export const FlashCardEmpty: FC = () => {
    return <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">Finished!</h2>
        <p className="text-slate-500">すべてのカードが終わりました。</p>
    </div>
}
