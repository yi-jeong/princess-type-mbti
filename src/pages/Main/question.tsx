import { nowPageState, percentState, questionState, scoreDataState } from "@/recoil/atom";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import NowScore from "./scorePercentBar";
import scoreIcon from "../../images/score-icon.png"; 
import { css } from "@emotion/react";
import { ScoreData } from "../../Data/type";


const QuestionCheck = styled.div`
    height: calc( 100vh - 100px );
    text-align: center;

    .tit{
        display: flex;
        align-items: center;
        height:100px;

        h2{
            color: #333;
            font-size: 1.3rem;
            font-weight: 500;
            line-height: 2rem;
        }
    }


    .icon{
        display: flex;
        align-items: center;
        height: calc( 100% - 100px - 300px);
    }

    .button{

        display: flex;
        align-items: center;
        height: 300px ;

        button{
            display:flex;
            justify-content: center;
            align-items: center;
            margin: .25rem 0;
            padding: 1rem 1rem;
            width: 100%;
            height: 90px;
            background: #fff;
            border: 2px solid #ff9293;
            border-radius: 90px;
            font-size: .9rem;
        }
    }

`

const Question = styled.div<{ now:number, thisId:number }>`
    display: none;
    height: 100%;


    ${(props) => 
        props.thisId == props.now &&
        css`
            display: block !important;
        `
    };
`

export default function QuestionPage(){
    const questionData = useRecoilValue(questionState); 
    const [nowPage, setNowPage] = useRecoilState(nowPageState);
    const [percent, setPercent] = useRecoilState(percentState);
    const [score, setScore] = useRecoilState<ScoreData>(scoreDataState);

    const questionLength = questionData.length;

    const percentInit = () => {
        setPercent(Math.ceil(( nowPage / ( questionLength - 1 )) * 100));
    }

    const questionClick = (value:string) => {
        if( nowPage < questionLength ){
            const thisScoreName = value as keyof ScoreData;
        
            setNowPage( nowPage + 1 );
            setScore({ ...score, [thisScoreName]: score[thisScoreName] + 1 });
        }
        
        console.log("nowPage: " + nowPage + ", lenght: " + questionLength );
    }

    /* 페이지 이동시 마다 동작 */
    useEffect(()=>{
        percentInit();
    },[nowPage])

    return (
        <>
            <NowScore percent={percent}></NowScore>
            <QuestionCheck>
                {
                    questionData.map( thisData =>{
                        return(
                            <Question now={nowPage} thisId={thisData.id} key={thisData.id}>
                                <div className="tit">
                                    <div className="container">
                                        <h2>{thisData.title}</h2>
                                    </div>
                                </div>
                                <div className="icon">
                                    <div className="container">
                                        <Image src={scoreIcon}  alt={""} width={50} height={50}></Image>
                                    </div>
                                </div>
                                <div className="button">
                                    <div className="container">
                                        <button onClick={()=>questionClick(thisData.anserList.one.type)}>{thisData.anserList.one.anser}</button>
                                        <button onClick={()=>questionClick(thisData.anserList.two.type)}>{thisData.anserList.two.anser}</button>
                                    </div>   
                                </div>
                            </Question>
                        )
                    })
                }  
                
            </QuestionCheck>  
        </>
    )
}