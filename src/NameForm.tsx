import * as React from "react";
import moment from 'moment';
import 'moment-timezone';
import DatePicker from 'react-datepicker';
import { Card, Button, Form } from "tabler-react";

export interface NameFormProps { }
export interface NameFormState {
    zones: string[];
    inputDate: Date | null,
    startZone: string;
    startDate: string,
    startTime: string,
    targetZone: string;
    answer: string,
}

export class NameForm extends React.Component<NameFormProps, NameFormState> {
    constructor(props: NameFormProps) {
        super(props);
        this.state = {
            zones: this.getZones(),
            inputDate: new Date(),
            startZone: 'America/New_York',
            startDate: moment().format("YYYY-MM-DD"),
            startTime: moment().format("h:mm"),
            targetZone: 'UTC',
            answer: "",
        };

        this.updateName = this.updateName.bind(this);
        this.updateStartZone = this.updateStartZone.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateTargetZone = this.updateTargetZone.bind(this);
    }

    componentDidMount() {
        this.updateAnswer();
    }

    updateName(event: any) {
        this.setState({ startZone: event.target.value });
    }

    updateStartZone(event: any) {
        this.setState({ startZone: event.target.value });
        this.updateAnswer();
    }

    updateTargetZone(event: any) {
        this.setState({ targetZone: event.target.value });
        this.updateAnswer();
    }

    updateStartDate(date: Date | null) {
        let m = moment(date?.toISOString());
        this.setState({ startDate: m.format("YYYY-MM-DD") });
        this.setState({ inputDate: date });
        this.updateAnswer();
    }

    updateStartTime(date: Date | null) {
        console.log("updateStartTime");
        let m = moment(date?.toISOString());
        this.setState({ startTime: m.format("h:mm") });
        this.setState({ inputDate: date });
        this.updateAnswer();
    }

    updateAnswer() {
        let timezone = moment.tz(this.state.startDate + " " + this.state.startTime, this.state.startZone);
        this.setState({ answer: timezone.tz(this.state.targetZone).format('DD MMMM, YYYY h:mm a') });

    }

    getZones() {
        return moment.tz.names();
    }

    render() {
        return (
            <div className="container">
                <Card className="p-5">
                    <Form.Group label="Timezone">
                        <select
                            value={this.state.startZone}
                            onChange={this.updateStartZone}
                            className="form-control">
                            {this.state.zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                        </select>
                    </Form.Group>

                    <Form.Group label="Date">
                        <DatePicker selected={this.state.inputDate}
                            onChange={date => this.updateStartDate(date)}
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group label="Time">
                        <DatePicker
                            selected={this.state.inputDate}
                            onChange={date => this.updateStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group label="Target Timezone">
                        <select
                            value={this.state.targetZone}
                            onChange={this.updateTargetZone}
                            className="form-control">
                            {this.state.zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                        </select>
                    </Form.Group>

                    <Form.Group label="Converted Time">
                        <Form.StaticText>
                            {this.state.answer}
                        </Form.StaticText>
                    </Form.Group>
                </Card>
            </div>
        );
    }
}