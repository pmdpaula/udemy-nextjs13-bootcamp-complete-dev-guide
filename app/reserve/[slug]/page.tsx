import { Form } from '../components/Form';
import { Header } from '../components/Header';

const Reserve = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header
          title="Aiāna Restaurant Collective"
          imgSrc="https://images.otstatic.com/prod1/49153814/2/medium.jpg"
          date="Tues, 22, 2023"
          time="7:30 PM"
          partySize="3"
        />

        <Form />
      </div>
    </div>
  );
};

export default Reserve;
