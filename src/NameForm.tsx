import * as React from "react";
import moment from 'moment';
import 'moment-timezone';
import DatePicker from 'react-datepicker';
import { Card, Form } from "tabler-react";


export interface NameFormProps { }
export interface NameFormState {
    zones: string[];
    inputDate: Date | null,
    startZone: string;
    startDate: string,
    startTime: string,
    targetZone: string;
    targetMoment: moment.Moment;
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
            targetMoment: moment(),
        };

        this.updateName = this.updateName.bind(this);
        this.updateStartZone = this.updateStartZone.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateTargetZone = this.updateTargetZone.bind(this);
    }

    componentDidMount() {
        this.updateAnswer();
    }

    componentDidUpdate() {
        this.writeAnswer();
    }

    updateName(event: any) {
        this.setState({ startZone: event.target.value });
    }

    updateStartZone(event: any) {
        console.log("updateStartZone");
        this.setState({ startZone: event.target.value });
        this.updateAnswer();
    }

    updateTargetZone(event: any) {
        console.log("updateTargetZone");
        this.setState({ targetZone: event.target.value });
        this.updateAnswer();
    }

    updateStartDate(date: Date | null) {
        console.log("updateStartDate");
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
        this.setState({ targetMoment: timezone.tz(this.state.targetZone) });
    }

    writeAnswer() {
        console.log("writeAnswer");
        return (
            <div>
                {this.state.targetMoment.format("DD MM YYYY")}
                <hr/>
                {this.state.targetMoment.format("hh:mm a")}
            </div>
        )
    }

    getZones() {
        return moment.tz.names();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="page-header">
                            <h1 className="page-title my-5">
                                Timezone Time Converter
                            </h1>
                        </div>
                        <Card className="p-5">
                            <div className="row">
                                <Form.Group label="Time" className="col-lg-6">
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

                                <Form.Group label="Date" className="col-lg-6">
                                    <DatePicker selected={this.state.inputDate}
                                        onChange={date => this.updateStartDate(date)}
                                        className="form-control"
                                    />
                                </Form.Group>
                                <Form.Group label="Timezone" className="col-12">
                                    <select
                                        value={this.state.startZone}
                                        onChange={this.updateStartZone}
                                    >
                                        {this.state.zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                                    </select>
                                </Form.Group>

                                <div className="col-12">
                                <hr />
                                </div>

                                <Form.Group label="Target Timezone" className="col-12">
                                    <select
                                        value={this.state.targetZone}
                                        onChange={this.updateTargetZone}
                                    >
                                        {this.state.zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                                    </select>
                                </Form.Group>

                                <Form.Group label="Converted Time" className="col-12">
                                    <Form.StaticText>
                                        {this.writeAnswer()}
                                    </Form.StaticText>
                                </Form.Group>

                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}