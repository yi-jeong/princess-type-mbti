import { nowPageState, questionState } from "@/recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Loading from "./loading";
import QuestionPage from "./question";


export default function MainPage(){
    const questionData = useRecoilValue(questionState); 
    const nowPage = useRecoilValue(nowPageState);

    const questionLength = questionData.length;
    
    return(
        <div className="question">
            {
                nowPage == questionLength ? <Loading></Loading> : <QuestionPage></QuestionPage>
            }
        </div>
    )
}