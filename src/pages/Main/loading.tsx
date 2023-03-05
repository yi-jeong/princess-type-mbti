import { resultScoreState, scoreDataState } from "@/recoil/atom";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import scoreIcon from "../../images/score-icon.png"; 


const LoadingBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100vh;
    text-align: center;
`

const LoadingImg = styled.div<{keyFrameName:string}>`
    position: relative;
    margin-bottom: 1rem;
    animation: ${props => props.keyFrameName} 1s linear infinite;
`

const LoadingText = styled.div<{keyFrameName:string}>`
    animation: ${props => props.keyFrameName} 3s linear infinite;

    span{
        font-family: 'yg-jalnan';
        font-size: 1.5rem;
        letter-spacing: 2px;
        font-weight: 500;
    }
`

const doungdoung = keyframes`
    0%{
        top: -.5rem
    }
    50%{
        top: .5rem
    }
    100%{
        top: -.5rem
    }
`

const opacity = keyframes`
    0%{
        opacity: 1
    }
    50%{
        opacity: 0
    }
    100%{
        opacity: 1
    }
`

export default function Loading(){
    const router = useRouter();
    const [resultScore, setResultScore] = useRecoilState(resultScoreState);
    const score = useRecoilValue(scoreDataState);

    /* 결과값 계산 */
    const resultScoreEvent = ()=> {
        const energy = score.e > score.i ?  "e" : "i" ;
        const cognition = score.n > score.s ?  "n" : "s" ;
        const judgment = score.t > score.f ?  "t" : "f" ;

        return energy + cognition + judgment;
    }

    useEffect(() => {
        setResultScore(resultScoreEvent());
    }, []); 

    useEffect(() => {
        /* 결과값이 있을 경우에만 다음 페이지로 이동 */
        if(resultScore){
            const timeout = setTimeout(() => {
                router.push("/Result/page"); 
            }, 3000); 

            return () => clearTimeout(timeout);
        }
    }, [resultScore])

    return (
        <LoadingBox>
            <div>
                <LoadingImg keyFrameName={doungdoung}>
                    <div className="container">
                        <Image src={scoreIcon}  alt={""} width={90} height={90}></Image>
                    </div>
                </LoadingImg>
                <LoadingText keyFrameName={opacity}>
                    <span>계산중</span>
                </LoadingText>
            </div>
        </LoadingBox>
    )
}