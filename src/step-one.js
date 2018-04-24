import React from 'react';
import ReactDOM from 'react-dom';

class StepOneForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            data: this.props.data ? this.props.data : {}
        }
    }

    handleOnNextButtonClicked() {
        let data = {}
        data.name = this.refs.name;

        // Anything else you want to pass add it to data

        this.props.nextStep(data);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleOnNextButtonClicked}>
                    <label>
                        Name:
                        <input 
                            type="text" 
                            ref="name"
                            value={this.state.name} 
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default StepOneForm;
