import * as React from "react";
import moment from 'moment';
import 'moment-timezone'; 
import DatePicker  from 'react-datepicker';

export interface NameFormProps {}
export interface NameFormState { value: string; zones: string[]; }

export class NameForm extends React.Component<NameFormProps, NameFormState> {
    constructor(props: NameFormProps) {
        super(props);
        this.state = { 
            value: '',
            zones: this.getZones()
        };

        this.updateName = this.updateName.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
    }

    componentDidMount() {
        console.log("init");
        let now = moment().format('MMMM Do YYYY, h:mm:ss a');
        this.setState({ value: now.toString() });

        var jun = moment("2014-06-01T12:00:00Z");
        var dec = moment("2014-12-01T12:00:00Z");

        console.log(jun.tz('America/Los_Angeles').format('ha z'));
        console.log(dec.tz('America/Los_Angeles').format('ha z'));
    }

    updateName(event: any) {
        console.log("updateName");
        this.setState({ value: event.target.value });
    }

    updateZone(event: any) {
        console.log("updateZone");
        event.preventDefault();
    }

    getZones() {
        return moment.tz.names();
    }

    setStartDate(date: Date | null) {
        console.log(date);
    }

    render() {
        const startDate = new Date();
        return (
            <form>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.updateName} />
                </label>
                <select value={this.state.value} onChange={this.updateZone}>
                    {this.state.zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                </select>
                <input type="submit" value="Submit" />
                <DatePicker selected={startDate} onChange={date => this.setStartDate(date)} />
                <DatePicker
                    selected={startDate}
                    onChange={date => this.setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
            </form>
        );
    }
}