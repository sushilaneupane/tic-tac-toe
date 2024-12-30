import React, { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='Cross'>`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' alt='Circle'>`;
            data[num] = "o";
        }
        setCount(count + 1);
        checkwin();
    };

    const checkwin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6],           
        ];

        winPatterns.forEach((pattern) => {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                Won(data[a]);
            }
        });
    };

    const Won = (winner) => {
        setLock(true);
        if (titleRef.current) {
            if (winner === "x") {
                titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}' alt='Cross'>`;
            } else {
                titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}' alt='Circle'>`;
            }
        }
    };

    const resetGame = () => {
        data = ["", "", "", "", "", "", "", "", ""];
        setCount(0);
        setLock(false);
        document.querySelectorAll('.boxes').forEach((box) => (box.innerHTML = ""));
        if (titleRef.current) {
            titleRef.current.innerHTML = `Tic Tac Toe Game In <span>React</span>`;
        }
    };

    return (
        <Container className="text-center my-5">
            <h1 className="title mb-4 fst-italic" ref={titleRef}>
                Tic Tac Toe Game In <span>React</span>
            </h1>
            <div className="board">
                {[0, 1, 2].map((row) => (
                    <Row key={row} className="justify-content-center">
                        {[0, 1, 2].map((col) => {
                            const index = row * 3 + col;
                            return (
                                <Col
                                    key={col}
                                    xs={4} 
                                    className="boxes border p-3"
                                    onClick={(e) => toggle(e, index)}
                                >
                                </Col>
                            );
                        })}
                    </Row>
                ))}
            </div>
            <Button className="mt-4 reset btn-primary" onClick={resetGame}>
                Reset
            </Button>
        </Container>
    );
};

export default TicTacToe;
