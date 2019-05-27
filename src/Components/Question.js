import React, { Component } from 'react';


class Question extends Component {
    state = {
    }
    render() {
        return (
            <div className="Question mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 mx-auto">
                        <div className="text-center">
                            <h4 id={this.props.questions.id} >{this.props.questions.question}</h4>
                        </div>
                        <ul>
                            {this.props.questions.answers.map((a, i) => (
                                <li key={i} id={a} ><span onClick={this.getAnswer.bind(this)} className="mx-auto d-flex align-items-center">{a}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }
    getAnswer(e) {
        let getAllLi = document.getElementsByTagName("li");
        for (let i = 0; i < getAllLi.length; i++) {
            if (getAllLi[i].id === e.target.innerHTML) {
                document.getElementById(getAllLi[i].id).style.backgroundColor = "yellow";
            }
            else {
                getAllLi[i].style.backgroundColor = "white";
            }
        }
        let i = document.getElementsByTagName("h4");
        this.props.getAnswer(e.target.innerHTML, i[0].id);
    }

}

export default Question;
