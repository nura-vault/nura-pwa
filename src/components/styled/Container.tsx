import styled from "styled-components";

export const Container = styled.div`
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25),
        0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;

    margin-top: 20px;
    height: calc(100vh - 100px);

    display: flex;
    justify-content: space-between;
`