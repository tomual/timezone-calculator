import * as React from "react";
import moment from 'moment';
import 'moment-timezone';
import DatePicker from 'react-datepicker';

export interface NameFormProps { }
export interface NameFormState { 
    zone: string; 
    zones: string[]; 
    answer: string, 
    date: string, 
    time: string 
}

export class NameForm extends React.Component<NameFormProps, NameFormState> {
    constructor(props: NameFormProps) {
        super(props);
        this.state = {
            zone: '',
            zones: this.getZones(),
            answer: "",
            date: "",
            time: "",
        };

        this.updateName = this.updateName.bind(this);
        this.updateZone = this.updateZone.bind(this);
        this.updateDate = this.updateDate.bind(this);
    }

    componentDidMount() {
        console.log("init");
        this.setState({ answer: "Hello" });
    }

    updateName(event: any) {
        console.log("updateName");
        this.setState({ zone: event.target.value });
    }

    updateZone(event: any) {
        console.log("updateZone");
        this.setState({ zone: event.target.value });
    }

    updateDate(date: Date | null) {
        console.log("updateDate");
        let m = moment(date?.toISOString());
        this.setState({ date: m.format("YYYY-MM-DD") });
        this.updateAnswer();
    }

    updateTime(date: Date | null) {
        console.log("updateTime");
        let m = moment(date?.toISOString());
        this.setState({ time: m.format("h:mm") });
        this.updateAnswer();
    }

    updateAnswer()
    {
        console.log("updateAnswer");
        let timezone = moment.tz(this.state.date + " " + this.state.time, "America/New_York");
        this.setState({ answer: timezone.tz('Asia/Tokyo').format('YYYY-MM-DD hh:mm') });
        
    }

    getZones() {
        return moment.tz.names();
    }

    render() {
        const startDate = new Date();
        return (
            <form>
                <select value={this.state.zone} onChange={this.updateZone}>
                    {this.state.zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                </select>
                <input type="submit" value="Submit" />
                <DatePicker selected={startDate} onChange={date => this.updateDate(date)} />
                <DatePicker
                    selected={startDate}
                    onChange={date => this.updateTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                />
                <div>{this.state.answer}</div>
            </form>
        );
    }
}