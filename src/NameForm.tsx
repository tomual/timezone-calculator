import * as React from "react";
import moment from 'moment';
import 'moment-timezone'; 

export interface NameFormProps { }
export interface NameFormState { value: string; }

export class NameForm extends React.Component<NameFormProps, NameFormState> {
    constructor(props: NameFormProps) {
        super(props);
        this.state = { value: '' };

        this.updateName = this.updateName.bind(this);
        this.updateZone = this.updateZone.bind(this);
    }

    componentDidMount() {
        console.log("init");
        let now = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.setState({ value: now.toString() });

        var jun = moment("2014-06-01T12:00:00Z");
        var dec = moment("2014-12-01T12:00:00Z");

        console.log(jun.tz('America/Los_Angeles').format('ha z'));
        console.log(dec.tz('America/Los_Angeles').format('ha z'));
        jun.tz('America/Los_Angeles').format('ha z');  // 5am PDT
        dec.tz('America/Los_Angeles').format('ha z');  // 4am PST

        jun.tz('America/New_York').format('ha z');     // 8am EDT
        dec.tz('America/New_York').format('ha z');     // 7am EST

        jun.tz('Asia/Tokyo').format('ha z');           // 9pm JST
        dec.tz('Asia/Tokyo').format('ha z');           // 9pm JST

        jun.tz('Australia/Sydney').format('ha z');     // 10pm EST
        dec.tz('Australia/Sydney').format('ha z');     // 11pm EST
    }

    updateName(event: any) {
        console.log("updateName");
        this.setState({ value: event.target.value });
    }

    updateZone(event: any) {
        console.log("updateZone");
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