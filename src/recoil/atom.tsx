import { ScoreDatas, QuestionDatas } from "@/Data/testDatas";
import { ScoreData } from "@/Data/type";
import { atom } from "recoil";

/* 현재 페이지의 위치 */
export const nowPageState = atom<number>({
    key: "nowPageState",
    default: 0,
})

export const percentState = atom<number>({
    key: "percentState",
    default: 0,
})

/* 점수판 */
export const scoreDataState = atom<ScoreData>({
    key: "scoreDataState",
    default: ScoreDatas,
});

/* 결과값 저장 */
export const resultScoreState = atom<string>({
    key: "resultScoreState",
    default: "",
})

/* 질문지 */
export const questionState = atom({
    key: "questionState",
    default: QuestionDatas
})