import { resultScoreState } from "@/recoil/atom";
import styled from "@emotion/styled"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { resultDatas } from "../Data/testDatas";

const ResultTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height:130px;
    text-align: center;

    span{
        display: inline-block;
        padding: .5rem 1rem;
        border-radius: 500rem;
        background: #ff7474;
        font-size: .9rem;
        font-weight: 500;
        color: #fff;
    
    }

    h2{
        margin-top: .75rem;
        padding-top: .3rem;
        position: relative;
        z-index: 0;
        font-family: 'yg-jalnan';
        font-size: 2rem;
        color: #ff7474;
        text-shadow: -2px 0 #fff, 0 2px #fff, 2px 0 #fff, 0 -2px #fff;
    }
`

const ResultImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: #fff;
`

const ResultContent = styled.div`
    padding: 1rem 0 3rem;

    .box{
        padding: 1.5rem;
        border-radius: 1rem;
        background: #fff;
        line-height: 1.5rem;

        ul{ 
            margin-left: 20px; 

            li{ margin: 0.5rem 0; text-indent: -20px; }
        }
        
    }
`

const ResultButton = styled.div`
    padding-bottom: 2rem;
`

const StyledLink = styled(Link)`
    display:block;
    padding: 1rem 2rem;
    border-radius: 100rem;
    background: #ff7474;
    color: #fff;
    font-weight:500;
    text-align: center;
    text-decoration: none;
    transition: .5s;

    &:hover {
        background: #fff;
        color: #ff7474;
    }
`;

export default function ResultPage(){
    const router = useRouter();
    const dataList = resultDatas;
    const resultScore = useRecoilValue(resultScoreState);
    const resultData = dataList.find( thisData => { return thisData.type == resultScore })

    useEffect(()=>{
        if(resultScore == "") router.push("/")
    },[])

    return (
        <div className="result">
            <ResultTitle>
                <div className="container">
                    <span>{resultData?.subText}</span>
                    <h2>{resultData?.title}</h2>
                </div>
            </ResultTitle>
            <ResultImage>이미지 영역</ResultImage>
            <ResultContent>
                <div className="container">
                    <div className="box">
                        <ul>
                            {
                                resultData?.content.map( (thisData, index) => {
                                    return(
                                        <li key={index}>{thisData}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </ResultContent>
            <ResultButton>
                <div className="container">
                    <StyledLink href={"/"}>다시하기</StyledLink>
                </div>
            </ResultButton>
        </div>
    )
}