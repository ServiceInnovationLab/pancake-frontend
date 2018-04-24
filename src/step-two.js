import React from 'react';
import ReactDOM from 'react-dom';

class StepTwoForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnPreviousStep = this.handleOnPreviousStep.bind(this);

        // The data from the previous step comes in this.props.data

        this.state = {
            data: this.props.data,
        }
    }

    handleSubmit() {
        
        // Anything here
    }

    handleOnPreviousStep() {
        let data = this.state.data;

        this.props.previousStep(data);
    }

    render() {
        return (
            <div>
                The name from the previous step is {this.state.data.name}
                <button
                    type="button"
                    onClick={this.handleSubmit}
                    className="btn btn-link">Send</button>
                <button
                    type="button"
                    onClick={this.handleOnPreviousStep}
                    className="btn btn-default float-right">Back</button>
            </div>
        );
    }
}

export default StepTwoForm;
