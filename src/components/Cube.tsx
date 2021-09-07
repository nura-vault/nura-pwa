import React from "react";
import './Cube.css'

interface Props {
    front?: React.ReactElement
    right?: React.ReactElement
    back?: React.ReactElement
    left?: React.ReactElement
    top?: React.ReactElement
    bottom?: React.ReactElement
    rotationSpeed?: number
}

function Cube(props: Props) {

    var index: number = 0;
    var state: string;

    React.useEffect(() => {
        var cube = document.querySelector('.cube');
        var currentClass = '';

        function changeSide() {
            var showClass = 'show-' + state;

            if (currentClass)
                cube?.classList.remove(currentClass);

            cube?.classList.add(showClass);
            currentClass = showClass;
        }

        setInterval(() => {
            var list = getSideList();
            index = index + 1 >= list.length ? 0 : index + 1;
            state = list[index];
            changeSide();
        }, props.rotationSpeed || 3000);
    }, [])

    function getSideList() {
        var sideList = [];
        if (props.front)
            sideList.push('front');
        if (props.right)
            sideList.push('right');
        if (props.back)
            sideList.push('back');
        if (props.left)
            sideList.push('left');
        if (props.top)
            sideList.push('top');
        if (props.bottom)
            sideList.push('bottom');
        return sideList;
    }

    return (
        <div className="scene">
            <div className="cube">
                <div className="cube__face cube__face--front">{props.front}</div>
                <div className="cube__face cube__face--back">{props.back}</div>
                <div className="cube__face cube__face--right">{props.right}</div>
                <div className="cube__face cube__face--left">{props.left}</div>
                <div className="cube__face cube__face--top">{props.top}</div>
                <div className="cube__face cube__face--bottom">{props.bottom}</div>
            </div>
        </div>
    )
}

export default Cube