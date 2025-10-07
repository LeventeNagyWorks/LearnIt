import { FaCheck } from 'react-icons/fa6';
import Button from '../components/Button';
import { IoClose } from 'react-icons/io5';
import Dropdown from '../components/Dropdown';
const Playground = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-6 p-20 bg-slate-700'>
      <div className='w-full flex gap-6'>
        <Button
          icon={<FaCheck className='' />}
          text='Glow'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          icon={<FaCheck className='' />}
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          glow={false}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          severity='primary'
          color='red'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          severity='primary'
          color='red'
          glow={false}
          onClick={() => alert('Button clicked!')}
        />
      </div>
      <div className='w-full flex gap-6'>
        <Button
          text='Glow'
          severity='outline'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          severity='outline'
          glow={false}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          severity='outline'
          color='red'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          icon={<IoClose className='w-6 h-6' />}
          severity='outline'
          color='red'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          icon={<IoClose className='w-6 h-6' />}
          size='small'
          severity='outline'
          color='red'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          icon={<IoClose className='w-6 h-6' />}
          size='small'
          severity='noBg'
          color='red'
          glow={true}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          icon={<IoClose className='w-6 h-6' />}
          size='small'
          severity='noBg'
          color='red'
          glow={false}
          onClick={() => alert('Button clicked!')}
        />
        <Button
          text='Text'
          severity='outline'
          color='red'
          glow={false}
          onClick={() => alert('Button clicked!')}
        />
      </div>
      <div className='w-full flex gap-6'>
        <Dropdown
          placeholder={'Select Question Type'}
          array={[
            { id: 1, name: 'Single Choice' },
            { id: 2, name: 'True / False' },
            { id: 3, name: 'Multiple Choice' },
            { id: 4, name: 'Fill in the Blanks' },
          ]}
        />
      </div>
    </div>
  );
};

export default Playground;
