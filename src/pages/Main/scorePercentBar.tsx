import styled from "@emotion/styled"
import scoreIcon from "../../images/score-icon.png"; 

const ScoreBarWrap = styled.div`
    position: relative;
    margin: 0 auto;
    width: 90%;
    height: 60px;
`

const ScoreBarBack = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc( 100% + 7px );
    height: 10px;
    background: #fff;
    border-radius: 10px;
`

const ScoreBar = styled.div<{ per: number }>`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0%, -50%);
    width: ${props => props.per}%;
    height: 6px;
    background: #ff9293;
    border-radius: 10px;
    transition: .5s;
`

const ScoreIcon = styled.div<{ imgSrc:any, per:number }>`
    position: absolute;
    transition: .5s;
    width: 60px;
    height: 60px;
    left:${props => props.per ? props.per : 0}%;
    transform: translateX(-50%);
    background: url(${props => props.imgSrc}) no-repeat center;
    background-size: 50px;
    animation: poyong 2s infinite;
`

interface thisScore {
    percent: number
}

export default function NowScore({percent}:thisScore){

    console.log(percent);

    return (
        <div className="nowscore">
            <div className="container">
                <ScoreBarWrap>
                    <ScoreBarBack></ScoreBarBack>
                    <ScoreBar per={percent}></ScoreBar>
                    <ScoreIcon imgSrc={scoreIcon.src} per={percent}></ScoreIcon>
                </ScoreBarWrap>
            </div>
        </div>
    )
}