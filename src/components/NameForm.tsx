import * as React from "react";
import * as moment from 'moment/moment';

export interface NameFormProps { }
export interface NameFormState { value: string; }

export class NameForm extends React.Component<NameFormProps, NameFormState> {
    constructor(props: NameFormProps) {
        super(props);
        this.state = { value: '' };

        this.updateName = this.updateName.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.init();
    }

    init() {
        var jun = moment("2014-06-01T12:00:00Z");
        this.setState({ value: jun.format("j M, Y") });
    }

    updateName(event: any) {
        this.setState({ value: event.target.value });
        this.setState({ value: this.state.value.toUpperCase() });
    }

    updateZone(event: any) {
        event.preventDefault();
    }

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.updateName} />
                </label>
                <select value={this.state.value} onChange={this.updateZone}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}