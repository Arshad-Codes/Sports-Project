import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '@material-tailwind/react';
import { format } from 'date-fns';

export default function DatePicker({ value, onChange }) {
  const [date, setDate] = useState(value);

  const handleDateChange = (date) => {
    setDate(date);
    onChange(date);
  };

  return (
    <div className="relative">
      <ReactDatePicker
        selected={date}
        onChange={handleDateChange}
        customInput={
          <Input
            label="Select a Date"
            value={date ? format(date, 'MM/dd/yyyy') : ''}
            readOnly
          />
        }
        className="w-full"
        dateFormat="MM/dd/yyyy"
        popperClassName="shadow-lg"
      />
    </div>
  );
}
