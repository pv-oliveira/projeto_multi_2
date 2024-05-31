import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import "./schedule.style.scss"

const defaultFormFields = {
    type: "",
    hour: "",
    address: ""
};

const Schedule = () => {
    const [formSchedule, setFormSchedule] = useState(defaultFormFields)
    const { type, hour, address } = formSchedule;

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log({ name, value })

        setFormSchedule({ ...formSchedule, [name]: value });
    };


    return (<div style={{ width: '100%', display: 'flex', justifyContent: 'end', marginTop: '25px' }}>
        <div className="d-flex flex-column schedule-container">
            <form onSubmit={() => { }}>
                <FormInput
                    label='Retirar'
                    type='radio'
                    checked={type === 'retirar'}
                    onChange={handleChange}
                    name='type'
                    value='retirar'
                />
                <FormInput
                    label='Agendar'
                    type='radio'
                    checked={type === 'agendar'}
                    onChange={handleChange}
                    name='type'
                    value='agendar'
                />
                {
                    type === 'agendar' ?
                        <FormInput
                            label=''
                            type='datetime-local'
                            onChange={handleChange}
                            name='hour'
                            value={hour}
                        /> : null
                }
                <FormInput
                    label='Entrega'
                    type='radio'
                    checked={type === 'entregar'}
                    onChange={handleChange}
                    name='type'
                    value='entregar'
                />
                {
                    type === 'entregar' ?
                        <FormInput
                            id="schedule-endereco"
                            style={{ gap: '10px' }}
                            label='Endereço:'
                            type='text'
                            onChange={handleChange}
                            name='address'
                            value={address}
                        /> : null
                }
            </form>
        </div>
    </div>
    )
}

export default Schedule